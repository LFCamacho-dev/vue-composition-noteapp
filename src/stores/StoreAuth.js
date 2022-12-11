import { defineStore } from 'pinia'
import { auth } from '@/js/firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { ref } from 'vue'
import { useStoreNotes } from '@/stores/StoreNotes'



export const useStoreAuth = defineStore('StoreAuth', () => {

/** Data -- State */

    const user = ref({})


/** Computed -- Getters */


/** Actions */

    function init(){

        const storeNotes = useStoreNotes()

        onAuthStateChanged(auth, (usr) => {
            if (usr) { 
                user.value.email = usr.email
                user.value.id = usr.uid
                this.router.replace('/')
                storeNotes.init()
            } else {
                user.value = {}                
                this.router.replace('/auth')
                storeNotes.clearNotes()
            }
          })
    }

    const registerUser = (credentials) => {
        createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredentials) => {
            const _user = userCredentials.user
        })
        .then()
        .catch((error) => {
            console.log('error.message', error.message)            
        })
    }

    const loginUser = (credentials) => {
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
            const _user = userCredential.user
            // console.log('User:', _user)
        })
        .catch((error) => {
            console.log('error.message', error.message)
        })
    }

    function logoutUser(){
        signOut(auth)
        .then(() => {
            // console.log('User Successfuly Logged out:', logoutUser);
            // this.router.replace('/auth')
      })
        .catch((error) => {
            console.log('error.message', error.message)
      })

    }
  
    return { user, init, registerUser, loginUser, logoutUser }
})