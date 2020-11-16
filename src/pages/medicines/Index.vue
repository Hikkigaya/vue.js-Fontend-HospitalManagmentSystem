<template>
    <q-page padding>
        <q-table
                :data="medicines"
                :columns="columns"
                row-key="id"
                :pagination.sync="pagination"
                :filter="filter"
                :loading="loading"
                @request="fetchMedicines"
        >
            <template v-slot:top-left>
                <q-btn-group push>
                    <q-btn
                            color="primary"
                            dark
                            push
                            icon="add"
                            label="Add Medicine"
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
                            @click="editMedicine(props)"
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
                :medicine="editedItem"
                :open-dialog="openDialog"
                @medicineAddedOrUpdated="medicineSaveCompleted"
                @closePopup="closeAddOrEditDialog"
        >
        </create-or-edit-dialog>
    </q-page>
</template>

<script>
    import Form from 'src/utils/form/Form'
    import CreateOrEditDialog from 'src/components/medicines/CreateOrEditDialog'

    export default {
        name: 'MedicinesIndex',
        components: { CreateOrEditDialog },
        data() {
            return {
                medicines: [],
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
                        name: 'medical_name',
                        label: 'Medical Name',
                        field: row => {
                            return row.medical_name ? row.medical_name.name : ''
                        },
                        required: true,
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'company',
                        label: 'Company',
                        field: row => {
                            return row.company.name
                        },
                        required: true,
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'creator',
                        label: 'Creator',
                        field: row => {
                            return row.creator.name
                        },
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
            this.fetchMedicines()
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
                    this.$TylexApp.$showLoading('Deleting Medicine...')
                    this.form.delete(this.$TylexApp.$getRoutePath('medicines_delete', [props.row.id])).then(
                        () => {
                            this.$TylexApp.$notifySuccess('Medicines deleted successfully...')
                            this.fetchMedicines()
                            this.$TylexApp.$hideLoading()
                        }
                    ).catch(error => {
                        this.$TylexApp.$notifyError('There was a error in deleting the item! Please try again.')
                        this.$TylexApp.$hideLoading()
                    })
                })
            },
            fetchMedicines (props) {
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

                this.$TylexApp.request().get(this.$TylexApp.$getRoutePath('medicines_list'), {
                    params: params
                })
                .then(response => {
                    const medicines = response.data
                    this.medicines = medicines.results

                    if (typeof props === 'undefined') {
                        this.pagination = {
                            rowsNumber: medicines.count,
                            page: medicines.page,
                            rowsPerPage: medicines.rowsPerPage
                        }
                    } else {
                        this.pagination = {
                            rowsNumber: medicines.count,
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
            editMedicine(props){
                this.openDialog = true
                this.isEdit = true
                this.editedItem = props.row
            },
            medicineSaveCompleted() {
                this.fetchMedicines()
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
