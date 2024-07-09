import React from "react"
import DataTable from "./_components/data-table"
import { auth } from "@/auth"
import { getUserByEmail } from "@/data/user"
import { User } from "@prisma/client"
import { redirect } from "next/navigation"
import { getAllCampaigns } from "@/data/campaign"
import InputSearch from "@/components/shared/input-search"

const LIMIT = 9;

const CampaignManagementPage = async () => {
  const session = await auth();
  let user: User | null = null;

  if (!!session?.user.email!) {
    user = await getUserByEmail(session?.user.email!);
    if (!user || user.role !== 'ADMIN') redirect('/404');
  }

  const campaigns = await getAllCampaigns({
    includeUser: true,
  });

  if (campaigns === null) redirect('/error');

  return (
    <>
      <div className="max-w-sm">
        <InputSearch placeholder="Cari kampanye" />
      </div>
      <div className="p-4 rounded-lg bg-background mt-4">
        <DataTable data={campaigns} limit={LIMIT} />
      </div>
    </>
  );
};

export default CampaignManagementPage;
