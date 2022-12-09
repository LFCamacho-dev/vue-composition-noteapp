<script setup>
/** Imports */
    import { ref } from 'vue'
    import { useStoreNotes } from '@/stores/StoreNotes.js'
    // import { vAutofocus } from '@/directives/vAutofocus';

/** Store */
    const storeNotes = useStoreNotes()

/** Stats */
    const numNotes = ref(storeNotes.totalNotesCount)
    const notesLength = ref(storeNotes.totalNotesLength)

</script>


<template>
    <div class="stats">
        <table class="table is-fullwidth">
        <thead>
            <tr>
                <th>Stat</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
        <tr>
            <td>Number of Notes</td>
            <td>{{ numNotes }}</td>
        </tr>
        <tr>
            <td>Number of Characters (of all notes)</td>
            <td>{{ notesLength }}</td>
        </tr>
        </tbody>
        </table>

       <!-- <input
          class="input"
          type="text"
          placeholder="hi"
          v-autofocus
        > -->
    </div>
</template>


<style coped>

</style>