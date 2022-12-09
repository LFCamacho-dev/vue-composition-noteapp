<script setup>
    import { ref } from 'vue'

    
/** Props */
    const props = defineProps({
        modelValue: {
            type: String,
            required: true
        },
        bgColor: {
            type: String,
            default: 'success'
        },
        placeholder: {
            type: String,
            default: 'Type something...'
        },
        label: {
            type: String
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
    <div
      class="card mb-5"
      :class="`has-background-${ bgColor }-dark`">
        <div class="card-content">
            
            <label v-if="label" class="label has-text-white ">{{props.label }}</label>

            <div class="field">
                <div class="control">
                    <textarea
                        :value="props.modelValue"
                        @input="$emit('update:modelValue', $event.target.value)"
                        class="textarea"
                        ref="textareaRef"
                        :placeholder="placeholder" 
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