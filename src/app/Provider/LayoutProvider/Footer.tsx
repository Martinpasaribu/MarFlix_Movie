
import { footerLinks } from "@/constants"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react";



const Footer = () => {


  
    const darkMode = useAppSelector((state) => state.movie.stateTogle);

    
    useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('darkMode', 'true');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('darkMode', 'false');
        }
      }, [darkMode]);


  return (
    <footer className="flex flex-col text-black-100  border-gray-100 bg-gray-400 dark:bg-slate-900 pt-10">

        <div  className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
            <div className="flex flex-col justify-start items-start gap-6">
                <Image src="/assets/logo/mainLogo.png" alt="logo" width={408} height={200} className="object-contain w-[4rem] sm:h-[6rem] sm:w-[15rem] h-[30rem]" />
                <p className="text-base text-gray-700 dark:text-white">
                    Martec 2023 <br />
                    All right reserverd &copy;
                </p>
            </div>

            <div className="footer__links dark:text-white">
                {footerLinks.map((item) => (
                <div key={item.title} className="footer__link">
                    <h3 className="font-bold">{item.title}</h3>
                    <div className="flex flex-col gap-5">
                    {item.links.map((link) => (
                        <Link
                        key={link.title}
                        href={link.url}
                        className="text-gray-500"
                        >
                        {link.title}
                        </Link>
                    ))}
                    </div>
                </div>
                ))}
            </div>
        </div>

        <div className='flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10 dark:text-white'>
            <p>@2023 Martec. All rights reserved</p>

            <div className="footer__copyrights-link">
                <Link href="/" className="text-gray-500">
                Privacy & Policy
                </Link>
                <Link href="/" className="text-gray-500">
                Terms & Condition
                </Link>
            </div>
        </div>

        
    </footer>
  )
}

export default Footer