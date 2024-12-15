import React from 'react'
import DemoProduct from './demoProduct/demoProduct'
import ShippingInfo from '@/app/components/demo/shippingInfo/shippingInfo'

const Demo = () => {
  return (
    <div className='max-w-[1500px] mx-auto'>
<div className='bg-[#F6F5FF] py-20 px-4 max-w-[1800px] capitalize lg:pl-32 '>
  <h2 className="text-left text-[#151875] text-4xl md:text-5xl font-bold mb-4">
    hekto demo
  </h2>
  
</div>

        <div className='xl:container lg:px-[1.3rem] px-[.8rem] lg:flex justify-center gap-8 lg:mb-32'>
            <div className=' lg:w-[770px]'>
                <ShippingInfo/>
            </div>

            <div className='lg:ml-10 lg:w-[400px] '>
                <DemoProduct/>
            </div>
        </div>

    </div>
  )
}

export default Demo