<!--
  - Copyright (c) 2019 @ TylexTech. All rights reserved.
  -->

<template>
    <q-layout view="lHh lpR lFr">

        <q-page-container>
            <q-page class="q-pa-xl">
                <div class="flex justify-center full-height" :class="heightSize">
                    <q-card class="my-card ">
                        <q-img src="statics/tylextech.svg" sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px">
                        </q-img>
                        <q-card-section>
                            <div class="q-pa-md">
                                <q-form
                                        autofocus
                                        class="q-gutter-md"
                                        @keydown="form.clearFormErrorAtField($event)"
                                        @keypress.enter="onSubmit"
                                >
                                    <q-input
                                        v-model="form.username"
                                        placeholder="Username"
                                        name="username"
                                        :error="form.errors.has('username')"
                                    >
                                        <template v-slot:prepend>
                                            <q-icon name="account_box" />
                                        </template>

                                        <template v-slot:error>
                                            {{ form.getError('username') }}
                                        </template>
                                    </q-input>

                                    <q-input
                                        v-model="form.password"
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                        :error="form.errors.has('password')"
                                        :error-message="form.getError('password')"
                                    >
                                        <template v-slot:prepend>
                                            <q-icon name="lock" />
                                        </template>
                                    </q-input>
                                </q-form>

                                <div class="q-ma-lg">
                                    <q-btn
                                            @click.native="onSubmit"
                                        type="submit"
                                        color="black"
                                        class="full-width"
                                        label="Login"
                                        icon="fas fa-key"
                                    />
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </q-page>
        </q-page-container>

    </q-layout>
</template>

<script>
    import { Platform } from 'quasar'
    import Form from 'src/utils/form/Form'

    export default {
        name: 'Login',
        data() {
            return {
                logo: 'PMS',
                bgColor: 'blue-grey',
                toneColor: 6,
                form: new Form({
                    username: '',
                    password: ''
                })
            }
        },
        computed: {
            finalBgColor () {
                return `bg-${this.bgColor}-${this.toneColor}`
            },
            heightSize (){
                if (Platform.is.desktop) {
                    return 'items-center'
                }
                return ''
            }
        },
        mounted() {

        },
        methods: {
            onSubmit() {
                this.$TylexApp.$showLoading('Authenticating...')

                this.form.submit('post', this.$TylexApp.$getRoutePath('create_jwt') ).then((data) => {
                    this.$TylexApp.$setToken(data)
                    this.$TylexApp.$notifySuccess('You are now loggedin to the system.')
                    this.$TylexApp.$hideLoading()
                    this.$router.push({name: 'dashboard'})
                }).catch((error) => {
                    if (error.status === 401) {
                        this.form.errors.record({username: ['Invalid Username/Password provided.']})
                        this.$TylexApp.$notifyError('Authentication failed...')
                    }
                    else if (error.status === 400) {
                        this.$TylexApp.$notifyError('There are some errors with inputs.')
                    }

                    this.$TylexApp.$hideLoading()
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-card {
        width: 100%;
    }

    @media screen and (min-width: 768px) {
        .my-card {
            width: 25%;
        }
    }
</style>
