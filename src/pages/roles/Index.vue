<!--
  - Copyright (c) 2019 @TylexTech All Rights Reserved.
  -->

<template>
    <div class="q-pa-md">
        <q-table :data="groups"
                 :columns="columns"
                 row-key="id"
                 :pagination.sync="pagination"
                 :filter="filter"
                 :loading="loading"
                 @request="fetchGroups"
        >
            <template v-slot:top-left>
                <q-btn-group push>
                    <q-btn
                            color="primary"
                            dark
                            push
                            icon="add"
                            label="Add Role"
                            :to="{ name: 'create-roles'}"
                    />
                </q-btn-group>
            </template>
            <template v-slot:body-cell-actions="props">
                <q-td>
                    <q-btn
                            icon="far fa-edit"
                            color="primary"
                            flat
                            round
                            :to="{ name: 'edit-roles', params: { id_send: props.row.id } }"
                    >
                    </q-btn>
                    <q-btn
                            icon="far fa-trash-alt"
                            flat
                            color="negative"
                            round
                            @click="onDeleteClick(props)"
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
    </div>
</template>

<script>
    import Form from 'src/utils/form/Form'

    export default {
        name: 'index',
        data () {
            return {
                groups: [],
                form: new Form(),
                filter: '',
                loading: false,
                pagination: {
                    rowsNumber: 0,
                    page: 1,
                    rowsPerPage: 10
                },
                columns: [
                    {
                        name: 'name',
                        label: 'Roll Name',
                        field: 'name',
                        sortable: true,
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
            this.fetchGroups()
        },
        methods: {
            onDeleteClick (props) {
                this.$q.dialog({
                    title: 'Are you sure?',
                    message: 'Are you sure you want to delete this item?',
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
                    this.$TylexApp.$showLoading('Deleting Group...');
                    this.form.delete(this.$TylexApp.$getRoutePath('groups_delete', [props.row.id])).then(
                        () => {
                            this.fetchGroups()
                            this.$TylexApp.$hideLoading()
                        }
                    ).catch(error => {
                        this.$TylexApp.$notifyError('There was a error in deleting the item! Please try again.')
                        this.$TylexApp.$hideLoading()
                    })
                })
            },
            fetchGroups (props) {
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

                this.$TylexApp.request().get(this.$TylexApp.$getRoutePath('groups_list'), {
                    params: params
                })
                    .then(response => {
                        const groups = response.data
                        this.groups = groups.results

                        if (typeof props === 'undefined') {
                            this.pagination = {
                                rowsNumber: groups.count,
                                page: groups.page,
                                rowsPerPage: groups.rowsPerPage
                            }
                        } else {
                            this.pagination = {
                                rowsNumber: groups.count,
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
