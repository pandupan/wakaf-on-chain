'use client'

import { HTMLRenderer } from '@/components/core/html-renderer';
import React from 'react'

interface IProps {
  data: string;
}

function Description({ data }: IProps) {
  return (
    <div id="campaign-detail">
      <HTMLRenderer htmlString={data} />
    </div>
  )
}

export default Description