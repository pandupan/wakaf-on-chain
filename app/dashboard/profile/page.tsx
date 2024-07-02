"use client"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import CardSertification from "./_components/card-setification"
import ProfileSection from "./_components/profile-section"


export default function ProfilePage() {

  return (
    <Card className="w-full flex flex-col lg:flex-row">
      <ProfileSection/>
      <Separator orientation="horizontal" className="lg:hidden" />
      <Separator orientation="vertical" className="hidden lg:block" />
      <CardSertification/>
    </Card>
  )
}
