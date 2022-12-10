<script setup>

/** Imports */
    import { ref, computed, reactive } from 'vue'
    import { useStoreAuth } from '@/stores/StoreAuth.js'

/** Store */
    const storeAuth = useStoreAuth()



    const register = ref(false)
    const formTitle = computed(() => register.value ? 'Register' : 'Login')

/** Credentials */
    const credentials = reactive({
        email: '',
        password: ''
    })




/** Submit */
    const onSubmit = () => {
        if(!credentials.email || !credentials.password) {
            alert('Please enter an email and password')
        } else {
            if(register.value){
                storeAuth.registerUser(credentials)
            } else {
                storeAuth.loginUser(credentials)
            }
        }

    }




</script>

<template>
    <div class="auth">
    <!-- Tab control -->
        <div class="tabs is-centered">
            <ul>
                <li
                  :class="{'is-active': !register }"
                >
                <a @click.prevent="register = false">Login</a>
                </li>
                <li
                  :class="{ 'is-active': register }"
                >
                <a @click.prevent="register = true">Register</a>
                </li>
                
            </ul>
        </div>

    <!-- Tab contents / Cards -->
        <div class="card auth-form">
            <div class="card-content">
                <div class="title has-text-centered">
                {{ formTitle }}
                </div>

                <form @submit.prevent="onSubmit">
                
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input
                              class="input"
                              v-model="credentials.email"
                              type="email"
                              placeholder="e.g. alexsmith@gmail.com">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input
                              class="input"
                              v-model="credentials.password"
                              type="password"
                              placeholder="Enter a password">
                        </div>
                    </div>

                    <div class="field is-grouped is-grouped-right">
                        <p class="control">
                            <button class="button is-primary">
                            {{ formTitle }}
                            </button>
                        </p>                    
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<style scoped>
    .auth-form {
        max-width: 400px;
        margin: 0 auto;
    }

</style>
