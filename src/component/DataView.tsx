import { MovieModels } from '@/models/modelsMovie'
import React from 'react'
import { CiBookmark, FaBookOpen, FaPlay, FaTrophy, MdOutlineSubtitles, RiStarSFill, SiImdb } from './icons'
import Image from 'next/image'


interface DataViwesProps {
    InitialDataMovie : MovieModels
    setBookmark: (_id: any) => void
}


const DataViews = ( {InitialDataMovie, setBookmark}: DataViwesProps) => {
  return (

        <div>

            { InitialDataMovie && 
            (
            
            <div  className="relative  padding-x padding-y flex items-center justify-around flex-col bg- h-screen"
                style={{
                    backgroundImage: `url(${InitialDataMovie.big_image})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="flex justify-between items-center w-full max-w-[1450px] mt-10">
    
                </div>
    
                <div className="flex items-center justify-center w-full z-30 gap-8   ">
    
                    <div>
                        <Image
                            className="h-[18rem] w-full rounded-xl object-contain"
                            width={400}
                            height={400}
                            src={ InitialDataMovie.big_image }
                            alt="logo main"
                            />
        
                    </div>
    
                    <div className='flex  flex-col space-y-5 w-full max-w-[750px]'>
    
                        <p className="text-white text-sm">
                            {InitialDataMovie.year }
                        </p>
    
                        <div className="flex items-end justify-start gap-2 text-white">
                            <h1 className="text_responsive">
                                {InitialDataMovie.title }
                            </h1>
                            <span className=" flex  gap-2 text-[10px] sm:text-xl font-bold ">
                                <FaTrophy size={24} className='text-blue-700'/>
                                Top {InitialDataMovie.rank}
                            </span>
                        </div>
    
                        <div className="flex flex-row flex-wrap gap-2 text-sm text-white">
                                {Array.isArray(InitialDataMovie) && InitialDataMovie.genre.map((gen: any, index: any) => (
                                    <span key={`${gen}-${index}`} className=" flex flex-row flex-wrap gap-2 px-1 border-[1px] border-slate-100">
                                        {gen}
                                    </span>
                                ))}
                        </div>
    
                        <p className="text-white text-sm">
                            {InitialDataMovie.description }
                        </p>
    
                        <div className="w-full max-w-sm text-sm font-regular flex justify-start items-start flex-row gap-2 text-white">
                                <span className="flex-center gap-2">
                                    <SiImdb size={24}/>
                                    {InitialDataMovie.imdbid}
                                </span>
                                <span className="flex-center gap-2">
                                    <MdOutlineSubtitles size={24}/>
                                    Subtitles
                                </span>
                                <div className=" flex-center text-orange-400">
                                    <RiStarSFill size={24}/>
                                    <h1 className="">{InitialDataMovie.rating }</h1>
                                </div>
                        </div>
    
                        <div className='flex gap-5'>
                            <button className="flex-center gap-2 p-1 sm:p-1 lg:p-2 rounded-xl bg-primary1">
                                <FaPlay size={22} className='text-white'/>
                                <h1 className="text-[12px] sm:text-md font-medium text-white">Watch trailer</h1>
                            </button >
                            <button onClick={() => { setBookmark(InitialDataMovie && InitialDataMovie._id) } } className="flex-center gap-2 bg-black p-1 sm:p-1 lg:p-2 border border-slate-400 rounded-md">
                                <FaBookOpen size={24} className='text-white'/>
                                <h1 className="text-[12px] sm:text-md font-medium text-white">Bookmark</h1>
    
                            </button>
                        </div>
    
                    </div>
                </div>
    
                <div className="  transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25 z-20 ">
                </div>  
                
            
            
            </div>
            )}

            </div>
    

    
 )
}

export default DataViews