import { db } from '@/firebase'
import { collection, addDoc, getDocs, query, deleteDoc, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { NextResponse } from 'next/server';

const collectionName = 'project'


// Create project
export async function POST(req) {
  const { title } = await req.json();

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  const result = await createProject(title);
  return result
}

// Get project
export async function GET(req) {
  const url = new URL(req.url)
  const proj_id = url.searchParams.get('proj_id');

  if (!proj_id) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
  }

  const result = await getProject(proj_id);
  return result
}

// Update project
export async function PUT(req) {
  const { proj_id, data } = await req.json();

  if (!proj_id) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
  }

  if (!data) {
    return NextResponse.json({ error: 'Data is required' }, { status: 400 });
  }

  const result = await updateData(proj_id, data);
  return result
}

// Delete project
export async function DELETE(req) {
  const proj_id = await req.text();

  if (!proj_id) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
  }

  console.log(proj_id)
  const result = await deleteProject(proj_id);
  return result
}


// Helper: Create new project
export const createProject = async (title) => {
  try {
    const projRef = await addDoc(collection(db, collectionName), { title });
    const projDoc = await getDoc(projRef);
    if (projDoc.exists()) return NextResponse.json({ title })
    throw new Error('Something went wrong when creating a new project.');
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// Helper: Get Project
export const getProject = async (proj_id) => {

  try {
    const projRef = doc(db, collectionName, proj_id);
    const projDoc = await getDoc(projRef);
    const data = projDoc.data();
    if (projDoc.exists()) return NextResponse.json(data);
    return NextResponse.json('Project doesn\'t exist!');
  } catch (error) {
    return NextResponse.error(error);
  }
}

// Helper: Update Project
export const updateData = async (proj_id, data) => {
  try {
    const projRef = doc(db, collectionName, proj_id);
    const projDoc = await getDoc(projRef);
    if (!projDoc.exists()) return NextResponse.json('Project doesn\'t exist!');
    await setDoc(projRef, data, { merge: true });
    return NextResponse.json({status:'success'});
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Helper: Delete Project
export const deleteProject = async (proj_id) => {
  try {
    const projRef = doc(db, collectionName, proj_id);
    await deleteDoc(projRef);
    return NextResponse.json({ message: 'Project deleted!' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}