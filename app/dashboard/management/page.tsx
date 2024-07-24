import React from "react"
import DataTable from "./_components/data-table"
import { auth } from "@/auth"
import { getUserByEmail } from "@/data/user"
import { User } from "@prisma/client"
import { redirect } from "next/navigation"
import { getAllCampaigns } from "@/data/campaign"
import { isAdmin } from "@/lib/utils"

const LIMIT = 9;

const CampaignManagementPage = async () => {
  const session = await auth();
  let user: User | null = null;

  if (!!session?.user.email!) {
    user = await getUserByEmail(session?.user.email!);
    if (!user || !isAdmin(user.role)) redirect('/404');
  }

  const campaigns = await getAllCampaigns({
    includeUser: true,
    sorted: 'updatedAt'
  });

  if (campaigns === null) redirect('/error');

  return (
    <>
      <DataTable data={campaigns} limit={LIMIT} />
    </>
  );
};

export default CampaignManagementPage;
