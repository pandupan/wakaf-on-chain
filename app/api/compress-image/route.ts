import sharp from 'sharp';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const form = await req.formData();

  const width = isNaN(+form.get('width')!) ? 100 : +form.get('width')!;
  const height = isNaN(+form.get('height')!) ? 100 : +form.get('height')!;

  const file = form.get('file') as File;
  const buffer = await file.arrayBuffer();

  try {
    const outputBuffer = await sharp(buffer)
      .resize(width, height)
      .toBuffer();

    const base64Image = outputBuffer.toString('base64');

    return NextResponse.json(base64Image, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to process image' }, {
      status: 500,
    });
  }
}
