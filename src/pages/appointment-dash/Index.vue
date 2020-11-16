<template>
    <q-page padding>
        <q-toolbar>
            <q-toolbar-title>Appointments Scheduled Today</q-toolbar-title>
            <DateFilter @filterUpdated="appointmentFilterUpdated"></DateFilter>
        </q-toolbar>
        <q-table
                grid
                virtual-scroll
                no-data-label="No Appointments For Today"
                row-key="id"
                :data="appointments"
                :columns="columns"
                :filter="filter"
                :loading="loading"
                :rows-per-page-options="[0]"
                :pagination.sync="pagination"
                @request="fetchAppointments"
                @row-click="RowClick"
        >
        </q-table>
    </q-page>
</template>

<script>
    import {date} from 'quasar'
    import DateFilter from "../../components/cards/DateFilter";

    export default {
        name: "Index",
        components: {DateFilter},
        data() {
            return {
                appointments: [],
                appointmentsCompleted: [],
                filter: '',
                loading: false,
                dateFilter: {
                    date:this.$moment().format('YYYY-MM-DD'),
                    date__lte:null,
                    date__gte:null
                },
                columns: [
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
                    }
                ],
                pagination: {
                    rowsPerPage: 0
                },
            }
        },
        mounted() {
            this.fetchAppointments()
        },
        methods: {
            appointmentFilterUpdated(filter){
              this.dateFilter=filter
                this.fetchAppointments()
            },
            fetchAppointments() {
                let filter = {
                    ...this.dateFilter
                }
                this.loading = true
                this.$TylexApp.request().get(this.$TylexApp.$getRoutePath('appointments_scheduled_all_list'), {
                    params: filter
                })
                    .then(response => {
                        this.appointments = response.data
                        this.loading = false
                    })
                    .catch(error => {
                        this.loading = false
                    })
            },
            RowClick(event, row) {
                this.$router.push({
                    name: 'diagnosis-prescription', params: {
                        id: row.id,
                        appointment: row,
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
