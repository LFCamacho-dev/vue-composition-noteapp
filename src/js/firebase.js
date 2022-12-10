import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAJ7BZHyPGgWSPQarp6Xh0k1yyZSe3v5Ho',
  authDomain: 'vuenoteapp-1b370.firebaseapp.com',
  projectId: 'vuenoteapp-1b370',
  storageBucket: 'vuenoteapp-1b370.appspot.com',
  messagingSenderId: '107113100534',
  appId: '1:107113100534:web:8613517f81b3c0086d68d7'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }