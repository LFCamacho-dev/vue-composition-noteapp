<script setup>

/** Imports */
    import { ref, onMounted, onUnmounted } from 'vue'
    import { onClickOutside } from '@vueuse/core'
    import { useStoreNotes } from '@/stores/StoreNotes.js'

/** Store */
    const storeNotes = useStoreNotes()

/** Props */
    const props = defineProps({
        modelValue: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
            required: true
        }
    })

/** Close Modal */
    const closeModal = () => { 
        emit('update:modelValue', false)
    }

/** Emits */
    const emit = defineEmits([
        'update:modelValue'
    ])

/** Click outside to close */
    const modalCardRef = ref(null)
    onClickOutside(modalCardRef, () => {
        closeModal()
    })

/** Keyboard Control */
    const handleKeyboard = e => {
        if (e.key === 'Escape') closeModal()
    }

    onMounted(() => {
        document.addEventListener('keyup', handleKeyboard)
    })
    onUnmounted(() => {
        document.removeEventListener('keyup', handleKeyboard)
    })


</script>



<template>
    <div class="modal is-active p-4">
        <div class="modal-background"></div>
        <div
          class="modal-card"
          ref="modalCardRef">
            <header class="modal-card-head">
                <p class="modal-card-title">Delete Note?</p>
                <button
                  @click="closeModal"
                  class="delete"
                  aria-label="close">
                </button>
            </header>
            <section class="modal-card-body">
               <p> Are you sure you want to <strong>DELETE</strong> this note?</p>
            </section>
            <footer class="modal-card-foot is-justify-content-flex-end">
                <button
                  @click="closeModal"
                  class="button">
                Cancel
                </button>
                <button
                  @click="storeNotes.deleteNote(id)"
                  class="button is-danger">
                Delete
                </button>
            </footer>
        </div>
    </div>
</template>