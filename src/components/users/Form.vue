<template>
    <div class="q-gutter-md" style="max-width: 600px">
        <q-page class="q-pa-xl">
            <q-form
                    @submit="onSubmit"
                    class="q-gutter-md"
                    @keydown="form.clearFormErrorAtField($event)"
            >
                <q-input
                        v-bind:readonly="isEdit"
                        type="email"
                        outlined
                        clearable
                        v-model="form.email"
                        label="Email *"
                        :error="form.errors.has('email')"
                        :error-message="form.getError('email')"
                        hint="Enter 'none' if email does not exist"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please enter email or none if email does not exist']"
                />

                <q-input
                        outlined
                        clearable
                        v-model="form.first_name"
                        label="First name *"
                        :error="form.errors.has('first_name')"
                        :error-message="form.getError('first_name')"
                        lazy-rules
                        :rules="[val => val !== null && val !== '' || 'Please enter your first name']"
                />

                <q-input
                        outlined
                        clearable
                        v-model="form.last_name"
                        label="Last name *"
                        :error="form.errors.has('last_name')"
                        :error-message="form.getError('last_name')"
                        lazy-rules
                        :rules="[val => val !== null && val !== '' || 'Please enter your last name']"
                />

                <q-input
                        v-bind:readonly="isEdit"
                        outlined
                        clearable
                        v-model="form.username"
                        label="Username *"
                        :error="form.errors.has('username')"
                        :error-message="form.getError('username')"
                        lazy-rules
                        :rules="[val => val !== null && val !== '' || 'Please enter a unique username']"
                />

                <q-input
                        :type="isPwd ? 'password' : 'text'"
                        outlined
                        clearable
                        v-model="form.password"
                        label="Password *"
                        :error="form.errors.has('password')"
                        :error-message="form.getError('password')"
                        lazy-rules
                        :rules="[val => val !== null && val !== '' || 'Please enter a strong password']"
                >
                    <template v-slot:append>
                        <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="isPwd = !isPwd"
                        />
                    </template>
                </q-input>

                <div class="q-gutter-md row items-start">
                    <q-uploader
                            hide-upload-btn
                            label="Upload Profile Image"
                            single
                            accept=".jpg, image/*"
                            style="max-width: 300px"
                            @added = "fileSelected"
                            @removed="fileRemoved"
                    />
                </div>

                <q-table
                        title ="Select Group"
                        :data="roles"
                        :columns="columns"
                        row-key="name"
                        selection="multiple"
                        :selected.sync="selected"
                        :pagination="pagination"
                        :rows-per-page-options="[0]"
                        virtual-scroll
                        table-style="max-height: 400px"
                        dense
                        loading-label="Loading..."
                >
                </q-table>

                <div>
                    <q-btn label="Submit" type="submit" @submit="onSubmit" color="primary"/>
                </div>
            </q-form>
        </q-page>
    </div>
</template>

<script>

    import { mapActions } from 'vuex'
    import Form from "src/utils/form/Form";

    export default {
        name: "Form",
        props: [
            'isEdit'
        ],
        data(){
            return{
                isPwd: true,
                valueHolder : [],
                roles : [],
                user : null,
                form: new Form ({
                    email: '',
                    first_name: '',
                    last_name: '',
                    username: '',
                    password: '',
                    picture: '',
                    groups_ids: []
                }),
                columns: [
                    {
                        name: 'name',
                        label: 'Roll Name',
                        field: 'name',
                        sortable: true,
                        align: 'left'
                    }
                ],
                pagination: {
                    rowsPerPage: 0
                },
            }
        },
        computed:{
            selected:{
                set(newVal){
                    this.valueHolder = newVal
                    this.form.groups_ids = []
                    for (let element of this.valueHolder){
                        this.form.groups_ids.push(element.id)
                    }
                },
                get(){
                    return this.valueHolder
                },
            }
        },
        mounted(){
            this.getAllGroups()
                .then( groups => {
                    this.roles = groups
                })
                .catch(error => {
                        this.$TylexApp.$notifyError("Unable to get users")
                    }
                )
            if (this.isEdit) {
                this.getUser(this.$route.params.id).then((user) => {
                    this.form.email = user.email
                    this.form.first_name = user.first_name
                    this.form.last_name = user.last_name
                    this.form.username = user.username
                    this.form.password = user.password
                    this.form.picture = ''
                    this.form.groups_ids = []
                    this.selected = user.groups
                })
            }
        },
        methods:{
            fileSelected(file){
                this.form.picture = file[0]
            },
            fileRemoved(){
                this.form.picture = ''
            },
            onSubmit(){
                if(this.isEdit == false){
                    this.$TylexApp.$showLoading('Creating User...')
                    this.form.post(this.$TylexApp.$getRoutePath("users_create"))
                        .then(
                            response => {
                                this.$TylexApp.$notifySuccess('User created successfully...')
                                this.$TylexApp.$hideLoading()
                                this.$router.push({name: 'users'})
                            }
                        )
                        .catch(error => {
                                this.$TylexApp.$notifyError("Fix errors with input")
                                this.$TylexApp.$hideLoading()
                            }
                        )
                }
                if(this.isEdit == true){

                    this.$TylexApp.$showLoading('Updating User...')

                    this.form.submit('patch', this.$TylexApp.$getRoutePath('users_partial_update', [this.$route.params.id])).then((data) => {
                        this.$TylexApp.$notifySuccess('User updated successfully...')
                        this.$TylexApp.$hideLoading()
                        this.$router.push({name: 'users'})
                    }).catch((error) => {
                        if (error.status === 400) {
                            this.$TylexApp.$notifyError('There are some errors with inputs.')
                        }

                        this.$TylexApp.$hideLoading()
                    })
                }
            },
            ...mapActions('roles', {
                getAllGroups: 'getAllGroups'
            }),
            ...mapActions('user', {
                getUser: 'getUser'
            })
        }
    }
</script>

<style scoped>

</style>
