'use client'

import { NextResponse } from 'next/server'
import { collection, getDocs, query, deleteDoc, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/page.js'

const collectionName = 'user'


// create new user
export const createUser = async (user_data) => {
  try {
    const docRef = await db.collection(collectionName).add(user_data);
    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    return NextResponse.error(error);
  }
};

// update user data
export const updateUser = async ({ user_id, user_data }) => {
  try {
    const userRef = doc(db, collectionName, user_id);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      await setDoc(userRef, user_data, { merge: true });
      return NextResponse.json(user_data);
    } else {
      return NextResponse.error('No such document!');
    }
  } catch (error) {
    return NextResponse.error(error);
  }
}

// get user data by user id
export const getUser = async (user_id) => {
  try {
    const userRef = doc(db, collectionName, user_id);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return NextResponse.json({ id: userDoc.id, ...userData });
    } else {
      return NextResponse.error('No such document!');
    }
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}

// delete user by user id
export const deleteUser = async (user_id) => {
  try {
    const docRef = doc(db, collectionName, user_id);
    await deleteDoc(docRef);
    console.log('User deleted!');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}