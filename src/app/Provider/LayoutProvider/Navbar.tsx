import Link from "next/link"
import Image from "next/image"
import CustomButton from "@/component/CustomButton"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { setDarkMode, toggleDarkMode } from "@/lib/slice/moviedbSlice";
import { MdDarkMode, MdLightMode } from "@/component/icons";



const Navbar = () => {

  const dispatch = useAppDispatch();
  
  const darkMode = useAppSelector((state) => state.movie.stateTogle);

  // Fungsi untuk mengubah tema
  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

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

  // Menyinkronkan preferensi dark mode dengan localStorage saat aplikasi dimuat
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode !== darkMode) {
      dispatch(setDarkMode(savedDarkMode));
    }
  }, []);



  return (
    <header className="w-full fixed z-40 backdrop-blur-sm bg-white/10 ">
        <nav className="max-w-[1740px] mx-auto flex justify-between items-center sm:px-10 px-6 py-4">
            <Link href="/" className="flex justify-center items-center w-[4rem]  h-[4rem] sm:h-[5rem] sm:w-[20rem]">
                <Image src="/assets/logo/mainLogo.png" alt="logo mari belajar" width={400} height={100} className="object-contain  rounded-md"/>
            </Link>
    
            <div className="flex-center gap-4">
              
            <button onClick={handleToggle} className="p-2 rounded bg-slate-200 dark:bg-gray-700 text-gray-800 dark:text-white">
              {darkMode ?  
                <MdDarkMode  size={20} /> :
                <MdLightMode  size={20} /> 
            
              }
            </button>
              
            <Link href="/auth" className="">
              <CustomButton 
                  title="Sign in"
                  btnType="button"
                  containerStyles="text-white font-bold  px-6 py-3 "
              />
            </Link>
            </div>

        </nav>

    </header>
  )
}

export default Navbar