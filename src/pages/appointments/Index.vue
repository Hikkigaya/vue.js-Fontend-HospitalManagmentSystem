<template>
    <q-page padding>
        <q-table
                row-key="id"
                :data="appointments"
                :columns="columns"
                :pagination.sync="pagination"
                :filter="filter"
                :loading="loading"
                @request="fetchAppointments"
        >
            <template v-slot:body-cell-actions="props">
                <q-td>
                    <q-btn
                            flat
                            round
                            icon="far fa-edit"
                            color="primary"
                            @click="editAppointment(props)"
                    >
                    </q-btn>
                    <q-btn
                            flat
                            round
                            icon="far fa-trash-alt"
                            color="negative"
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
                        <q-icon name="search"/>
                    </template>
                </q-input>
            </template>

        </q-table>

        <create-or-edit-dialog
                :is-edit="isEdit"
                :open-dialog = "openDialog"
                :time-selected = "timeSelected"
                :date-selected = "dateSelected"
                :appointmentToEdit = 'appointmentToEdit'
                @closePopUp = "closePopUp"
        ></create-or-edit-dialog>
    </q-page>
</template>

<script>
    import Form from 'src/utils/form'
    import CreateOrEditDialog from 'src/components/appointments/CreateOrEditDialog'

    export default {
        name: 'AppointmentsIndex',
        components: {CreateOrEditDialog},
        data () {
            return {
                appointments: [],
                form: new Form(),
                filter: '',
                loading: false,

                timeSelected:'',
                dateSelected: '',
                openDialog: false,
                isEdit: false,

                appointmentToEdit: null,
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
                        name: 'patient',
                        label: 'Patient',
                        field: (row) => {
                            return row.patient.name
                        },
                        required: true,
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'doctor',
                        label: 'Doctor',
                        field: row => {
                            return row.doctor ? row.doctor.name : ''
                        },
                        required: true,
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'date',
                        label: 'Date',
                        field: row => {
                            return this.$moment(row.date).format('Do MMM, YYYY')
                        },
                        required: true,
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'time',
                        label: 'Time',
                        field: row => {
                            return this.$moment(row.time, ['h:m a', 'H:m']).format('h:mm A')
                        },
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
            this.fetchAppointments()
        },
        methods: {
            closePopUp(){
                this.openDialog = false
                this.isEdit = false
                this.appointmentToEdit = null
            },
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
                    this.$TylexApp.$showLoading('Deleting Appointment...')
                    this.form.delete(this.$TylexApp.$getRoutePath('appointments_delete', [props.row.id])).then(
                        () => {
                            this.$TylexApp.$notifySuccess('Appointment deleted successfully...')
                            this.fetchAppointments()
                            this.$TylexApp.$hideLoading()
                        }
                    ).catch(error => {
                        this.$TylexApp.$notifyError('There was a error in deleting the item! Please try again.')
                        this.$TylexApp.$hideLoading()
                    })
                })
            },
            fetchAppointments (props) {
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

                this.$TylexApp.request().get(this.$TylexApp.$getRoutePath('appointments_list'), {
                    params: params
                })
                    .then(response => {
                        const appointments = response.data
                        this.appointments = appointments.results

                        if (typeof props === 'undefined') {
                            this.pagination = {
                                rowsNumber: appointments.count,
                                page: appointments.page,
                                rowsPerPage: appointments.rowsPerPage
                            }
                        } else {
                            this.pagination = {
                                rowsNumber: appointments.count,
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
            editAppointment(props) {
                this.openDialog = true
                this.isEdit = true
                this.dateSelected = props.row.date
                this.timeSelected = props.row.time
                this.appointmentToEdit = props.row
            }
        }
    }
</script>
