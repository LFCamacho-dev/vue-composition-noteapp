import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'
import { useStoreAuth } from '@/stores/storeAuth'
import { db } from '@/js/firebase.js'
import { 
    collection, getDocs, onSnapshot, 
    doc, addDoc, deleteDoc, updateDoc, 
    query, orderBy, limit } from 'firebase/firestore'

let notesCollectionRef 
let notesCollectionQuery

let getNotesSnapshot = null

export const useStoreNotes = defineStore('StoreNotes', () => {
    
    /** Data */
    
    const notes = ref([])
    const notesLoaded = false

    
    /** Computed / Getters */
    
    const getNoteContent = computed(() => { 
        return (id) => {
            return notes.value.filter(note => note.id === id)[0].content
        }
    })

    const totalNotesCount = computed(() => {
        const numNotes = notes.value.length
        return numNotes
    })
    
    const totalNotesLength = computed(() => {
        let notesLength = 0
        notes.value.forEach(note => notesLength += note.content.length)
        return notesLength
    })
    

    /** Actions */    
    
    function init() {

        const storeAuth = useStoreAuth()

        notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
        notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))
        this.getNotes()
    }

    async function getNotes() {
        this.notesLoaded = false        

        getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
            let notes = []
            querySnapshot.forEach((doc) => {
                let note = {
                    id: doc.id,
                    content: doc.data().content,
                    date: doc.data().date
                }
                notes.push(note)
            })
            this.notes = notes
            this.notesLoaded = true
        }, error => {
            console.log('error.message: ', error.message);
        })
        
    }

    function clearNotes(){
        notes.value = []
        if(getNotesSnapshot) getNotesSnapshot()  // Unsubscribe from any active listener
    }

    async function addNote(newNote) {
        const currentDate = new Date().getTime()
        const date = currentDate.toString()

        await addDoc(notesCollectionRef, {
            date: date,
            content: newNote
        })
          
    }

    async function deleteNote(idToDelete){
        await deleteDoc(doc(notesCollectionRef, idToDelete))
    }

    async function updateNote(id, content){
        const contentRef = doc(notesCollectionRef, id);

        await updateDoc(contentRef, {
            content: content
        })
    }
  
    return { 
        notes,
        notesLoaded,
        getNotes,
        init,
        addNote, 
        deleteNote, 
        updateNote, 
        clearNotes,
        getNoteContent, 
        totalNotesCount,
        totalNotesLength,
    }
})

/** ENABLE HOT RELOAD */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreNotes, import.meta.hot))
  }
  