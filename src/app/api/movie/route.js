import { connectToDatabase } from '@/config/mongoDb.client';
import MovieModel from '@/models/modelMovie';

export async function GET(req) {
  await connectToDatabase();
  const items = await MovieModel.find();
  return new Response(JSON.stringify(items), { status: 200 });
}

export async function POST(req) {
  await connectToDatabase();
  const data = await req.json();
  const newItem = await MovieModel.create(data);
  return new Response(JSON.stringify(newItem), { status: 201 });
}

export async function PUT(req) {
  await connectToDatabase();
  const { id, ...data } = await req.json();
  const updatedItem = await MovieModel.findByIdAndUpdate(id, data, { new: true });
  if (!updatedItem) return new Response('Item not found', { status: 404 });
  return new Response(JSON.stringify(updatedItem), { status: 200 });
}

export async function DELETE(req) {
  await connectToDatabase();
  const { id } = await req.json();
  const deletedItem = await MovieModel.findByIdAndDelete(id);
  if (!deletedItem) return new Response('Item not found', { status: 404 });
  return new Response('Item deleted successfully', { status: 200 });
}

