import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'

export const useStoreNotes = defineStore('StoreNotes', () => {

/** Data */

    const notes = ref([
        {
            id: 'id1',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, minima eveniet dolorem quaerat in incidunt odit commodi voluptatibus, sequi voluptate quidem at omnis perspiciatis molestiae qui nobis eius excepturi!!!',
        },
        {
            id: 'id2',
            content: 'This is a shorter note',
        }
    ])

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

    function addNote(newNote) {
        const currentDate = new Date().getTime()
        const id = currentDate.toString()
        const note = {
            id,
            content: newNote,
        }
        this.notes.unshift(note)
    }

    function deleteNote(idToDelete){
        this.notes = this.notes.filter(note => note.id !== idToDelete)
    }

    function updateNote(id, content){
        const index = this.notes.findIndex(note => note.id === id)
        this.notes[index].content = content
    }
  
    return { 
        notes, 
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
  