<!--
  - Copyright (c) 2020 @ TylexTech. All rights reserved.
  -->

<template>
    <q-page padding style="min-height: 100%">
        <div class="row">
            <div class="col-sm-4 col-md-4 col-lg-3">
                <q-card class="q-ma-sm">

                    <q-card-section>
                        <q-tabs
                                v-model="tab"
                                active-color="primary"
                        >
                            <q-tab
                                    name="diagnoses"
                                    icon="fas fa-diagnoses"
                            >
                                <q-tooltip>
                                    Diagnoses
                                </q-tooltip>
                            </q-tab>
                            <q-tab
                                    name="prescriptions"
                                    icon="fas fa-prescription-bottle-alt"
                            >
                                <q-tooltip>
                                    Prescriptions
                                </q-tooltip>
                            </q-tab>
                            <q-tab
                                    name="appointments"
                                    icon="fas fa-calendar-check"
                            >
                                <q-tooltip>
                                    Appointments
                                </q-tooltip>
                            </q-tab>
                        </q-tabs>
                        <q-toolbar>
                            <q-toolbar-title>{{ getTabTitle }} </q-toolbar-title>
                            <q-btn v-if="tab === 'appointments'" @click="openDialog=true" color="primary" flat icon="fas fa-plus"></q-btn>
                        </q-toolbar>
                        <q-list bordered padding class="rounded-borders">

                            <template v-if="tab === 'diagnoses'">
                                <q-item
                                        v-for="diagnosis in diagnoses"
                                        :key="diagnosis.id"
                                        clickable
                                        v-ripple
                                        :class="{'q-item--active': (selectedDiagnosis && selectedDiagnosis.id === diagnosis.id)}"
                                        @click="selectDiagnosis(diagnosis)"
                                >
                                    <q-item-section>
                                        <q-item-label lines="1">{{ diagnosis.appointment.doctor.name }}</q-item-label>
                                        <q-item-label caption lines="2">
                                            {{ diagnosis.note }}
                                        </q-item-label>
                                    </q-item-section>

                                    <q-item-section side center>
                                        <div class="row">
                                            <div class="column justify-center">
                                                <q-icon
                                                        size="18px"
                                                        name="event"
                                                        class="q-mr-xs"
                                                ></q-icon>
                                            </div>

                                            <div class="column">
                                                <q-item-label
                                                        caption
                                                        class="row justify-end"
                                                >
                                                    {{ $moment(diagnosis.created_at).format('DD MMM, YYYY') }}
                                                </q-item-label>
                                            </div>
                                        </div>
                                    </q-item-section>
                                </q-item>
                            </template>

                            <template v-if="tab === 'prescriptions'">
                                <q-item
                                        v-for="prescription in prescriptions"
                                        :key="prescription.id"
                                        clickable
                                        v-ripple
                                        :class="{'q-item--active': (selectedPrescription && selectedPrescription.id === prescription.id)}"
                                        @click="selectPrescription(prescription)"
                                >
                                    <q-item-section>
                                        <q-item-label lines="1">{{ prescription.diagnosis.appointment.doctor.name }}
                                        </q-item-label>
                                        <q-item-label caption lines="2">
                                            {{ prescription.note }}
                                        </q-item-label>
                                    </q-item-section>

                                    <q-item-section side center>
                                        <div class="row">
                                            <div class="column justify-center">
                                                <q-icon
                                                        size="18px"
                                                        name="event"
                                                        class="q-mr-xs"
                                                ></q-icon>
                                            </div>

                                            <div class="column">
                                                <q-item-label
                                                        caption
                                                        class="row justify-end"
                                                >
                                                    {{ $moment(prescription.created_at).format('DD MMM, YYYY') }}
                                                </q-item-label>
                                            </div>
                                        </div>
                                    </q-item-section>
                                </q-item>
                            </template>

                            <template v-if="tab === 'appointments'">
                                <q-item
                                        v-for="appointment in appointments"
                                        :key="appointment.id"
                                        clickable
                                        v-ripple
                                        :class="{'q-item--active': (selectedAppointment && selectedAppointment.id === appointment.id)}"
                                        @click="selectAppointment(appointment)"
                                >
                                    <q-item-section>
                                        <q-item-label lines="1">{{ appointment.doctor.name }}</q-item-label>
                                        <q-item-label caption lines="2">
                                            {{ appointment.description }}
                                        </q-item-label>
                                    </q-item-section>

                                    <q-item-section side top>
                                        <div class="row">
                                            <div class="column justify-center">
                                                <q-icon
                                                        size="18px"
                                                        name="event"
                                                        class="q-mr-xs"
                                                ></q-icon>
                                            </div>

                                            <div class="column">
                                                <q-item-label
                                                        caption
                                                        class="row justify-end"
                                                >
                                                    {{ $moment(appointment.data).format('DD MMM, YYYY') }}
                                                </q-item-label>

                                                <q-item-label
                                                        caption
                                                        class="row justify-end"
                                                >
                                                    {{ appointment.time }}
                                                </q-item-label>
                                            </div>
                                        </div>
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-list>
                    </q-card-section>
                </q-card>
            </div>


            <div class="col-sm-8 col-md-8 col-lg-9">
                <q-card class="q-ma-sm">
                    <diagnosis-detail-component
                            v-if="tab === 'diagnoses' && selectedDiagnosis"
                                                :diagnosis="selectedDiagnosis"
                    >
                    </diagnosis-detail-component>

                    <prescriptions-detail-component
                        v-if="tab === 'prescriptions' && selectPrescription"
                        :prescription="selectedPrescription"
                    ></prescriptions-detail-component>

                    <appointment-detail-component
                            v-if="tab === 'appointments' && selectedAppointment"
                            :appointment="selectedAppointment"
                    ></appointment-detail-component>
                </q-card>
            </div>
        </div>
        <create-or-edit-dialog @appointmentEditOrUpdated="this.fetchAppointments" :patient_id="$route.params.id" @closePopUp="closePopUp" :open-dialog="openDialog">

        </create-or-edit-dialog>
    </q-page>
