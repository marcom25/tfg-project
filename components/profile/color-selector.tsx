'use client'

import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const colors = [
  { name: 'Red', value: 'bg-red-500' },
  { name: 'Blue', value: 'bg-blue-500' },
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Yellow', value: 'bg-yellow-500' },
  { name: 'Purple', value: 'bg-purple-500' },
  { name: 'Pink', value: 'bg-pink-500' },
  { name: 'Indigo', value: 'bg-indigo-500' },
  { name: 'Teal', value: 'bg-teal-500' },
]

type ColorSelectorProps = {
  initialColor: string
}

export function ColorSelector({ initialColor }: ColorSelectorProps) {
  const [selectedColor, setSelectedColor] = useState(initialColor)

  return (
    <div className="space-y-2 w-full max-w-xs">
      <Label>Color del Avatar</Label>
      <RadioGroup
        defaultValue={selectedColor}
        onValueChange={(value) => {
          setSelectedColor(value)
          const hiddenInput = document.getElementById('fotoPerfil') as HTMLInputElement
          if (hiddenInput) hiddenInput.value = value
        }}
        className="grid grid-cols-4 gap-2"
      >
        {colors.map((color) => (
          <div key={color.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={color.value}
              id={color.value}
              className="sr-only"
            />
            <Label
              htmlFor={color.value}
              className={`w-8 h-8 rounded-full ${color.value} cursor-pointer ring-2 ring-offset-2 ring-transparent transition-all ${
                selectedColor === color.value ? 'ring-black' : 'hover:ring-gray-300'
              }`}
            />
          </div>
        ))}
      </RadioGroup>
      <input type="hidden" id="fotoPerfil" name="fotoPerfil" value={selectedColor} />
    </div>
  )
}
