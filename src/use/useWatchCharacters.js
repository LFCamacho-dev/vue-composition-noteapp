import { watch } from 'vue'

export function useWatchCharacters(valueToWatch, maxChars = 300) {
    watch(valueToWatch, (newValue) => {
        if (newValue.length === maxChars) {
            alert(`Only ${maxChars} characters allowed`)
            // console.log(newValue);
        }
    })
}