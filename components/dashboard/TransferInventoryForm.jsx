"use client"
import SelectInput from '@/components/FormInputs/SelectInput'
import SubmitButton from '@/components/FormInputs/SubmitButton'
import TextInput from '@/components/FormInputs/TextInput'
import TextareaInput from '@/components/FormInputs/TextareaInput'
import { makePostRequest } from '@/lib/apiRequest'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function TransferInventoryForm() {

  const branches =[
    {
      label: "Branch A",
      value: "brancha"
    },
    {
      label: "Branch B",
      value: "branchb"
    },
    {
      label: "Branch C",
      value: "branchc"
    },
  ]
  const items =[
    {
      label: "Item A",
      value: "itema"
    },
    {
      label: "Item B",
      value: "itemb"
    },
    {
      label: "Item C",
      value: "itemc"
    },
  ]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)

  async function onSubmit(data){
    console.log(data)
    makePostRequest(
      setLoading,
      "/api/adjustments/transfer",
      data,
      "Stock Adjustment",
      reset
    )
  }

  return (
    <form 
        onSubmit={handleSubmit(onSubmit)} 
        className='w-full max-w-4xl p-4 bg-white border my-3 border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto'>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
       
        <TextInput 
          type='number'
          label="Reference Number" 
          name="referenceNumber"
          register={register} 
          errors={errors} 
        />

        <SelectInput 
          name="itemId" 
          label="Select the Item" 
          register={register} 
          className='w-full' 
          options={items}
       />

        <TextInput 
          type='number'
          label="Enter Quantity of Stocks to Transfer" 
          name="transferStockQty"
          register={register} 
          errors={errors}
          className='w-full' 
        />

        <SelectInput 
          name="givingWarehouseId" 
          label="Select the Warehouse that will give the Stock" 
          register={register} 
          className='w-full' 
          options={branches}
       />

       <SelectInput 
        name="receivingWarehouseId" 
        label="Select the Warehouse that will receive the Stock" 
        register={register} 
        className='w-full' 
        options={branches}
       />

        <TextareaInput 
          label="Adjustment Notes" 
          name="notes"
          register={register} 
          errors={errors}
        />
       
        </div>
        <SubmitButton isLoading={loading} title="Adjustment"/>
      </form>
  )
}
