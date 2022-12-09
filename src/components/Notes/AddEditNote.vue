<script setup>
    import { ref } from 'vue'

    
/** Props */
    const props = defineProps({
        modelValue: {
            type: String,
            required: true
        } 
    })
    
/** Emits */
    const emit = defineEmits(['update:modelValue'])
    
/** Focus Textarea */
    const textareaRef = ref(null)

    const focusTextarea = () => {
        textareaRef.value.focus()
    }

    defineExpose({
        focusTextarea
    })


</script>


<template>
    <div class="card has-background-success-dark mb-4">
        <div class="card-content">
            <div class="field">
                <div class="control">
                    <textarea
                        :value="props.modelValue"
                        @input="$emit('update:modelValue', $event.target.value)"
                        class="textarea"
                        ref="textareaRef"
                        placeholder="Add a new note..." 
                    />
                </div>
            </div>

            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <slot name="buttons" />
                </div>
            </div>
        </div>  
    </div> 
</template>