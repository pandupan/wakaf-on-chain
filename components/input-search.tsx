import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'

interface IProps {
  placeholder: string;
}

function InputSearch({ placeholder }: IProps) {
  return (
    <label className="relative block bg-gray-100 rounded-md">
      <span className="absolute right-3 top-[50%] -translate-y-[50%]">
        <IoSearchOutline />
      </span>
      <input
        type="text"
        className="pr-8 pl-4 py-1.5 block w-full text-sm border-0 rounded-full shadow-sm focus-visible:outline-none"
        placeholder={placeholder}
      />
    </label>
  )
}

export default InputSearch