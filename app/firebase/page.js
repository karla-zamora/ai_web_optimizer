'use client'
import { useAuth } from '@clerk/nextjs'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { doc, getDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

  
// Connect to your Firebase app
const app = initializeApp(firebaseConfig)
// Connect to your Firestore database
const db = getFirestore(app)
// Connect to Firebase auth
const auth = getAuth(app)

// Remove this if you do not have Firestore set up
// for your Firebase app
const getFirestoreData = async () => {
  // EXAMPLE DOCUMENT FOR DEV TESTING 
  const docRef = doc(db, 'user', 'k199sf6wHfjlfOgbufdY')
  const docSnap = await getDoc(docRef)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in.
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data())
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!')
      }
    } else {
      // No user is signed in.
      return (
        <p>Sign in to view document data.</p>
      )
    }
  });
}

// These functions can generally be refactored for use outside of the Firebase page 
export default function FirebaseUI() {
  const { getToken, userId } = useAuth()

  // Handle if the user is not signed in
  // You could display content, or redirect them to a sign-in page
  if (!userId) {
    return <p>You need to sign in with Clerk to access this page.</p>
  }

  const signIntoFirebaseWithClerk = async () => {
    const token = await getToken({ template: 'integration_firebase' })

    const userCredentials = await signInWithCustomToken(auth, token || '')
    // The userCredentials.user object can call the methods of
    // the Firebase platform as an authenticated user.
    console.log('User:', userCredentials.user)
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
      <button onClick={signIntoFirebaseWithClerk}>Sign in</button>

      {/* Remove this button if you do not have Firestore set up */}
      <button onClick={getFirestoreData}>Get document</button>
    </main>
  )
}

export { db, app, auth }; 