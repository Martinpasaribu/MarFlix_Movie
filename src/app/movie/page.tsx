import { MovieModels } from '@/models/modelsMovie'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { AiOutlineComment, GiBackwardTime, RiStarSFill,FaPlay, FaTrophy, SiImdb, MdOutlineSubtitles, IoIosMore, TbMovie, CiBookmark } from '@/component/icons'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks'
import BookmarkModal from '@/constants/modalBookmark'
import { FaBookOpen } from "@/component/icons";
import { getBookmark, setPickDataView } from '@/lib/slice/moviedbSlice'
import SearchBar from '@/component/Searchbar'
import DataViews from '@/component/DataView'
import toast from 'react-hot-toast'



interface MovieDashboardProps {
    initialDataMovie : MovieModels[]
}


const MovieDashboard = ( { initialDataMovie } : MovieDashboardProps) => {
    const dispatch = useAppDispatch();

    const [DataMovie, setDataMovie] = useState<MovieModels[]>()
    const DataMovieStore = useAppSelector((state) => state.movie.stateMovie);
    const darkMode = useAppSelector((state) => state.movie.stateTogle);
    const DataView = useAppSelector((state) => state.movie.stateDataPick);


    const [isModalOpen, setModalOpen] = useState(false);
    const [indexView, setindexView] = useState(0);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    
    const setBookmark = (id: string) => {
        // Ambil data dari localStorage dan pastikan menangani nilai null
        const storedBookmarks = localStorage.getItem('bookmarks');
        const bookmarks: string[] = storedBookmarks ? JSON.parse(storedBookmarks) : [];
      
        // Cek apakah `id` sudah ada dalam array
        if (!bookmarks.includes(id)) {
          // Tambahkan `id` ke array jika belum ada
          bookmarks.push(id);
          
          // Simpan array yang diperbarui ke localStorage
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
          console.log('Bookmark added:', id);
          toast.success('One Movie Bookmark added');
        } else {
          console.log('Bookmark already exists:', id);
        }


      };
      
      const setMainView = ( id : any) => {
        setindexView(0)
        dispatch(setPickDataView(id));
            console.log('set view:', id);
        window.scrollTo({
            top: 0, 
            behavior: 'smooth', // Memberikan animasi scrolling
          });
      }
      

    // Menyimpan preferensi tema ke localStorage
    useEffect(() => {
    if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
    }
    }, [darkMode]);

    

    useEffect(() => {
        // Update state lokal ketika `DataMovieStore` berubah
        if (DataMovieStore && DataMovieStore.length > 0) {
          setDataMovie(DataMovieStore);
          console.log('fetch in redux:', DataMovieStore);
        } else {
          console.log('error fetch in redux:', DataMovieStore);
        }
      }, [DataMovieStore]);
    

      useEffect(() => {
        if (isModalOpen) {
          dispatch(getBookmark());
          console.log('create bookmark:');
        } else {
          console.log('error create bookmark:');
        }
      }, [dispatch, isModalOpen]);

    return (
  


        <div className="">



        <BookmarkModal isOpen={isModalOpen} closeModal={closeModal} />

        <button onClick={openModal} className="fixed bottom-10 right-10 z-40">
            <FaBookOpen size={24} className="w-[4rem] h-[4rem] text-primary1 dark:text-white"/>
        </button>

      
        { DataView._id ? (

            <DataViews InitialDataMovie={DataView} setBookmark={setBookmark} />

        ) : (
            <div>

                { DataMovie && DataMovie.length > 0 && (
                    
                    <div  className="relative  padding-x padding-y flex items-center justify-around flex-col bg- h-screen"
                        style={{
                            backgroundImage: `url(${DataMovie && DataMovie.length > 0 ? DataMovie[indexView].big_image : ''})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <div className="flex justify-between items-center w-full max-w-[1450px] mt-10">
        
                        </div>
        
                        <div className="flex items-center justify-center w-full z-30 gap-8 ">
        
                            <div>
                                <Image
                                    className="h-[18rem] w-full rounded-xl object-contain"
                                    width={400}
                                    height={400}
                                    src={DataMovie && DataMovie.length > 0 ? DataMovie[indexView].big_image : ''}
                                    alt="logo main"
                                    />
                
                            </div>
        
                            <div className='flex  flex-col space-y-5'>
        
                                <p className="text-white text-sm">
                                    {DataMovie && DataMovie.length > 0 ? DataMovie[indexView].year : 'No data available'}
                                </p>
        
                                <div className="flex items-end justify-start gap-2 text-white">
                                    <h1 className="text_responsive">
                                        {DataMovie && DataMovie.length > 0 ? DataMovie[indexView].title : 'No data available'}
                                    </h1>
                                    <span className=" flex  gap-2 text-[10px] sm:text-xl font-bold ">
                                        <FaTrophy size={24} className='text-blue-700'/>
                                        Top {DataMovie && DataMovie.length > 0 ? DataMovie[indexView].rank : 'No data available'}
                                    </span>
                                </div>
        
                                <div className="flex flex-row flex-wrap gap-2 text-sm text-white">
                                        {Array.isArray(DataMovie) && DataMovie[indexView].genre.map((gen: any, index: any) => (
                                            <span key={`${gen}-${index}`} className=" flex flex-row flex-wrap gap-2 px-1 border-[1px] border-slate-100">
                                                {gen}
                                            </span>
                                        ))}
                                </div>
        
                                <p className="text-white text-sm">
                                    {DataMovie && DataMovie.length > 0 ? DataMovie[indexView].description : 'No data available'}
                                </p>
        
                                <div className="w-full max-w-sm text-sm font-regular flex justify-start items-start flex-row gap-2 text-white">
                                        <span className="flex-center gap-2">
                                            <SiImdb size={24}/>
                                            {DataMovie && DataMovie.length > 0 ? DataMovie[indexView].imdbid : 'No data available'}
                                        </span>
                                        <span className="flex-center gap-2">
                                            <MdOutlineSubtitles size={24}/>
                                            Subtitles
                                        </span>
                                        <div className=" flex-center text-orange-400">
                                            <RiStarSFill size={24}/>
                                            <h1 className="">{DataMovie && DataMovie.length > 0 ? DataMovie[indexView].rating : 'No data available'}</h1>
                                        </div>
                                </div>
        
                                <div className='flex gap-5'>
                                    <button className="flex-center gap-2 p-1 sm:p-1 lg:p-2 rounded-xl bg-primary1">
                                        <FaPlay size={22} className='text-white'/>
                                        <h1 className="text-[12px] sm:text-md font-medium text-white">Watch trailer</h1>
                                    </button >
                                    <button onClick={() => { setBookmark(DataMovie && DataMovie[indexView]._id) } } className="flex-center gap-2 bg-black p-1 sm:p-1 lg:p-2 border border-slate-400 rounded-md">
                                        <FaBookOpen size={24} className='text-white'/>
                                        <h1 className="text-[12px] sm:text-md font-medium text-white">Bookmark</h1>
        
                                    </button>
                                </div>
        
                            </div>
                        </div>
        
                        <div className="  transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-400  dark:bg-gray-900 opacity-25 z-20 ">
                        </div>  
                        
                    </div>
        
                ) }

            </div>

        )}

        <div className='flex justify-end p-2 w-full bg-gray-400 dark:bg-slate-900 h-full max-h-sm'>
            <button className='bg-white text- dark:bg-primary1 px-3 py-1 dark:text-white m-10'><h1>Buy Ticket</h1></button>
        </div>

        <SearchBar data={ initialDataMovie }  setMainView={setMainView}  />
       

        {/* <section  className="grid_item">
            {initialDataMovie && initialDataMovie.map((item: any, index) => (
                <div key={index} onClick={() => { setMainView(index)}} className="cursor-pointer relative flex flex-col justify-between rounded-lg  shadow-xl  p-2">

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
                            <div className="absolute top-0 left-0 flex justify-between items-center w-full">
                                <h1 className="text-sm text-white backdrop-blur-sm  bg-black/40  px-2 py-1 font-semibold mt-1 ml-1 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out rounded-2xl">
                                    { item.title }
                                </h1>


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
        </section> */}

    </div>
  )
}

export default MovieDashboard