<template>
    <q-page padding>
        <q-table
                :data="companies"
                :columns="columns"
                row-key="id"
                :pagination.sync="pagination"
                :filter="filter"
                :loading="loading"
                @request="fetchCompanies"
        >
            <template v-slot:top-left>
                <q-btn-group push>
                    <q-btn
                            color="primary"
                            dark
                            push
                            icon="add"
                            label="Add Company Type"
                            @click="openDialog = true"
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
                            @click="editCompany(props)"
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
        <create-or-edit-dialog
            :is-edit="isEdit"
            :company="editedItem"
            :open-dialog="openDialog"
            @companyAddedOrUpdated="companySaveCompleted"
            @closePopup="closeAddOrEditDialog"
        />
    </q-page>
</template>

<script>
    import Form from 'src/utils/form/Form'
    import CreateOrEditDialog from 'src/components/compnaies/CreateOrEditDialog'

    export default {
        name: 'PageName',
        components: {
            CreateOrEditDialog
        },
        data () {
            return {
                companies: [],
                form: new Form(),
                filter: '',
                loading: false,
                openDialog: false,
                isEdit: false,
                editedItem: null,
                pagination: {
                    rowsNumber: 0,
                    page: 1,
                    rowsPerPage: 10
                },
                columns: [
                    {
                        name: 'id',
                        label: 'Id',
                        field: 'id',
                        required: true,
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'name',
                        label: 'Name',
                        field: 'name',
                        required: true,
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'phone',
                        label: 'Phone',
                        field: 'phone',
                        required: true,
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'address',
                        label: 'Address',
                        field: 'address',
                        required: true,
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'type',
                        label: 'Type',
                        field: row => row.type.name,
                        required: true,
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'creator',
                        label: 'Creator',
                        field: row => row.creator.name,
                        required: true,
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'created_at',
                        label: 'Created At',
                        field: 'created_at',
                        required: true,
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'actions',
                        label: 'Actions',
                        required: true,
                        align: 'left'
                    }
                ]
            }
        },
        mounted () {
            this.fetchCompanies()
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
                    this.$TylexApp.$showLoading('Deleting Company...')
                    this.form.delete(this.$TylexApp.$getRoutePath('companies_delete', [props.row.id])).then(
                        () => {
                            this.$TylexApp.$notifySuccess('The item was deleted successfully.')
                            this.fetchGroups()
                            this.$TylexApp.$hideLoading()
                        }
                    ).catch(error => {
                        this.$TylexApp.$notifyError('There was a error in deleting the item! Please try again.')
                        this.$TylexApp.$hideLoading()
                    })
                })
            },
            fetchCompanies (props) {
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

                this.$TylexApp.request().get(this.$TylexApp.$getRoutePath('companies_list'), {
                    params: params
                })
                    .then(response => {
                        const companies = response.data
                        this.companies = companies.results

                        if (typeof props === 'undefined') {
                            this.pagination = {
                                rowsNumber: companies.count,
                                page: companies.page,
                                rowsPerPage: companies.rowsPerPage
                            }
                        } else {
                            this.pagination = {
                                rowsNumber: companies.count,
                                page: props.pagination.page,
                                rowsPerPage: props.pagination.rowsPerPage
                            }
                        }

                        this.loading = false
                    })
                    .catch(error => {
                        this.loading = false
                    })
            },
            editCompany(props) {
                this.openDialog = true
                this.isEdit = true
                this.editedItem = props.row
            },
            companySaveCompleted() {
                this.fetchCompanies()
                this.closeAddOrEditDialog()
            },
            closeAddOrEditDialog() {
                this.openDialog = false
                this.isEdit = false
                this.editedItem = null
            }
        }
    }
</script>
