<template>
    <div class="q-gutter-md">

        <q-page class="q-pa-xl">
            <q-form
                    @submit="save"
                    @keydown="form.clearFormErrorAtField($event)"
                    @keypress.enter="save"
            >
                <div class="row q-mb-md">
                    <div class="col-sm-6 col-md-6 col-lg-6">
                        <q-input
                                outlined
                                v-model="groupName"
                                autofocus
                                clearable
                                name="name"
                                :error="form.errors.has('name')"
                                :error-message="form.getError('name')"
                                label="Enter name of new group"
                        >
                        </q-input>
                    </div>

                    <div class="col-sm-6 col-md-6 col-lg-6">
                        <q-btn color="positive" class="float-right" type="submit" icon="save" label="Save"/>
                    </div>
                </div>


                <q-table
                        title ="Select Permissions"
                        :data="permissions"
                        :columns="columns"
                        row-key="name"
                        selection="multiple"
                        :selected.sync="selectedPermissions"
                        virtual-scroll
                        :pagination.sync="pagination"
                        :rows-per-page-options="[0]"
                        table-style="max-height: 400px"
                        :loading="loading"
                        dense
                        loading-label="Loading..."
                >
                </q-table>
            </q-form>
        </q-page>

    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import Form from 'src/utils/form/Form'

    export default {
        name: "Form",
        props: [
            'isEdit'
        ],
        data(){
            return{
                form: new Form({
                    name: '',
                    permission_ids: []
                }),
                pagination: {
                    rowsPerPage: 0
                },
                loading: false,
                permissions: [],
                selected: [],
                group: null,
                columns: [
                    { name: 'id', align: 'center', label: 'ID', field: 'id', sortable: true },
                    { name: 'name', align:'left', label: 'Name', field: 'name', sortable: true }
                ]
            }
        },
        computed:{
            selectedPermissions: {
                set(newVal) {
                    this.form.permission_ids = []
                    this.selected = newVal

                    newVal.forEach(
                        (permission) => {
                            this.form.permission_ids.push(permission.id)
                        }
                    )
                },
                get() {
                    return this.selected;
                }
            },
            groupName: {
                set(newVal) {
                    this.form.name = newVal

                    if (this.isEdit && this.group) {
                        this.group.name = newVal
                    }
                },
                get() {
                    if (this.isEdit) {
                        return this.group ? this.group.name : ''
                    }

                    return this.form.name
                }
            }
        },
        mounted(){
            this.loading = true

            if (this.isEdit) {
                this.getGroup(this.$route.params.id_send).then((group) => {
                    this.group = group
                    this.form.name = this.group.name
                    this.groupName = this.group.name
                    this.selected = this.group.permissions
                })
            }

            this.getAllPermissions()
            .then( permissions => {
                this.permissions = permissions
                this.loading = false
            }).catch(error => {
                this.loading = false
            })
        },
        methods:{
            save() {
                if (!this.isEdit) {
                    this.$TylexApp.$showLoading('Creating Group...')

                    this.form.submit('post', this.$TylexApp.$getRoutePath('groups_create')).then((data) => {
                        this.$TylexApp.$notifySuccess('Group created successfully...')
                        this.$TylexApp.$hideLoading()
                        this.$router.push({name: 'roles'})
                    }).catch((error) => {
                        if (error.status === 400) {
                            this.$TylexApp.$notifyError('There are some errors with inputs.')
                        }

                        this.$TylexApp.$hideLoading()
                    })
                }
                else {
                    this.$TylexApp.$showLoading('Updating Group...')

                    this.form.submit('patch', this.$TylexApp.$getRoutePath('groups_partial_update', [this.$route.params.id_send])).then((data) => {
                        this.$TylexApp.$notifySuccess('Group updated successfully...')
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
                getGroup: 'getGroup',
                getAllPermissions: 'getAllPermissions'
            })
        }
    }
</script>

<style scoped>
</style>
