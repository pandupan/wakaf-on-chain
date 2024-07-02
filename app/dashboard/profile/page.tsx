"use client"

import { Card } from "@/components/ui/card"
import CardSertification from "./_components/sertifications"
import ProfileSection from "./_components/profile-section"


export default function ProfilePage() {

  return (
    <div className="w-full grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-5">
        <ProfileSection />
      </div>
      <div className="col-span-12 md:col-span-7">
        <CardSertification />
      </div>
    </div>
  )
}
