'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image';

import Link from 'next/link';
import { CiBookmark, FaExternalLinkAlt, FaTrophy, RiDeleteBin7Line } from '@/component/icons';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import { getBookmark } from '@/lib/slice/moviedbSlice';
import toast from 'react-hot-toast';

const BookmarkModal = ({ isOpen, closeModal , score, correct, timeSpeed } : any) => {
    
    const dispatch = useAppDispatch();
    const DataMovieStore = useAppSelector((state) => state.movie.stateBookmark);

    const removeBookmark = (id: string) => {
        // Ambil bookmark dari localStorage
        const storedBookmarks = localStorage.getItem('bookmarks');
        const bookmarks: string[] = storedBookmarks ? JSON.parse(storedBookmarks) : [];
      
        // Filter bookmark untuk menghapus ID yang sesuai
        const updatedBookmarks = bookmarks.filter((bookmarkId) => bookmarkId !== id);
      
        // Simpan kembali data ke localStorage
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      
        console.log('Bookmark removed:', id);
        toast.success('Bookmark One Movie has Deleted');
        dispatch(getBookmark());

      };

      
    if (!isOpen) 
        
    return null   


    return (
        <div className='fixed inset-0 z-40'>


        <div onClick={closeModal} className="fixed inset-0 z-30 backdrop-blur-sm  bg-black/40   animate-bag"></div>
        
        <div className="z-30 flex inset-0 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 animate-bag justify-center items-center w-full  max-h-full">
            <div className=' w-full max-w-md max-h-full  rounded-xl  '>
                <div className="p-4 w-full max-w-md max-h-full bg-slate-800 rounded-xl m-auto ">
                    
                    {/* Header */}
                    <div className='relative flex justify-between '>
                        <div className='flex '>
                            <CiBookmark size={24} className="text-white" />
                            <h1 className=' ml-2 font-bold text-lg text-white sm:text-xl'> Bookmark </h1>
                        </div>

                        <div onClick={closeModal} className="cursor-pointer end-2.5  text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </div>
                    </div>


                    {/* Body */}

                    <div className='scrl p-3 text-sm font-semibold text-slate-700 grid justify-items-end gap-2 mt-8 max-h-[30rem] overflow-y-auto'>
        
                        { DataMovieStore && DataMovieStore.map((data, index ) => (
                            <div key={index} className="z-30 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                               
                                <Image              
                                    width={400}
                                    height={400}
                                    src={data.image}
                                    alt="logo cpns" 
                                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" />
                                
            
                               
                                <div className="relative flex flex-col gap-2  justify-between p-4 leading-normal">
                                    <span className=" flex  justify-start gap-2 text-[10px] sm:text-sm font-bold text-orange-400">
                                        <FaTrophy size={20} className='text-blue-700'/>
                                        Top {data.rank}
                                    </span>
                                    <div>
                                        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{data.title}</h5>
                                        
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.description}</p>
                                    </div>
                                    <div className='flex-center gap-2 absolute bottom-1 right-1  z-40'>
                                        <a  href={`${data.imdb_link}`} className='cursor-pointer w-full'>
                                            <FaExternalLinkAlt  size={20} className='text-white hover:text-blue-700 '/>
                                        </a>
                                        <div>
                                            <RiDeleteBin7Line onClick={()=> {removeBookmark(data._id)}} size={22} className='cursor-pointer text-white hover:text-blue-700 '/>
                                        </div>
                            
                                    </div>
                                </div>
                            </div>
                        ))}
          
              
                    </div>

                
                    
                    {/* Footer */}
                    <div className='flex justify-between w-full py-5 px-4  animate-buttons'>

                    </div>

                </div>  
            </div>
        </div>
    </div>
    )

}

export default BookmarkModal