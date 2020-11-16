<template>
    <q-page padding>
        <q-table
                dense
                row-key="id"
                :data="patients"
                :columns="columns"
                :pagination.sync="pagination"
                :filter="filter"
                :loading="loading"
                @request="fetchPatients"
        >
            <template v-slot:top-left>
                <q-btn-group push>
                    <q-btn
                            dark
                            push
                            icon="add"
                            color="primary"
                            label="Add Patient"
                            @click="openDialog = true"
                    />
                </q-btn-group>
            </template>

            <template v-slot:body-cell-actions="props">
                <q-td>
                    <q-btn
                            icon="history"
                            flat
                            color="positive"
                            round
                            @click="onHistoryClick(props)"
                    >
                    </q-btn>
                    <q-btn
                            flat
                            round
                            icon="far fa-edit"
                            color="primary"
                            @click="editPatient(props)"
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
                <q-input
                        borderless
                        dense
                        debounce="300"
                        v-model="filter"
                        placeholder="Search"
                >
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>

                </q-input>
            </template>
        </q-table>

        <create-or-edit-dialog
                :open-dialog="openDialog"
                :is-edit="isEdit"
                :patient="editItem"
                @closePopUp="closePopUp"
                @patientAddedOrUpdated="patientSaveCompleted"
        >
        </create-or-edit-dialog>

    </q-page>
</template>

<script>
    import Form from 'src/utils/form/Form';
    import CreateOrEditDialog from 'src/components/patients/CreateOrEditDialog'
    export default {
        name: "Index",
        components: {CreateOrEditDialog},
        data(){
            return{
                form: new Form({

                }),

                pagination: {
                    rowsNumber: 0,
                    page: 1,
                    rowsPerPage: 10
                },

                filter: '',
                loading: false,
                patients: [],

                columns: [
                    {
                        name: 'name',
                        label: 'Name',
                        field: 'name',
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'phone',
                        label: 'Phone',
                        field: 'phone',
                        align: 'left'
                    },
                    {
                        name: 'address',
                        label: 'Address',
                        field: 'address',
                        align: 'left'
                    },
                    {
                        name: 'age',
                        label: 'Age',
                        field: 'age',
                        align: 'left',
                        sortable: true,
                    },
                    {
                        name: 'blood_type',
                        label: 'Blood Type',
                        field: 'blood_type',
                        align: 'left',
                        sortable: true,
                    },
                    {
                        name: 'actions',
                        label: 'Actions',
                        align: 'left'
                    },
                ],

                openDialog: false,
                isEdit: false,
                editItem: null,

            }
        },
        mounted () {
            this.fetchPatients()
        },
        methods:{
            fetchPatients(props){
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

                this.$TylexApp.request().get(this.$TylexApp.$getRoutePath('patients_list'), {
                    params: params
                })
                    .then(response => {
                        const patients = response.data
                        this.patients = patients.results


                        if (typeof props === 'undefined') {
                            this.pagination = {
                                rowsNumber: patients.count,
                                page: patients.page,
                                rowsPerPage: patients.rowsPerPage
                            }
                        } else {
                            this.pagination = {
                                rowsNumber: patients.count,
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
            editPatient(props){
                this.openDialog = true
                this.isEdit = true
                this.editItem = props.row
            },
            closePopUp(){
                this.openDialog = false
                this.isEdit = false
                this.editItem = null
            },
            patientSaveCompleted() {
                this.fetchPatients()
                this.closePopUp()
            },
            onDeleteClick(props) {
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
                    this.$TylexApp.$showLoading('Deleting Patient...')
                    this.form.delete(this.$TylexApp.$getRoutePath('patients_delete', [props.row.id])).then(
                        () => {
                            this.$TylexApp.$notifySuccess('Patient deleted successfully...')
                            this.fetchPatients()
                            this.$TylexApp.$hideLoading()
                        }
                    ).catch(error => {
                        this.$TylexApp.$notifyError('There was a error in deleting the item! Please try again.')
                        this.$TylexApp.$hideLoading()
                    })
                })
            },
            onHistoryClick(props) {
                this.$router.push({
                    name: 'patient-history',
                    params: {
                        id: props.row.id
                    }
                })
            }
        },

    }
</script>

<style scoped>

</style>
