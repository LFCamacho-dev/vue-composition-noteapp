<script setup>

/** Imports */
    import { reactive, computed } from 'vue'
    import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue'
    import { useDateFormat } from '@vueuse/core'



/** Props */
    const props = defineProps({
        note: {
            type: Object,
            required: true
        }
    })
/** Computed Date Format */
    const dateFormatted = computed(() => {
        let date = new Date(parseInt(props.note.date))
        let formattedDate = useDateFormat(date, 'MM-DD-YY,  hh:mm aa')
        return formattedDate.value
    })

/** Computed Character Length */
    const characterLength = computed(() => {
        const length = props.note.content.length
        let description = length > 1 ? 'characters' : 'character'
        return `${length} ${description}`
    })

/** Modals */
    const modals = reactive({
        deleteNote: false
    })

</script>


<template>
    <div class="card mb-4">
        <div class="card-content">
            <div class="content">
                {{ note.content }}
                <div class="columns is-mobile has-text-grey-light mt-2">
                    <small class="column">Date: {{ dateFormatted }}</small>
                    <small class="column has-text-right">{{ characterLength }}</small>
                </div>          
            </div>
        </div>
        <footer class="card-footer">
            <RouterLink
              :to="`/editNote/${ note.id }`"              
              class="card-footer-item">Edit</RouterLink>

            <a
              @click.prevent="(modals.deleteNote = true)"
              class="card-footer-item">Delete</a>
        </footer>
        <ModalDeleteNote
          v-if="modals.deleteNote"
          v-model="modals.deleteNote"
          :id="note.id"
          />
    </div>
</template>

