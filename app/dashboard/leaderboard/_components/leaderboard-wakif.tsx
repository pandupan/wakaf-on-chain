import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCol,
  TableRow
} from '@/components/core/table'
import { FaCrown, FaMedal } from 'react-icons/fa'
import { abbreviateName, anonymizeName, cn, formatRupiah, numberPrefixer } from '@/lib/utils'
import { Button } from '@/components/ui/button';
import { getTopWakif } from '@/data/wakif';
import { auth } from '@/auth';

const LeaderboardWakif = async () => {
  const session = await auth();
  const role = session?.user.role!;
  const data = await getTopWakif(20, {
    getYourRank: true,
    userId: session?.user.id!
  });

  if (data.rank.length === 0) return null;

  return (
    <Table>
      <TableHead>
        <TableHeadCol className="rounded-l-lg">Top</TableHeadCol>
        <TableHeadCol>Nama</TableHeadCol>
        <TableHeadCol align="right">Total</TableHeadCol>
        <TableHeadCol align="right">Wakaf Terbesar</TableHeadCol>
        <TableHeadCol align="right" className="rounded-r-lg">Total Wakaf</TableHeadCol>
      </TableHead>
      <TableBody className="text-gray-700">
        {data.rank.length > 0 ? (
          <>
            {data.rank.map((wakif, index) => (
              <TableRow
                key={index}
                isEven={index % 2 === 0}
                className={`
                ${index === 0 ?
                    "bg-yellow-100 hover:bg-yellow-200" : index === 1 ?
                      "bg-orange-100 hover:bg-orange-200" : index === 2 ?
                        "bg-gray-200 hover:bg-gray-300" : "bg-gray-50 hover:bg-gray-100"}
              `}
              >
                <TableCell className="rounded-l-lg">
                  <div className="flex items-center">
                    {index === 0 ? (
                      <FaCrown className="text-yellow-500 text-xs sm:text-2xl" />
                    ) : (
                      <FaMedal className={cn(
                        'text-xs sm:text-2xl',
                        index === 1 ?
                          "text-orange-500" : index === 2 ?
                            "text-gray-400" : "text-gray-300"
                      )} />
                    )}
                    <span className={cn(
                      'text-xs font-bold ml-2',
                      index === 0 ?
                        'text-yellow-500' : index === 1 ?
                          'text-orange-500' : index === 2 ?
                            'text-gray-500' : ''
                    )}>
                      {`${index + 1}`}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="sm:hidden">
                    {wakif.id === session?.user.id ?
                      <b>{abbreviateName(wakif.name || 'Anonim')}</b> :
                      anonymizeName(abbreviateName(wakif.name || 'Anonim'))}
                  </span>
                  <span className="hidden sm:inline">
                    {wakif.id === session?.user.id ?
                      <b>{abbreviateName(wakif.name || 'Anonim', 2)}</b> :
                      anonymizeName(abbreviateName(wakif.name || 'Anonim', 2))}
                  </span>
                </TableCell>
                <TableCell align="right">
                  {wakif.berwakafCount}x
                </TableCell>
                <TableCell align="right">
                  <span className="md:hidden">
                    Rp {numberPrefixer(wakif.largestWakaf)}
                  </span>
                  <span className="hidden md:inline">
                    {formatRupiah(wakif.largestWakaf)}
                  </span>
                </TableCell>
                <TableCell align="right" className="rounded-r-lg">
                  <span className="md:hidden">
                    Rp {numberPrefixer(wakif.berwakafTotal)}
                  </span>
                  <span className="hidden md:inline">
                    {formatRupiah(wakif.berwakafTotal)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
            {role === 'USER' && data.yourRank && (
              <TableRow className="bg-secondary/20 hover:bg-secondary/20">
                <TableCell className="rounded-l-lg">
                  <div className="flex items-center">
                    <FaMedal className="text-xs sm:text-2xl text-secondary" />
                    <span className="text-xs font-bold ml-2 text-gray-500">
                      {data.yourRank}
                    </span>
                  </div>
                </TableCell>
                <TableCell colSpan={4} className="font-bold rounded-r-lg">
                  Posisi anda saat ini
                </TableCell>
              </TableRow>
            )}
          </>
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center space-y-4">
              <p>
                Peringkat masih kosong. {role === 'USER' && 'Ayo jadilah yang pertama!'}
              </p>
              {role === 'USER' && (
                <Button size="sm" variant="secondary" className="text-xs">
                  Mulai berwakaf
                </Button>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default LeaderboardWakif;
