import { BiSearch } from 'react-icons/bi'
import { AiOutlineTwitter, AiOutlineInstagram } from 'react-icons/ai';
import { GrFacebookOption } from 'react-icons/gr'
import Link from 'next/link';

export const recentPostData = [
    {
        img: "/bp7.png",
        title: "It is a long established fact",
        des: "Aug 09 2020",
    },
    {
        img: "/bp8.png",
        title: "It is a long established fact",
        des: "Aug 09 2020",
    },
    {
        img: "/bp9.png",
        title: "It is a long established fact",
        des: "Aug 09 2020",
    },
    {
        img: "/bp10.png",
        title: "It is a long established fact",
        des: "Aug 09 2020",
    },

]

export const saleProductData = [
    {
        img: "/bp11.png",
        title: "Elit ornare in enim mauris.",
        des: "Aug 09 2020",
    },
    {
        img: "/bp12.png",
        title: "Viverra pulvinar et enim.",
        des: "Aug 09 2020",
    },
    {
        img: "/bp13.png",
        title: "Mattis varius donec fdsfd",
        des: "Aug 09 2020",
    },
]

export const offerProductData = [
    {
        img: "/bp14.png",
        title: "Duis lectus est.",
        price: "$12.00 - $15.00"
    },
    {
        img: "/bp15.png",
        title: "Sed placerat.",
        price: "$12.00 - $15.00"
    },
    {
        img: "/bp16.png",
        title: "Netus proin.",
        price: "$12.00 - $15.00"
    },
    {
        img: "/bp17.png",
        title: "Platea in.",
        price: "$12.00 - $15.00"
    },
]




const RightBlog = () => {

  return (
    <div className='xl:-ml-2 lg:ml-10  xl:mr-24 '>
      <h3 className='text-[22px] text-[#151875] dark:text-white lg:mt-0  mt-12'>Search</h3>
      <div  className='relative mt-4'>
        <div>
            <input placeholder='Search For Posts' className='w-full p-4 py-3 border-[1px] rounded-md border-[#5b5eac] text-[#5b5eac]' type="search" name="" id="" />
            <div className='absolute top-3 right-5'>
                <BiSearch className='text-black/40 text-2xl' />
            </div>
        </div>
      </div>

      <div>
          <h3 className='text-[22px]  text-[#151875] dark:text-white mt-12'>Categories</h3>

          <div className='grid grid-cols-2 items-center justify-center  mt-6'>
            <div className=''>
                <button className='text-[14px] bg-pink-500 text-white px-4 py-2 '>Hobbies (14) </button>
                <h6 className='text-[14px] text-[#3F509E] dark:text-white/70 font-semibold my-4'>Womer (21)</h6>
                <h6 className='text-[14px] text-[#3F509E] dark:text-white/70  font-semibold'>Womer (21)</h6>
            </div>

            <div className='text-center lg:mr-28'>
              <h6 className='text-[14px] text-[#3F509E] dark:text-white/70 font-semibold'>Womer (21)</h6>
              <h6 className='text-[14px] text-[#3F509E] dark:text-white/70  font-semibold my-4'>Womer (21)</h6>
              <h6 className='text-[14px] text-[#3F509E] dark:text-white/70    font-semibold'>Womer (21)</h6>
            </div>
          </div>
      </div>

      <div>
          <h3 className='text-[22px] text-[#151875] dark:text-white mt-12 font-semibold'>Recent Post</h3>
          <div>
            {recentPostData.map((item , index) => {
              return <div key={index} className='flex items-center gap-3 my-6'>
                <div>
                  <img src={item.img} alt="" />
                </div>
                <div>
                  <h5 className='text-[#3F509E] dark:text-white/70 font-semibold'>{item.title}</h5>
                  <h5 className='text-[11px] text-[#3F509E] dark:text-white/70'>{item.des}</h5>
                </div>

              </div>
            })}
          </div>
      </div>

      <div>
          <h3 className='text-[22px] text-[#151875] dark:text-white mt-12 font-semibold'>Sale Product</h3>
          <div>
            {saleProductData.map((item , index) => {
              return <div key={index} className='flex items-center gap-3 my-6'>
                    <div>
                      <img src={item.img} alt="" />
                    </div>
                    <div>
                      <h5 className='text-[#3F509E] dark:text-white/70 font-semibold'>{item.title}</h5>
                      <h5 className='text-[11px] text-[#3F509E] dark:text-white/70'>{item.des}</h5>
                    </div>

            </div>
            })}
          </div>
      </div>

      <div>
          <h3 className='text-[22px] text-[#151875] dark:text-white mt-12 font-semibold py-8'>Offer Product</h3>

          <div className='grid grid-cols-2 '>
            {offerProductData.map((item , index) => {
              return <div key={index} className='mb-6'>
                <div className='flex justify-between  text-center'>
                  <div>
                    <img src={item.img} alt="" />
                    <h5 className='font-medium text-[#151875] dark:text-white/70'>{item.title}</h5>
                    <h6 className='text-xs text-[#55555c]'>{item.price}</h6>
                  </div>
                </div>
              </div>
            })}
          </div>
      </div>

      <div>
        <h3 className='text-[22px] text-[#151875] dark:text-white mt-12 font-semibold'>Follow</h3>

        <div className='flex shadow-primary w-max py-2 px-4 mt-6'>
          <div className='bg-indigo-500 text-white rounded-full p-2'>
              <GrFacebookOption className='text-2xl'/>
          </div>
          <div className='bg-pink-500 text-white rounded-full p-2 mx-4'>
              <AiOutlineInstagram className='text-2xl'/>
          </div>
          <div className='bg-blue-500 text-white rounded-full p-2'>
              <AiOutlineTwitter className='text-2xl'/>
          </div>
        </div>
      </div>

      <div>
          <h3 className='text-[22px] text-[#151875]  dark:text-white mt-12 font-semibold'>Tags</h3>
          <div className='grid grid-cols-3 my-3 text-[#3F509E]  dark:text-white/70 font-medium underline'>
            <Link className='mb-3' href="">General</Link>
            <Link  href="" className='!text-pink-500'>Atsanil</Link>
            <Link href="">Insas.</Link>
            <Link href="">Bibsaas</Link>
            <Link href="">Nulla.</Link>
          </div>
      </div>


    </div>
  )
}

export default RightBlog
 