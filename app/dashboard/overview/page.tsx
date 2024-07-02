import React from 'react'
import Overview from './_components/overview'
import Graphic from '@/components/shared/graphic'

const page = () => {
  return (
    <div>
      <Overview/>
      <div className='rounded-xl p-4 bg-background mt-4 shadow-sm'>
        <h2 className='font-bold text-secondary'>Pemasukan Pertahun</h2>
      <Graphic/>
      </div>
    </div>
  )
}

export default page
