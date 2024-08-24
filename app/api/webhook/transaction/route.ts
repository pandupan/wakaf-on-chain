import { db } from "@/lib/db";
import { formatRupiah } from "@/lib/utils";
import { createHash } from "crypto";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const data = await req.json();

  try {
    const transaction = await db.transaction.findUnique({
      where: { id: data.order_id },
      select: {
        id: true,
        amount: true,
        status: true,
        campaignId: true,
        userId: true,
        campaign: {
          select: {
            id: true,
            collected: true,
            numberOfWakif: true,
            title: true,
          }
        },
        user: {
          select: {
            id: true,
            largestWakaf: true
          }
        }
      }
    });

    if (transaction && transaction.status === 'PENDING') {
      if (!transaction.user) {
        return NextResponse
          .json({ status: 'error', message: 'User not found' }, { status: 200 })
      }

      if (!transaction.campaign) {
        return NextResponse
          .json({ status: 'error', message: 'Campaign not found' }, { status: 200 })
      }

      const hash = createHash('sha512')
        .update(`${transaction.id}${data.status_code}${data.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`)
        .digest('hex');

      if (data.signature_key !== hash) {
        return NextResponse
          .json({ status: 'error', message: 'Invalid signature key' }, { status: 200 })
      }

      const transactionStatus = data.transaction_status;
      const fraudStatus = data.fraud_status;
      const paymentType = ((data.store || data.payment_type || '') as string).replace('_', ' ');

      if (transactionStatus == 'capture') {
        if (fraudStatus == 'accept') {
          // TODO set transaction status on your database to 'success'
          // and response with 200 OK
          await handleOnSuccess({
            campaignId: transaction.campaign.id,
            campaignNumberOfWakif: transaction.campaign.numberOfWakif,
            collected: transaction.campaign.collected,
            largestWakaf: transaction.user.largestWakaf,
            paymentMethodLabel: `Midtrans ${paymentType.toUpperCase()}`,
            titleCampaign: transaction.campaign.title,
            transactionId: transaction.id,
            userId: transaction.userId,
            amount: transaction.amount,
          })
        }
      } else if (transactionStatus == 'settlement') {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        await handleOnSuccess({
          campaignId: transaction.campaign.id,
          campaignNumberOfWakif: transaction.campaign.numberOfWakif,
          collected: transaction.campaign.collected,
          largestWakaf: transaction.user.largestWakaf,
          paymentMethodLabel: `Midtrans ${paymentType.toUpperCase()}`,
          titleCampaign: transaction.campaign.title,
          transactionId: transaction.id,
          userId: transaction.userId,
          amount: transaction.amount
        })
      } else if (transactionStatus == 'cancel' ||
        transactionStatus == 'deny' ||
        transactionStatus == 'expire') {
        // TODO set transaction status on your database to 'failure'
        // and response with 200 OK
        await db.transaction.update({
          where: { id: transaction.id },
          data: {
            status: 'FAILED'
          }
        });

        await db.notification.create({
          data: {
            userId: transaction.userId,
            title: 'Transaksi wakaf gagal',
            type: 'ERROR',
            message: `
              Serah terima wakaf pada kampanye  
              <b>${transaction.campaign.title}</b> 
              dengan nominal ${formatRupiah(transaction.amount)} gagal dilakukan. 
              Hal ini terjadi karena batas pembayaran wakaf telah kadaluarsa 
              atau anda membatalkannya dihalaman transaksi detail. Lihat lebih rinci di  
              <a href="/dashboard/transaction/${transaction.id}" target="_blank" rel="noopener noreferrer">
                halaman transaksi
              </a>.
            `
          }
        })
      } else if (transactionStatus == 'pending') {
        // TODO set transaction status on your database to 'pending' / waiting payment
        // and response with 200 OK
        await db.transaction.update({
          where: { id: transaction.id },
          data: {
            status: 'PENDING'
          }
        });
      }

      return NextResponse
        .json({ status: 'success', message: 'OK' }, { status: 200 })
    }

    if (transaction) {
      return NextResponse
        .json({ status: 'error', message: 'Transaction is not pending' }, { status: 200 })
    }

    return NextResponse
      .json({ status: 'error', message: 'Transaction not found' }, { status: 200 })
  } catch (error) {
    return NextResponse
      .json({ status: 'error', message: 'Server Error' }, { status: 200 })
  }
}

interface SuccessHandleParams {
  transactionId: string;
  campaignNumberOfWakif: number;
  userId: string;
  largestWakaf: number;
  campaignId: number;
  titleCampaign: string;
  collected: number;
  paymentMethodLabel: string;
  amount: number;
}

async function handleOnSuccess(data: SuccessHandleParams) {
  // Update status dan urutan wakif
  await db.transaction.update({
    where: { id: data.transactionId },
    data: {
      status: 'COMPLETED',
      numberOfWakif: data.campaignNumberOfWakif + 1,
      paymentMethodLabel: data.paymentMethodLabel
    }
  });

  // Update data wakaf dan berwakaf user
  await db.user.update({
    where: { id: data.userId },
    data: {
      berwakafCount: {
        increment: 1
      },
      berwakafTotal: {
        increment: data.amount
      },
      largestWakaf: data.largestWakaf >= data.amount ? data.largestWakaf : data.amount
    }
  });

  // Update data campaign
  const updatedCampaign = await db.campaign.update({
    where: { id: data.campaignId },
    data: {
      numberOfWakif: {
        increment: 1
      },
      collected: {
        increment: data.amount
      },
      availableBalance: {
        increment: data.amount
      },
      remaining: {
        decrement: data.amount
      }
    }
  });

  // Update data campaign jika sudah mencapai target
  if ((updatedCampaign.collected >= updatedCampaign.target) && updatedCampaign.status === 'RUNNING') {
    await db.campaign.update({
      where: { id: data.campaignId },
      data: {
        status: 'REACHED'
      }
    })

    await db.notification.create({
      data: {
        campaignId: data.campaignId,
        title: 'Hore... kampanye sudah mencapai target😍',
        type: 'SUCCESS',
        role: 'ADMIN',
        message: `
          Kampanye dengan judul <b>${data.titleCampaign}</b> telah berhasil mencapai 
          target dengan wakaf terkumpul sebesar ${formatRupiah(data.collected)}. 
          Anda dapat melihat detail kampanye tersebut di 
          <a href="/dashboard/campaign/${data.campaignId}" target="_blank" rel="noopener noreferrer">
            halaman detail
          </a>.
        `
      }
    })
  }

  // Notifikasi pembayaran berhasil
  await db.notification.create({
    data: {
      userId: data.userId,
      title: 'Yayy... transaksi wakaf berhasil',
      type: 'SUCCESS',
      message: `
        Serah terima wakaf pada kampanye  
        <b>${data.titleCampaign}</b> 
        dengan nominal ${formatRupiah(data.amount)} berhasil dilakukan. 
        Terima kasih atas bantuan anda, wakaf akan segera disalurkan💖. Lihat lebih rinci di 
        <a href="/dashboard/transaction/${data.transactionId}" target="_blank" rel="noopener noreferrer">
          halaman transaksi
        </a>.
      `
    }
  })
}