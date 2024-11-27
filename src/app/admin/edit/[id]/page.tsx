'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import Loading from '@/component/Loading';
import toast from 'react-hot-toast';


export default function EditMovie() {
  const { id } = useParams(); // Mendapatkan ID dari URL
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    rating: 0,
    genre: [],
    year: 2023,
    imdbid: '',
    imdb_link: '',
  });

  const [loading, setLoading] = useState(true); // Untuk loading state

  // Mendapatkan data film berdasarkan ID
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/api/movie/${id}`);
        setForm(response.data); // Mengisi form dengan data yang diterima
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await axios.put(`/api/movie/${id}`, form); // Memperbarui data melalui API
      router.push('/admin'); // Kembali ke halaman admin setelah update
      toast.success('Update Movie');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleGenreChange = (e:any) => {
    const genres = e.target.value.split(','); // Memisahkan genre berdasarkan koma
    setForm({ ...form, genre: genres });
  };

  if (loading) {
    return <Loading/>;
  }

  return (
    <div className="overflow-hidden">

      <section className="containOver  mb-[8rem]  padding-x padding-y max-width flex flex-col gap-8" id="edit-movie">
      
      <section className='h-[8rem] w-full bg-slate-500'>

      </section>

      <section className='flex justify-end items-center h-[4rem] bg-slate-500 m-4 rounded-md p-2 px-4'>
              <div className='bg-bir px-3 py-1 bg-blue-500 text-white '>
               Edit Movie
              </div>
      </section>
       
       
 
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Rating (0-10)"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Genre (comma separated)"
            value={form.genre.join(',')}
            onChange={handleGenreChange}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Year"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: parseInt(e.target.value, 10) })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="IMDb ID"
            value={form.imdbid}
            onChange={(e) => setForm({ ...form, imdbid: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="IMDb Link"
            value={form.imdb_link}
            onChange={(e) => setForm({ ...form, imdb_link: e.target.value })}
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Update Movie
          </button>
        </form>
      </section>
    </div>
  );
}
