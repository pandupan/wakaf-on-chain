import { Button } from '@/components/ui/button'
import React from 'react'

function CallToAction() {
  return (
    <section className="bg-gradient-to-tr from-secondary to-blue-500 text-secondary-foreground py-16 mb-10">
      <div className="container mx-auto sm:text-center">
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 max-w-2xl mx-auto">
          Mari <i>Berwakaf</i> dan Berbagi <i>Kebaikan</i>
        </h2>
        <p className="sm:text-lg lg:text-xl mb-8 max-w-6xl mx-auto">
          &ldquo;<b>Bergabunglah</b> dengan gerakan wakaf kami dan jadilah bagian dari perubahan positif yang abadi. Dengan berwakaf, anda dapat membantu kami <b>menyediakan</b> pendidikan dan fasilitas yang lebih baik untuk para santri di Pondok Pesantren Mahasiswa Al-Ihsan Tasikmalaya.&rdquo;
        </p>
        <div className="sm:flex sm:justify-center space-x-4">
          <Button variant="primary" className="font-semibold">
            Bergabung Sekarang
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CallToAction