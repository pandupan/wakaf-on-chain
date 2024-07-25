'use client'

import React, { ChangeEvent, useEffect, useMemo } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import _ from 'lodash'
import { cn } from '@/lib/utils';

interface IProps {
  placeholder: string;
  onChange?: (value: string) => void;
  className?: string;
}

function InputSearch({ placeholder, onChange, className }: IProps) {
  const debouncedResults = useMemo(() => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(event.target.value);
    };

    return _.debounce(handleChange, 500);
  }, [onChange]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, [debouncedResults]);

  return (
    <label className="relative block">
      <span className="absolute right-3 top-[50%] -translate-y-[50%]">
        <IoSearchOutline />
      </span>
      <input
        type="text"
        className={cn(
          'pr-8 pl-4 py-2 block w-full text-sm border-0 rounded-full shadow-sm focus-visible:outline-none',
          className
        )}
        placeholder={placeholder}
        onChange={debouncedResults}
      />
    </label>
  )
}

export default InputSearch