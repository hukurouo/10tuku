import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};  
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  firebase.firestore().enablePersistence()
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp

