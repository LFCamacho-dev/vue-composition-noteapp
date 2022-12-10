import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'
import { db } from '@/js/firebase.js'
import { 
    collection, getDocs, onSnapshot, 
    doc, addDoc, deleteDoc, updateDoc, 
    query, orderBy, limit } from 'firebase/firestore'

const notesCollectionRef = collection(db, 'notes')
const notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))

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

    async function getNotes() {
        this.notesLoaded = false
        onSnapshot(notesCollectionQuery, (querySnapshot) => {
            console.log(querySnapshot);
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
        })
    }

    async function addNote(newNote) {
        const currentDate = new Date().getTime()
        const date = currentDate.toString()

        await addDoc(notesCollectionRef, {
            date: date,
            content: newNote
        });
          
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
        addNote, 
        deleteNote, 
        updateNote, 
        getNoteContent, 
        totalNotesCount,
        totalNotesLength
    }
})

/** ENABLE HOT RELOAD */
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreNotes, import.meta.hot))
  }
  