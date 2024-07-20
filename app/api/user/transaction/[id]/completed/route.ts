import { NextResponse } from "next/server"

interface IParams {
  campaignId?: number;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  return NextResponse.json({ params }, {
    status: 201
  });
}