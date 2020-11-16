<template>
    <q-dialog persistant v-model="dialogStatus">
        <q-card style="width: 700px; max-width: 80vw;">
            <q-form>
                <q-card-section class="row items-center">
                    <div class="text-h6">
                        {{ isEdit ? 'Edit Appointment' : 'Add Appointment' }}
                    </div>
                    <q-space />
                    <q-btn
                            flat
                            round
                            dense
                            v-close-popup
                            type="button"
                            icon="close"
                            @click="emptyForm"
                    />
                </q-card-section>
                <q-card-section  >
                    <q-table  v-if="canSelectPatient&&!patient_id"
                            flat
                            title="Select Patient"
                            selection="single"
                            :selected.sync="selected_patient"
                            dense
                            row-key="id"
                            :data="patients"
                            :columns="patient_columns"
                            :pagination.sync="pagination"
                            :filter="filter"
                            :loading="loading"
                            @request="fetchPatients"
                    >
                        <template v-slot:top-right>
                            <q-input
                                    autofocus
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
                    <q-input
                            clearable
                            outlined
                            v-model="computed_date"
                            :error="form.errors.has('date')"
                            :error-message="form.getError('date')"
                    >
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy
                                        ref="qDateProxy"
                                        transition-show="scale"
                                        transition-hide="scale"
                                >
                                    <q-date
                                            minimal
                                            v-model="computed_date"
                                            mask="YYYY-MM-DD"
                                            @input="() => $refs.qDateProxy.hide()"
                                    />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                    <q-input
                            v-model="computed_time"
                            clearable
                            outlined
                            :error="form.errors.has('time')"
                            :error-message="form.getError('time')"
                    >
                        <template v-slot:append>
                            <q-icon
                                    name="access_time"
                                    class="cursor-pointer"
                            >
                                <q-popup-proxy
                                        transition-show="scale"
                                        transition-hide="scale"
                                >
                                    <q-time
                                            v-model="computed_time"
                                            format24h :minute-options="[0, 15, 30, 45]"
                                    />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                    <q-input
                            v-model="form.description"
                            clearable
                            outlined
                            type="textarea"
                            label = "Description"
                            :error="form.errors.has('description')"
                            :error-message="form.getError('description')"
                    >
                    </q-input>
                    <q-select
                            outlined
                            emit-value
                            map-options
                            v-model="form.status_id"
                            :options="appointmentStatuses"
                            label = "Appointment Status"
                            :error="form.errors.has('status_id')"
                            :error-message="form.getError('status_id')"
                    />
                    <q-select
                            outlined
                            emit-value
                            map-options
                            v-model="form.test_status_id"
                            :options="appointmentTestStatues"
                            label = "Test Status"
                            :error="form.errors.has('test_status_id')"
                            :error-message="form.getError('test_status_id')"
                    />
                    <q-table
                            flat
                            title="Select Doctor"
                            selection="single"
                            :selected.sync="selected_doctor"
                            dense
                            row-key="id"
                            :data="doctors"
                            :columns="doctor_columns"
                            :pagination.sync="pagination"
                            :filter="filter"
                            :loading="loading"
                            @request="fetchDoctors"
                    >
                        <template v-slot:top-right>
                            <q-input
                                    autofocus
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
                </q-card-section>
                <q-card-actions class="bg-white text-teal">
                    <q-btn
                            v-close-popup
                            label="Cancel"
                            icon="far fa-times-circle"
                            color="negative"
                            @click=emptyForm
                    />
                    <q-space/>
                    <q-btn
                            label="Save"
                            icon="far fa-save"
                            color="primary"
                            @click="save"
                    />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script>
    import Form from 'src/utils/form/Form'
    import {mapGetters} from 'vuex'
    import {getAppointmentStatuses} from "../../store/modules/appointments/getters";
    export default {
        name: "CreateOrEditDialog",

        props: {
            appointmentToEdit:{
                default: null
            },
            openDialog:{
                type:Boolean,
                default:false,
            },
            timeSelected:{
                default:""
            },
            dateSelected:{
                default:""
            },
            isEdit:{
                type:Boolean,
                default:false
            },
            patient_id: {
                default:null
            },
            canSelectPatient:{
                type:Boolean,
                default:true
            }
        },

        data(){
            return{
                form: new Form({
                    date: '',
                    time: '',
                    doctor_id: '',
                    description:'',
                    status_id: '',
                    patient_id:"",
                    test_status_id: '',
                }),

                pagination: {
                    rowsNumber: 0,
                    page: 1,
                    rowsPerPage: 10
                },

                filter: '',
                loading: false,

                patients: [],
                selected_patient: [],
                patient_columns: [
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
                    }
                ],

                doctors: [],
                selected_doctor: [],
                doctor_columns: [
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
                ],

                options: [],

                editId: null
            }
        },
        mounted () {
            this.fetchPatients()
            this.fetchDoctors()
            if (this.getAppointmentTestStatuses && this.getAppointmentTestStatuses.length > 0) {
                this.form.status_id=this.getAppointmentStatuses[0].id
            }
            if (this.getAppointmentTestStatuses && this.getAppointmentTestStatuses.length > 0) {
                this.form.test_status_id = this.getAppointmentTestStatuses[0].id
            }
        },
        methods:{
            closeDialog() {
                this.dialogStatus = false
            },
            emptyForm(){
                this.form.reset()
                this.selected_doctor = []
                this.selected_patient = []
            },
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
            fetchDoctors (props) {
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

                this.$TylexApp.request().get(this.$TylexApp.$getRoutePath('users_doctors_list'), {
                    params: params
                })
                    .then(response => {
                        const doctors = response.data
                        this.doctors = doctors.results

                        if (typeof props === 'undefined') {
                            this.pagination = {
                                rowsNumber: doctors.count,
                                page: doctors.page,
                                rowsPerPage: doctors.rowsPerPage
                            }
                        } else {
                            this.pagination = {
                                rowsNumber: doctors.count,
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
            editMode() {
                if(this.appointmentToEdit){
                    this.form.date = this.appointmentToEdit.date
                    this.form.time = this.appointmentToEdit.time
                    this.form.patient_id = this.appointmentToEdit.patient.id
                    this.form.doctor_id = this.appointmentToEdit.doctor.id
                    this.form.description = this.appointmentToEdit.description
                    this.form.status_id = this.appointmentToEdit.status.id
                    this.form.test_status_id = this.appointmentToEdit.test_status.id

                    this.selected_doctor.push(this.appointmentToEdit.doctor)
                    this.selected_patient.push(this.appointmentToEdit.patient)
                }

            },
            save(){
                this.form.patient_id = this.patient_id!==null?this.patient_id:this.selected_patient[0].id
                this.form.doctor_id = this.selected_doctor[0].id

                this.$TylexApp.$showLoading('Creating Appointment...')
                if(this.isEdit){
                    this.form.submit('put', this.$TylexApp.$getRoutePath('appointments_update',[this.appointmentToEdit.id])).then((data) => {
                        this.$TylexApp.$notifySuccess('Appointment Updated successfully...')
                        this.$TylexApp.$hideLoading()
                        this.$emit('appointmentEditOrUpdated', this.dateSelected)
                        this.emptyForm()
                        this.closeDialog()
                        this.form.date = this.dateSelected

                    }).catch((error) => {
                        if (error.status === 400) {
                            this.$TylexApp.$notifyError('There are some errors with inputs.')
                        }

                        this.$TylexApp.$hideLoading()
                    })
                }
                else{
                    this.form.submit('post', this.$TylexApp.$getRoutePath('appointments_create')).then((data) => {
                        this.$TylexApp.$notifySuccess('Appointment created successfully...')
                        this.$TylexApp.$hideLoading()
                        this.$emit('appointmentEditOrUpdated', this.dateSelected)
                        this.emptyForm()
                        this.closeDialog()
                        this.form.date = this.dateSelected

                    }).catch((error) => {
                        if (error.status === 400) {
                            this.$TylexApp.$notifyError('There are some errors with inputs.')
                        }

                        this.$TylexApp.$hideLoading()
                    })
                }
            }
        },
        computed:{
            computed_date:{
                get(){
                    if (this.form.date.length < 1){
                        return this.dateSelected
                    } else {
                        return this.form.date
                    }
                },
                set(newVal){
                    this.form.date = newVal
                }
            },

            computed_time:{
                get(){
                    if (this.form.time.length < 1){
                        return this.timeSelected
                    } else {
                        return this.form.time
                    }
                },
                set(newVal){
                    this.form.time = newVal
                }
            },

            dialogStatus:{
                set(newVal){
                    if(!newVal){
                        this.emptyForm()
                        this.$emit('closePopUp')
                    }
                },
                get(){
                    return this.openDialog
                }
            },
            appointmentStatuses: {
                get() {
                    if (this.getAppointmentStatuses && this.getAppointmentStatuses.length > 0) {
                        return this.getAppointmentStatuses.map((appointmentStatus) => {
                            return {
                                label: appointmentStatus.name,
                                value: appointmentStatus.id
                            }
                        })
                    } else {
                        return []
                    }

                }
            },
            appointmentTestStatues: {
                get(){
                    if (this.getAppointmentTestStatuses && this.getAppointmentTestStatuses.length > 0) {
                        return this.getAppointmentTestStatuses.map((appointmentTestStatus) => {
                            return {
                                label: appointmentTestStatus.name,
                                value: appointmentTestStatus.id
                            }
                        })
                    } else {
                        return []
                    }
                }
            },
            ...mapGetters('appointments', {
                getAppointmentStatuses: 'getAppointmentStatuses',
                getAppointmentTestStatuses: 'getAppointmentTestStatuses',
                getAppointmentCounts: 'getAppointmentCounts'
            })
        },
        watch: {
            isEdit(newVal) {
                if (newVal) {
                    this.editMode()
                }
            },
            dateSelected(newVal){
                this.computed_date = newVal
            },
            timeSelected(newVal){
                this.computed_time = newVal
            }
        }
    }
</script>

<style scoped>

</style>
