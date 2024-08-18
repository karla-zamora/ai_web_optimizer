import { db } from '@/firebase'
import { collection, getDocs, query, addDoc, deleteDoc, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { NextResponse } from 'next/server';

const collectionName = "user";


// create new user with user data
export async function POST(req) {
  const { user_id, user_data } = await req.json()

  if (!user_id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  if (Object.keys(user_data).length <= 0) {
    return NextResponse.json({ error: 'User Data is required' }, { status: 400 });
  }

  const result = await createUser(user_id, user_data)
  return result
}

// get user data by user id
export async function GET(req) {
  const url = new URL(req.url)
  const user_id = url.searchParams.get('user_id')

  if (!user_id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  return await getUser(user_id)
}

// update data by user id
export async function PUT(req) {
  const { user_id, user_data } = await req.json()

  if (!user_id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  if (Object.keys(user_data).length <= 0) {
    return NextResponse.json({ error: 'User Data is required' }, { status: 400 });
  }

  const result = await updateUser(user_id, user_data)
  return result
}

// delete user by user id
export async function DELETE(req) {
  const { user_id } = await req.json()

  if (!user_id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  return await deleteUser(user_id)
}


// Helper: create new user
export const createUser = async (user_id, user_data) => {
  try {
    await setDoc(doc(db, collectionName, user_id), user_data);
    return NextResponse.json({ user_id });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create new user.' }, { status: 500 });
  }
};

// Helper: get user data by user id
export const getUser = async (user_id) => {
  try {
    const userRef = doc(db, collectionName, user_id);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return NextResponse.json({ id: userDoc.id, ...userData });
    } else {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Helper: update user data
export const updateUser = async (user_id, user_data) => {
  try {
    const userRef = doc(db, collectionName, user_id);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      await setDoc(userRef, user_data, { merge: true });
      return NextResponse.json({status: 'success'});
    } else {
      return NextResponse.json({error: 'No such document!'}, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Helper: delete user by user id
export const deleteUser = async (user_id) => {
  try {
    const docRef = doc(db, collectionName, user_id);
    await deleteDoc(docRef);
    return NextResponse.json({ message: 'User deleted!' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}