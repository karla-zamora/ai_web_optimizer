'use client'

import { collection, getDocs, query, deleteDoc, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'

const collectionName = 'project'


// Create new project
const createProject = async (data) => {
  try {
    const docRef = await collection(db, collectionName).add(data);
    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    return NextResponse.error(error);
  }
}

// Get Project
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

// Update Project
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

// Delete Project
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