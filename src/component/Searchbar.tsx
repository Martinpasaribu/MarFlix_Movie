import { MovieModels } from '@/models/modelsMovie';
import React, { useState, useEffect } from 'react';
import { CiSearch, RiStarSFill, TbMovie } from './icons';
import Image from 'next/image';

interface MovieListProps {
  data: MovieModels[];
  setMainView : (index:any) => void;
}

const SearchBar  = ({ data, setMainView } : MovieListProps) => {
  // State untuk menyimpan data yang ditampilkan setelah sort, filter, dan search
  const [movies, setMovies] = useState<MovieModels[]>(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(5);

  // Menghitung jumlah halaman berdasarkan jumlah data dan jumlah data per halaman
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Fungsi untuk melakukan pencarian pada judul atau deskripsi film
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Fungsi untuk filter berdasarkan genre
  const handleGenreFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  // Fungsi untuk mengubah pengurutan (sort)
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = e.target.value.split('_');
    setSortBy(field);
    setSortOrder(order as 'asc' | 'desc');
  };

  // Filter, Sort dan Search Movies
  useEffect(() => {
    let filteredMovies = [...data];

    // Filter berdasarkan genre
    if (selectedGenre) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.genre.includes(selectedGenre)
      );
    }

    // Filter berdasarkan search query (judul dan deskripsi)
    if (searchQuery) {
      filteredMovies = filteredMovies.filter(
        movie =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort berdasarkan pilihan
    filteredMovies = filteredMovies.sort((a, b) => {
      const valueA = a[sortBy as keyof MovieModels];
      const valueB = b[sortBy as keyof MovieModels];

      if (sortOrder === 'asc') {
        if (valueA > valueB) return 1;
        if (valueA < valueB) return -1;
        return 0;
      } else {
        if (valueA < valueB) return 1;
        if (valueA > valueB) return -1;
        return 0;
      }
    });

    setMovies(filteredMovies);
    setCurrentPage(1); // Reset halaman setelah melakukan filter atau sort
  }, [searchQuery, selectedGenre, sortBy, sortOrder, data]);

  return (
    <div className='space-y-10 px-10 pt-10'>

        <div className='flex flex-col gap-1 '>

            <div className='flex flex-wrap sm:flex-row justify-end items-center mt-10 gap-4 w-full'>
        
                {/* Filter Genre */}
                <select
                    value={selectedGenre}
                    onChange={handleGenreFilter}
                    className="p-2  rounded mb-4 dark:bg-transparent dark:text-white"
                >
                    <option value="" className='dark:bg-black'>All Genres</option>
                    {/* Option for genres, bisa diambil dari data atau daftar genre statis */}
                    {['Action', 'Comedy', 'Drama'].map((genre) => (
                    <option key={genre} value={genre} className='dark:bg-black'>
                        {genre}
                    </option>
                    ))}
                </select>

                {/* Sort */}
                <select
                    value={`${sortBy}_${sortOrder}`}
                    onChange={handleSort}
                    className="p-2  rounded mb-4 dark:bg-transparent dark:text-white"
                >
                    <option className='dark:bg-black' value="title_asc">Title (A-Z)</option>
                    <option className='dark:bg-black' value="title_desc">Title (Z-A)</option>
                    <option className='dark:bg-black' value="rating_asc">Rating (Low to High)</option>
                    <option className='dark:bg-black' value="rating_desc">Rating (High to Low)</option>
                    <option className='dark:bg-black' value="year_asc">Year (Oldest to Newest)</option>
                    <option className='dark:bg-black' value="year_desc">Year (Newest to Oldest)</option>
                </select>

                {/* Search */}
                    
                <div className='flex justify-center '>
                    <input
                        type="text"
                        placeholder="Search by title or description"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="p-2  rounded mb-4 dark:bg-transparent dark:placeholder-white dark:text-white"
                    />
                    <CiSearch size={24} className='m-2'/>
                </div>

            </div>

            <hr className="h-0 border-b border-solid dark:border-gray-300 " />

        </div>   
      
      {/* Movie List */}
      <div className="grid_item">
        {currentMovies.map((movie , index) => (
                <div key={index} onClick={() => { setMainView(movie._id)}} className="cursor-pointer relative flex flex-col justify-between rounded-lg  shadow-xl   p-2">

                <div className="rounded overflow-hidden flex flex-col">
                
                    <div className="relative ">
                    {movie?.image? (
                        <Image
                        className="h-[18rem] w-full rounded-xl object-cover"
                        width={400}
                        height={400}
                        src={movie.image}
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
                                { movie.title }
                            </h1>


                        </div>
                    </div>



                
                </div>
                
                <div className="px-6 py-3 flex flex-col items-start justify-start rounded-md gap-4 ">
                    
                    <div className="w-full text-sm font-regular flex justify-between flex-row gap-2 dark:text-white">
                        <span className="flex-center gap-2">
                            <TbMovie size={24} /> {movie.year} ago
                        </span>
                        <div className="flex-center text-orange-400">
                            <RiStarSFill size={24}/>
                            <h1 className="">{movie.rating}</h1>
                        </div>
                    </div>

                    <div className="flex flex-row flex-wrap gap-2 text-sm dark:text-white">
                        {Array.isArray(movie.genre) && movie.genre.map((gen: any, index: any) => (
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
      </div>

      {/* Pagination */}
      <div className="pagination dark:text-white pb-10">
        {Array.from({ length: Math.ceil(movies.length / moviesPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className="p-2 m-1 border rounded"
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBar;
