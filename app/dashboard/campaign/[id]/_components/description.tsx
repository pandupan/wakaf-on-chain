import { HTMLRenderer } from '@/components/core/html-renderer';
import React from 'react'

interface IProps {
  data: string;
}

function Description({ data }: IProps) {
  return (
    <>
      <h2 className="text-lg sm:text-xl font-bold">Deskripsi</h2>
      <div id="campaign-detail">
        <HTMLRenderer htmlString={data} />
      </div>
    </>
  )
}

export default Description