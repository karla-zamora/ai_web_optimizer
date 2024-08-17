import { db } from '@/firebase'
import { collection, getDocs, query, deleteDoc, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { NextResponse } from 'next/server';

const collectionName = 'project'


// Create project
export async function PUT(req) {
  const data = await req.json();
  createProject(data);
}

// Get project
export async function GET(req) {
  const proj_id = req.text();
  getProject(proj_id);
}

// Update project
export async function PATCH(req) {
  const data = await req.json();
  updateData(data);
}

// Delete project
export async function DELETE(req) {
  const proj_id = req.text();
  deleteProject(proj_id);
}

// Helper: Create new project
const createProject = async (data) => {
  try {
    const docRef = await collection(db, collectionName).add(data);
    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    return NextResponse.error(error);
  }
}

// Helper: Get Project
const getProject = async (proj_id) => {
  try {
    const projRef = doc(db, collectionName, proj_id);
    const projDoc = await getDoc(projRef);
    if (projDoc.exists()) return NextResponse.json(projDoc);
    return NextResponse.json('Project doesn\'t exist!');
  } catch (error) {
    return NextResponse.error(error);
  }
}

// Helper: Update Project
const updateData = async (data) => {
  try {
    const projRef = doc(db, collectionName, data.id);
    const projDoc = await getDoc(projRef);
    if (!projDoc.exists()) return NextResponse.json('Project doesn\'t exist!');
    await updateDoc(projRef, data);
    return NextResponse.json('Project has been updated.');
  } catch (error) {
    return NextResponse.error(error);
  }
}

// Helper: Delete Project
const deleteProject = async (proj_id) => {
  try {
    const projRef = doc(db, collectionName, proj_id);
    const projDoc = await getDoc(projRef);
    if (!projDoc.exists()) return NextResponse.json('Project doesn\'t exist!');
    await deleteDoc(projRef);
    return NextResponse.json('Project deleted!');
  } catch (error) {
    return NextResponse.error(error);
  }
}