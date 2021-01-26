<template>
    <div class="flex flex-row justify-center">
        <span v-if="!!error" class="color-red-500 mr-2">{{ error }}</span>
        <template v-if="!!user">
            <span class="font-semibold mr-2">{{ user.name }}</span>

            <svg class="cursor-pointer" title="Log out" @click="logout" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
        </template>
        <template v-else>
            <input type="text" placeholder="Username" v-model="name" class="mr-1 rounded-full border-teal-800 focus:border-teal-200" />
            <input type="password" placeholder="Password" v-model="password" class="mr-1 rounded-full border-teal-800 focus:border-teal-200" />

            <svg
                v-if="!!register"
                class="mr-1 cursor-pointer"
                title="Log in"
                @click="login"

                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>

            <svg
                v-else
                class="cursor-pointer"
                title="Register"
                @click="register"

                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>

            <div class="text-xs">
                <input type="checkbox" id="register-checkbox" v-model="register" />
                <label for="register-checkbox">Register new user</label>
            </div>

        </template>
    </div>
</template>

<script>
    import axios from 'axios'
    import {mapState, mapActions} from 'vuex';

    export default {
        name: "auth",
        data() {
            return {
                register: false,
                name: '',
                password: '',
                error: null,
            }
        },
        computed: {
            ...mapState({
                user: state => statue.user
            })
        },
        methods: {
            ...mapActions([
                'registerUser',
                'logoutUser',
                'loginUser'
            ]),
            register () {
                this.registerUser({
                    name: this.name,
                    password: this.password,
                })
                    .catch(error => this.error = error.message)
            },
            logout () {
                this.logoutUser()
                    .then(() => {
                        this.error = null;
                        this.$router.push('home');
                    })
            },
            login () {
                this.loginUser({
                    username: this.email,
                    password: this.password
                })
                    .catch(error => this.error = error.message)
            }
        },
    }
</script>

<style scoped>

</style>
