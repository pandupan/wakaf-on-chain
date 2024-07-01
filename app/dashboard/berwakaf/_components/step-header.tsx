'use client'

import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'

interface IProps {
  data: {
    stepsCount: number[];
    currentStep: number;
  }
}

function StepHeader({ data }: IProps) {
  return (
    <div>
      <ul aria-label="Steps" className="flex items-center">
        {data.stepsCount.map((item, idx) => (
          <li key={`step-${idx}`} aria-current={data.currentStep == idx + 1 ? "step" : false} className="flex-1 last:flex-none flex items-center">
            <div className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full border-2 flex-none flex items-center justify-center ${data.currentStep > idx + 1 ? "bg-secondary border-secondary" : "" || data.currentStep == idx + 1 ? "border-secondary" : ""}`}>
              <span className={`w-2.5 h-2.5 rounded-full bg-secondary ${data.currentStep != idx + 1 ? "hidden" : ""}`}></span>
              {
                data.currentStep > idx + 1 ? (
                  <FaCheck fontSize={12} className="text-secondary-foreground" />
                ) : ""
              }
            </div>
            <hr className={`w-full border ${idx + 1 == data.stepsCount.length ? "hidden" : "" || data.currentStep > idx + 1 ? "border-secondary" : ""}`} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StepHeader