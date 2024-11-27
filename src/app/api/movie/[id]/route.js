import { connectToDatabase } from '@/config/mongoDb.client';
import MovieModel from '@/models/modelMovie';

export async function GET(req, { params }) {
  await connectToDatabase();
  
  const { id } = params; // Mendapatkan ID dari URL
  const movie = await MovieModel.findOne({_id: id});
  if (!movie) {
    return new Response(JSON.stringify({ error: 'Movie not found' }), { status: 402 });
  }
  return new Response(JSON.stringify(movie), { status: 200 });
}


export async function PUT(req, { params }) {
  await connectToDatabase();

  const { id } = params; // Mendapatkan ID dari URL
  const data = await req.json(); // Mendapatkan data yang dikirim dalam body request

  const updatedMovie = await MovieModel.findByIdAndUpdate({_id : id }, data, { new: true });
  if (!updatedMovie) {
    return new Response(JSON.stringify({ error: 'Movie not found' }), { status: 404 });
  }

  return new Response(JSON.stringify(updatedMovie), { status: 200 });
}

export async function DELETE(req, { params }) {
  await connectToDatabase();

  const { id } = params; // Mendapatkan ID dari URL
  const deletedMovie = await MovieModel.findByIdAndDelete({_id : id}); // Menghapus data berdasarkan ID
  if (!deletedMovie) {
    return new Response(JSON.stringify({ error: 'Movie not found' }), { status: 404 });
  }

  return new Response(
    JSON.stringify({ message: 'Movie deleted successfully', deletedMovie }),
    { status: 200 }
  );
}