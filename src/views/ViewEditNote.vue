<script setup>

/** Imports */
    import { ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import AddEditNote from '@/components/Notes/AddEditNote.vue';
    import { useStoreNotes } from '@/stores/StoreNotes.js'

/** Router */
    const route = useRoute()
    const router = useRouter()

/** Store */
    const storeNotes = useStoreNotes()

/** Notes */
    const noteContent = ref('')
    noteContent.value = storeNotes.getNoteContent(route.params.id)

    /** Save Clicked */
    const handleSaveClicked = () => {
        storeNotes.updateNote(route.params.id, noteContent.value)
        router.push('/')
    }

</script>

<template>
    
    <div class="edit-note">
        <AddEditNote
        v-model="noteContent"
        ref="addEditNoteRef"
        bgColor="info"
        placeholder="Edit."
        label="Edit Note"
    >    
        <template #buttons>
            <button
                @click="$router.back()"
                class="button is-link is-light mr-2"
            >
                Cancel
            </button>
            <button
            @click="handleSaveClicked"
                class="button is-link has-background-info"
                :disabled="!noteContent.length"
            >
                Save Note
            </button>
        </template>
    </AddEditNote>        
    </div>

</template>