import CardCampaign from '@/components/shared/card-campaign'
import { Button } from '@/components/ui/button'
import { getAllCampaigns } from '@/data/campaign';
import Link from 'next/link';

const LIMIT = 9;

async function Campaign() {
  const campaigns = await getAllCampaigns({ limit: LIMIT });

  if (campaigns === null) return null;

  return (
    <section id="campaign">
      <div className="container mx-auto my-10">
        <div className="text-center space-y-4">
          <h1 className="text-secondary text-3xl sm:text-5xl xl:text-6xl font-bold">
            Kampanye Wakaf
          </h1>
          <p className="text-center max-w-3xl mx-auto sm:text-base text-sm">
            Berikut adalah berbagai kampanye wakaf yang dapat Anda dukung. Setiap kampanye bertujuan untuk memberikan manfaat yang besar bagi penerima dan lingkungan sekitar.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-10">
          {campaigns.map((campaign) => (
            <CardCampaign
              key={campaign.id}
              data={campaign}
              className="border shadow-none"
            />
          ))}
        </div>
        {campaigns.length === LIMIT && (
          <div className="text-center mt-6">
            <Link href="/dashboard/campaign">
              <Button size="sm" variant="secondary" className="text-xs">
                Lebih banyak
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default Campaign