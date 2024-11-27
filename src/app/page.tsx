"use client"


import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { getDataMovieDB, setStateMovieData, toggleDarkMode } from "@/lib/slice/moviedbSlice";
import { MovieModels } from "@/models/modelsMovie";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from 'swr';
import MovieDashboard from "../component/MovieDahsboard";
import BookmarkModal from "@/constants/modalBookmark";
import Loading from "@/component/Loading";


export default function Home() {
  const dispatch = useAppDispatch();

  const { data: items, error } = useSWR('/api/movie', (url) => fetch(url).then((res) => res.json()));
  
  
  const darkMode = useAppSelector((state) => state.movie.stateTogle);

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
    if (items) {
      dispatch(setStateMovieData(items));
      console.log('fetch to redux:', items);
    } else {
      console.log('error fetch to redux:', items);
    }
  }, [dispatch, items]);


  if (error) return <p>Failed to load items</p>;
  if (!items) return <Loading/>

  console.log("fetch in api :", items );


  // const [DataMovie, setDataMovie] = useState<MovieModels[]>()
  // const DataMovieStore = useAppSelector((state) => state.movie.stateMovie);


  // Pastikan semua Hooks dipanggil sebelum logika render

  // useEffect(() => {
      
  //   if ( DataMovieStore ) {
  //     setDataMovie(DataMovieStore)
  //     console.log("fetch in redux :", DataMovieStore );
  //   } else {
  //     console.log("error fetch in redux :", DataMovieStore );
        
  //   }
  
  // }, [ DataMovieStore]);
  
  
  
  return (
    
    
    <main className='overflow-hidden font-sans bg-white  dark:bg-black'>
        

          <div className=" relative containOver  max-width flex flex-col gap-8 font-[family-name:var(--font-geist-sans)]">
          




            <MovieDashboard initialDataMovie={items}/>


  

        </div>
      </main>


  );
}
