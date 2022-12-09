<script setup>

</script>

<template>
    <div class="edit-note">
        <AddEditNote
        v-model="newNote"
        ref="addEditNoteRef"
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
        
    </div>
</template>