import React from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { FaListUl, FaRegHeart, FaSearchPlus  } from 'react-icons/fa'
import { BsFillGridFill } from 'react-icons/bs'
import { CgShoppingCart } from 'react-icons/cg'
import Link from 'next/link'
import Breadcrumb from '../BreadCrumb'
import Brands from '../Home/brands'

const shopListData = [
    {
        id: 1,
        img: "/sl1.png",
        title: "Accumsan tincidunt",
        offerPrice: "$26.00",
        regularPrice: "$52.00",
        review: "/assets/images/reviews.png",
        des: "ng Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.o.",
    },
    {
        id: 2,
        img: "/sl2.png",
        title: "In nulla",
        offerPrice: "$26.00",
        regularPrice: "$52.00",
        review: "/assets/images/reviews.png",
        des: "Long Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.o.",
    },
    {
        id: 3,
        img: "/sl3.png",
        title: "Vel sem",
        offerPrice: "$26.00",
        regularPrice: "$52.00",
        review: "/assets/images/reviews.png",
        des: "Loorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites.",
    },
    {
        id: 4,
            img: "/sl4.png",
        title: "Porttitor cum",
        offerPrice: "$26.00",
        regularPrice: "$52.00",
        review: "/assets/images/reviews.png",
        des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    },
    {
        id: 5,
        img: "/sl5.png",
        title: "Nunc in",
        offerPrice: "$26.00",
        regularPrice: "$52.00",
        review: "/assets/images/reviews.png",
        des: "Lororem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sitesto.",
    },
    {
        id: 6,
        img: "/sl6.png",
        title: "Vitae facilisis",
        offerPrice: "$26.00",
        regularPrice: "$52.00",
        review: "/assets/images/reviews.png",
        des: "Lo a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typsto.",
    },
    {
        id: 7,
        img: "/sl7.png",
        title: "Curabitur lectus",
        offerPrice: "$26.00",
        regularPrice: "$52.00",
        review: "/assets/images/reviews.png",
        des: "L a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typ.",
    },  
    
]

const ShopList = () => {

    const listIcon = [
        {
            icon: <CgShoppingCart/>
        },
        {
            icon: <FaRegHeart/>
        },
        {
            icon: <FaSearchPlus/>
        }
    ]
    
  return (
    <>
    <div className='max-w-[1540px] mx-auto'>
    
    <Breadcrumb
        mainHeading="Shop List"
        miniHeadings={['Home', 'pages', 'Shop List']}
      />

        <div className="md:container md:px-[1.3rem] px-[.8rem] pt-12 md:pt-[98px] flex items-center justify-between mx-auto  ">
          <div className=''>
              <h2 className='text-indigo-500 dark:text-white font-bold mt-2 text-xl lg:text-3xl'>Ecommerce Acceories & Fashion item</h2>
              <h4 className='text-gray-600 dark:text-white/70'>About 9,620 results (0.62 seconds)</h4>
          </div>
          <div className='hidden lg:block'>
                <div className='flex gap-9 '>
                    <div className='flex gap-2'>
                        <h3 className='text-indigo-500 dark:text-white/70 font-normal'>Per Page: </h3>
                        <h3 className='border rounded-sm border-indigo-400 dark:border-white/70 py-4 px-8' ></h3>
                    </div>
                    <div className='flex gap-2'>
                        <h3 className='text-indigo-500 dark:text-white/70 font-normal'>Sort By: </h3>
                        <h4 className='text-gray-500 dark:text-white/70   border rounded-sm border-primary py-1 px-3  flex items-center gap-1'>Best Match <span><BsChevronDown/></span></h4>
                    </div>
                    <div className='flex gap-8'>
                    <div className='flex items-center gap-2'>
                        <h3 className='text-indigo-500 dark:text-white/70 font-normal'>View:</h3>
                        <FaListUl className='text-indigo-500 dark:text-white/70'/>
                        <BsFillGridFill className='text-indigo-500 dark:text-white/70'/>
                    </div> 
                    <div>
                        <h3 className='border rounded-sm border-indigo-400 dark:border-white/70 py-4 px-8' ></h3>
                    </div>
                    </div>

                </div>
          </div>
        </div>

        <div className='md:container md:px-[1.3rem] px-[.8rem] md:mt-24 mt-6'>
            {shopListData.map((item) => {
                return <div key={item.id} className=' mb-8'>
                    <div className=' md:flex gap-6 shadow-sm shadow-black p-2 md:p-6 items-center '>
                        <div>
                            <img src={item.img} alt="" />
                        </div>

                        <div>
                            <div className='flex items-center gap-4'>
                                <h3 className='text-indigo-600 dark:text-white/70 text-xl'>{item.title}</h3>
                                <div className='my-3 flex justify-center '>
                                    <div className="flex h-3 md:w-[80px]  gap-2">
                                        <div className="h-3 w-3 rounded-full bg-yellow"></div>
                                        <div className="h-3 w-3 rounded-full bg-pink"></div>
                                        <div className="h-3 w-3 rounded-full bg-blue"></div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center gap-3'>
                                <h4 className='text-indigo-500 dark:text-white/70'>{item.offerPrice}</h4>
                                <h4 className='text-pink-500 dark:text-white/70 line-through'>{item.regularPrice}</h4>
                                <img src={item.review} alt="" />
                            </div>
                            <p className='mt-3 md:w-[70%] text-indigo-300 dark:text-white/70    '>{item.des}</p>
                            <div className='flex items-center gap-4 '>
                                {listIcon.map((item, index) => {
                                    return <div key={index} className='flext justify-center mt-6 bg-white rounded-full p-4 shadow-2xl '>
                                        <Link href=''  className='text-xl text-indigo-500'>
                                       {item.icon}
                                        </Link>
                                    </div>
                                })}
                            </div>

                        </div>

                    </div>
                </div>
            })}
        </div>

<Brands/>   

    </div>
    </>
  )
}

export default ShopList