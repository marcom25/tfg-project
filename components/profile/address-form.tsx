'use client'

import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Province } from '@/lib/data'

type AddressFormFieldsProps = {
  provincesAndCities: Province[];
  initialAddress: string;
  initialCity: string;
  initialProvince: string;
}

export default function AddressFormFields({ 
  provincesAndCities, 
  initialAddress, 
  initialCity, 
  initialProvince 
}: AddressFormFieldsProps) {
  const [selectedProvince, setSelectedProvince] = useState(initialProvince)

  const provinces = provincesAndCities.map(p => p.provincename)
  const cities = provincesAndCities
    .find(p => p.provincename === selectedProvince)
    ?.cities.map(c => c.cityname) ?? []

  return (
    <>
      <div className="space-y-2 col-span-2">
        <Label htmlFor="address">Dirección</Label>
        <Input
          id="address"
          name="address"
          defaultValue={initialAddress}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="province">Provincia</Label>
        <Select
          name="province"
          onValueChange={setSelectedProvince}
          defaultValue={initialProvince}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona tu provincia" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province} value={province}>
                {province}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">Ciudad</Label>
        <Select name="city" defaultValue={initialCity}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona tu ciudad" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

