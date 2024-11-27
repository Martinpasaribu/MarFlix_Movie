'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

function isValidUrl(url:any) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}


export default function CreateItem() {
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
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await axios.post('/api/movie', form); // Pastikan endpoint API sesuai
      toast.success('Movie has Created');
      router.push('/admin'); // Redirect ke halaman admin setelah berhasil
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };
  const handleInputChange = (e:any) => {
    const { value } = e.target;

    // Validasi URL saat pengguna mengetik
    if (isValidUrl(value) || value === '') {
      setForm({ ...form, image: value });
      setError(''); // Reset error jika valid
    } else {
      setError('Invalid URL'); // Set error jika tidak valid
    }
  };


  const handleGenreChange = (e : any) => {
    const genres = e.target.value.split(','); // Pisahkan genre berdasarkan koma
    setForm({ ...form, genre: genres });
  };

  

  return (
    <div className="overflow-hidden">
      
      <section className="containOver mb-[8rem]  padding-x padding-y max-width flex flex-col gap-8" id="discover">
      
      
      <section className='h-[8rem] w-full bg-slate-500'>

      </section>

      <section className='flex justify-end items-center h-[4rem] bg-slate-500 m-4 rounded-md p-2 px-4'>
              <div className='bg-bir px-3 py-1 bg-blue-500 text-white '>
              Create Movie
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
          <div>
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={handleInputChange}
            className={`p-2 border rounded ${error ? 'border-red-500' : ''}`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
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
            Create Movie
          </button>
        </form>
      </section>
    </div>
  );
}
