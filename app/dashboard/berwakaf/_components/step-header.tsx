'use client'

import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'

function StepHeader() {
  const [steps, setStep] = useState({
    stpesCount: [1, 2, 3, 4],
    currentStep: 1
  })

  return (
    <div>
      <ul aria-label="Steps" className="flex items-center">
        {steps.stpesCount.map((item, idx) => (
          <li key={`step-${idx}`} aria-current={steps.currentStep == idx + 1 ? "step" : false} className="flex-1 last:flex-none flex items-center">
            <div className={`w-5 sm:w-6 h-5 sm:h-6 rounded-full border-2 flex-none flex items-center justify-center ${steps.currentStep > idx + 1 ? "bg-secondary border-secondary" : "" || steps.currentStep == idx + 1 ? "border-secondary" : ""}`}>
              <span className={`w-2.5 h-2.5 rounded-full bg-secondary ${steps.currentStep != idx + 1 ? "hidden" : ""}`}></span>
              {
                steps.currentStep > idx + 1 ? (
                  <FaCheck fontSize={12} className="text-secondary-foreground" />
                ) : ""
              }
            </div>
            <hr className={`w-full border ${idx + 1 == steps.stpesCount.length ? "hidden" : "" || steps.currentStep > idx + 1 ? "border-secondary" : ""}`} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StepHeader