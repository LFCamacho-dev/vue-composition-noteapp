<script setup>

/** Imports */

    import { ref } from 'vue'
    import Note from '@/components/Notes/Note.vue'
    import AddEditNote from '@/components/Notes/AddEditNote.vue'
    import { useStoreNotes } from '@/stores/StoreNotes.js'


/** Store */
    const storeNotes = useStoreNotes()

/** Imports */




/** Notes */    
    const newNote = ref('')
    const addEditNoteRef = ref(null)
    // const notes = storeNotes.notes

    const addNote = () => {
        storeNotes.addNote(newNote.value)
        // notes.value = [note, ...notes.value]
        newNote.value = ''
        addEditNoteRef.value.focusTextarea()
        // console.log('from addeditnote component');
    }
    
    


</script>


<template>

<div class="notes">

<!-- Form -->

    <AddEditNote
        v-model="newNote"
        ref="addEditNoteRef"
        placeholder="Add a new note..."
        
    >    
        <template #buttons>
            <button            
                @click="addNote"
                :disabled="!newNote"
                class="button is-link has-background-success"
            >
                Add New Note
            </button>
        </template>
    </AddEditNote>


<!-- Card -->

    <div v-if="storeNotes.notes.length">
        <Note
        v-for="note in storeNotes.notes"
        :key="note.id"
        :note="note" 
        />
    </div>

    <div v-else>
        <p class="is-size-5 has-text-centered mt-6">You don't have any notes :)</p>
    </div>
    
</div>

</template>

