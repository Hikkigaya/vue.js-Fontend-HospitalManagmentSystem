<template>
    <q-page padding>
        <q-table
                :data="users"
                :columns="columns"
                :loading="loading"
                :pagination.sync="pagination"
                row-key="id"
                dense
                :filter="filter"
                @request="fetchUsers"
        >
            <template v-slot:top-left>
                <q-btn-group push>
                    <q-btn
                            icon="add"
                            color="primary"
                            dark
                            push
                            label="Add User"
                            :to="{ name: 'create-users'}"
                    />
                </q-btn-group>
            </template>

            <template v-slot:body-cell-is_active="props">
                <q-td>
                    {{ props.row.is_active ? 'Yes' : 'False' }}
                </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
                <q-td>
                    <q-btn
                            icon="far fa-edit"
                            color="primary"
                            flat
                            round
                            :to="{ name: 'users_update', params: { id: props.row.id } }"
                    >
                    </q-btn>
                    <q-btn
                            v-if="props.row.is_active"
                            icon="block"
                            flat
                            color="negative"
                            round
                            @click="onDisableClick(props)"
                    >
                    </q-btn>
                    <q-btn
                            v-if="!props.row.is_active"
                            icon="check_circle_outline"
                            flat
                            color="positive"
                            round
                            @click="onActiveClick(props)"
                    >
                    </q-btn>
                </q-td>
            </template>
            <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon name="search"/>
                    </template>
                </q-input>
            </template>
        </q-table>
    </q-page>

</template>

<script>
    import Form from 'src/utils/form/Form'

    export default {
        name: 'index',
        data () {
            return {
                form: new Form,
                filter: '',
                loading: false,
                pagination: {
                    rowsNumber: 0,
                    page: 1,
                    rowsPerPage: 10
                },
                users: [],
                selected: [],
                columns: [
                    {
                        name: 'username',
                        label: 'User Name',
                        field: 'username',
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'name',
                        label: 'Full Name',
                        field: 'name',
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'email',
                        label: 'Email',
                        field: 'email',
                        align: 'left'
                    },
                    {
                        name: 'is_active',
                        label: 'Is Active',
                        field: 'is_active',
                        align: 'left'
                    },
                    {
                        name: 'actions',
                        label: 'Actions',
                        align: 'left'
                    }
                ]
            }
        },
        mounted () {
            this.fetchUsers()
        },
        methods: {
            onDisableClick (props) {
                this.$q.dialog({
                    title: 'Are you sure?',
                    message: 'Are you sure you want to disable this user?',
                    ok: {
                        push: true,
                        color: 'negative',
                        label: 'Yes'
                    },
                    cancel: {
                        push: true,
                        color: 'positive'
                    },
                }).onOk(() => {
                    this.$TylexApp.$showLoading('Disabling User...')
                    this.form.get(this.$TylexApp.$getRoutePath('users_deactivate', [props.row.id])).then(
                        () => {
                            this.fetchUsers()
                            this.$TylexApp.$hideLoading()
                        }
                    ).catch(error => {
                        this.$TylexApp.$notifyError('There was a error in disabling the user! Please try again.')
                        this.$TylexApp.$hideLoading()
                    })
                })
            },
            onActiveClick (props) {
                this.$q.dialog({
                    title: 'Are you sure?',
                    message: 'Are you sure you want to enable this user?',
                    ok: {
                        push: true,
                        color: 'positive',
                        label: 'Yes'
                    },
                    cancel: {
                        push: true,
                        color: 'negative'
                    },
                }).onOk(() => {
                    this.$TylexApp.$showLoading('Enabling User...')
                    this.form.get(this.$TylexApp.$getRoutePath('users_activate', [props.row.id])).then(
                        () => {
                            this.fetchUsers()
                            this.$TylexApp.$hideLoading()
                        }
                    ).catch(error => {
                        this.$TylexApp.$notifyError('There was a error in enabling the user! Please try again.')
                        this.$TylexApp.$hideLoading()
                    })
                })
            },
            fetchUsers (props) {
                this.loading = true

                if (typeof props !== 'undefined') {
                    this.pagination = {
                        page: props.pagination.page,
                        page_size: props.pagination.rowsPerPage
                    }
                }

                let params = {
                    page: this.pagination.page,
                    page_size: this.pagination.page_size,
                    q: props ? props.filter : ''
                }

                this.$TylexApp.request().get(this.$TylexApp.$getRoutePath('users_list'), {
                    params: params
                })
                    .then(response => {
                        const users = response.data
                        this.users = users.results

                        if (typeof props === 'undefined') {
                            this.pagination = {
                                rowsNumber: users.count,
                                page: users.page,
                                rowsPerPage: users.rowsPerPage
                            }
                        } else {
                            this.pagination = {
                                rowsNumber: users.count,
                                page: props.pagination.page,
                                rowsPerPage: props.pagination.rowsPerPage
                            }
                        }

                        this.loading = false
                    })
                    .catch(error => {
                        this.loading = false
                    })
            }
        }
    }
</script>

<style scoped>

</style>
