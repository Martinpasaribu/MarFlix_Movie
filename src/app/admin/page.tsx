'use client'


import React from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { FaExternalLinkAlt, RiDeleteBin7Line, RiStarSFill, TbMovie, MdModeEdit } from '@/component/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loading from '@/component/Loading';
import toast from 'react-hot-toast';


const Admin = () => {

    
  const { data: items, error } = useSWR('/api/movie', (url) => fetch(url).then((res) => res.json()));
  const router = useRouter();

  const setEdit = (id : any) => {
    router.push(`/admin/edit/${id}`);
  }



  const setDeleted = async (id :any ) => {
    const confirmed = confirm('Are you sure you want to delete this movie?');
    if (confirmed) {
      await axios.delete(`/api/movie/${id}`);
      // Refresh the movie list after deletion
      toast.success('Deleted Movie');
    }
  };

  if(!items ) return <Loading/>
  
  return (
    <main className='overflow-hidden font-sans bg-white  dark:bg-black'>

        <div className=" relative containOver  max-width flex flex-col gap-8 font-[family-name:var(--font-geist-sans)]">

            <section className='h-[8rem] w-full bg-slate-500'>

            </section>

            <section className='flex justify-end items-center h-[4rem] bg-slate-500 m-4 rounded-md p-2 px-4'>
                    <button className='bg-primary1 px-3 py-1 text-white'>
                        <Link href="/admin/create">Create Movie</Link>
                    </button>
            </section>



            <section  className="grid_item">
                {items && items.map((item: any, index:any) => (
                    <div key={index}  className="cursor-pointer relative flex flex-col justify-between rounded-lg  shadow-xl  p-2">

                        <div className="rounded overflow-hidden flex flex-col">
                        
                            <div className="relative ">
                            {item?.image? (
                                <Image
                                className="h-[18rem] w-full rounded-xl object-contain"
                                width={400}
                                height={400}
                                src={item.image}
                                alt="logo main"
                                />
                            ) : (
                                // Fallback in case the image is missing
                                <div className="h-[18rem] w-full rounded-xl bg-gray-200 flex items-center justify-center">
                                    <span>Image not available</span>
                                </div>
                            )}
                                <div className="hover:bg-transparent rounded-xl transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25 ">
                                </div>  
                                <div className="absolute top-0 left-0 flex flex-col justify-start items-start w-full">
                                    <h1 className="text-sm text-white backdrop-blur-sm  bg-black/40  px-2 py-1 font-semibold mt-1 ml-1 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out rounded-2xl">
                                        { item.title }
                                    </h1>
                                    <div className='flex-center gap-2 absolute top-10 left-2 z-40'>
                                        <button onClick={() => {setEdit(item._id)}} className='cursor-pointer w-full'>
                                            <MdModeEdit  size={20} className='text-white hover:text-blue-700 '/>
                                        </button>
                                        <button  onClick={() => {setDeleted(item._id)}}>
                                            <RiDeleteBin7Line onClick={()=> {}} size={22} className='cursor-pointer text-white hover:text-blue-700 '/>
                                        </button>
                            
                                    </div>

                                </div>
                            </div>

    

                        
                        </div>
                        
                        <div className="px-6 py-3 flex flex-col items-start justify-start rounded-md gap-4 ">
                            
                            <div className="w-full text-sm font-regular flex justify-between flex-row gap-2 dark:text-white">
                                <span className="flex-center gap-2">
                                    <TbMovie size={24} /> {item.year} ago
                                </span>
                                <div className="flex-center text-orange-400">
                                    <RiStarSFill size={24}/>
                                    <h1 className="">{item.rating}</h1>
                                </div>
                            </div>

                            <div className="flex flex-row flex-wrap gap-2 text-sm dark:text-white">
                                {Array.isArray(item.genre) && item.genre.map((gen: any, index: any) => (
                                    <span key={`${gen}-${index}`} className=" flex flex-row flex-wrap gap-2 px-1 border-[1px] dark:border-slate-100">
                                        {gen}
                                    </span>
                                ))}
                            </div>


                        </div>

                        <div className="absolute ribbon-2 top-5 -right-[1.2px] h-12 flex-center bg-biru2 text-white">

                        </div>
                    </div>
                ))}
            </section>

        </div>

    </main>
        

    
  )
}

export default Admin