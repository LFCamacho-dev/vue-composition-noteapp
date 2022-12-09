import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, computed } from 'vue'

export const useStoreNotes = defineStore('StoreNotes', () => {
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
   
    // const doubleCount = computed(() => count.value * 2)

    function addNote(newNote) {
        const currentDate = new Date().getTime()
        const id = currentDate.toString()
        const note = {
            id,
            content: newNote,
        }
        this.notes.unshift(note)
        console.log('agregado', note);
    }

    function deleteNote(idToDelete){
        this.notes = this.notes.filter(note => note.id !== idToDelete)
    }

    function editNote(idToEdit){
        console.log('editing', idToEdit);
    }
  
    return { notes, addNote, deleteNote, editNote }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStoreNotes, import.meta.hot))
  }
  