</template>

<script>
    import { mapActions } from 'vuex'
    import DiagnosisDetailComponent from '../../components/diagnoses/DiagnosisDetailComponent'
    import AppointmentDetailComponent from '../../components/appointments/AppointmentDetailComponent'
    import PrescriptionsDetailComponent from '../../components/prescriptions/PrescriptionsDetailComponent'
    import CreateOrEditDialog from "../../components/appointments/CreateOrEditDialog";

    export default {
        name: 'History',
        components: {CreateOrEditDialog, PrescriptionsDetailComponent, AppointmentDetailComponent, DiagnosisDetailComponent },
        data: () => ({
            tab: 'diagnoses',
            diagnoses: [],
            appointments: [],
            prescriptions: [],
            selectedDiagnosis: null,
            selectedAppointment: null,
            selectedPrescription: null,
            openDialog:false
        }),
        computed: {
            getTabTitle () {
                let tab = 'Diagnoses'
                switch (this.tab) {
                    case 'diagnoses':
                        tab = 'Diagnoses'
                        this.fetchData('diagnoses')
                        break
                    case 'prescriptions':
                        tab = 'Prescription'
                        this.fetchData('prescriptions')
                        break
                    case 'appointments':
                        tab = 'Appointments'
                        this.fetchData('appointments')
                        break
                }

                return tab
            }
        },
        mounted () {
            this.fetchData()
        },
        methods: {
            closePopUp(){
                this.openDialog = false
                this.isEdit = false
                this.appointmentToEdit = null
            },
            fetchData (value) {
                switch (value) {
                    case 'diagnoses':
                        this.fetchDiagnoses()
                        break
                    case 'prescriptions':
                        this.fetchPrescriptions()
                        break
                    case 'appointments':
                        this.fetchAppointments()
                        break
                }
            },
            fetchPrescriptions () {
                this.fetchPatientPrescriptions(this.$route.params.id).then((data) => {
                    this.prescriptions = data
                    if (this.prescriptions.length > 0) {
                        this.selectPrescription(this.prescriptions[0])
                    }
                })
            },
            fetchAppointments () {
                this.fetchPatientAppointments( this.$route.params.id).then((data) => {
                    this.appointments = data
                    if (this.appointments.length > 0) {
                        this.selectAppointment(this.appointments[0])
                    }
                })
            },
            fetchDiagnoses () {
                this.fetchPatientDiagnoses(this.$route.params.id).then((data) => {
                    this.diagnoses = data
                    if (this.diagnoses.length > 0) {
                        this.selectDiagnosis(this.diagnoses[0])
                    }
                })
            },
            selectDiagnosis(diagnosis) {
                this.selectedDiagnosis = diagnosis
            },
            selectPrescription(prescription) {
                this.selectedPrescription = prescription
            },
            selectAppointment(appointment) {
                this.selectedAppointment = appointment
            },
            ...mapActions('diagnosis', {
                fetchPatientDiagnoses: 'fetchPatientDiagnoses'
            }),
            ...mapActions('appointments', {
                fetchPatientAppointments: 'fetchPatientAppointments'
            }),
            ...mapActions('prescriptions', {
                fetchPatientPrescriptions: 'fetchPatientPrescriptions'
            })
        }
    }
</script>

<style lang="scss" scoped>
.q-item--active {
    background: $blue-grey-6;
    color: $grey-1;
    border-radius: 10px;

    .q-item__label, .q-icon {
        color: $grey-1;
    }
}
</style>
