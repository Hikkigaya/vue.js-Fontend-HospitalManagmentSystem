<template>
    <q-page padding>
        <div class="row">
            <div class="col-12">
                <q-stepper v-model="step" animated>
                    <q-step
                            :name="1"
                            title="Diagnosis"
                            icon="fas fa-diagnoses"
                            :done="step > 1"
                    >
                        <div class="col">
                            <q-form>
                                <q-card-section>
<!--                                    <q-field>-->
<!--                                        <div class="self-center full-width no-outline" tabindex="0">-->
<!--                                            <h5>Diagnosis</h5>-->
<!--                                        </div>-->
<!--                                    </q-field>-->
                                    <q-field dense borderless prefix="Patient Name: ">
                                        <div class="self-center full-width no-outline" tabindex="0">
                                            {{this.appointment? this.appointment.patient.name : null}}
                                        </div>
                                    </q-field>
                                    <q-field dense borderless prefix="Patient Contact: ">
                                        <div class="self-center full-width no-outline" tabindex="0">
                                            {{this.appointment? this.appointment.patient.phone : null}}
                                        </div>
                                    </q-field>
                                    <q-select
                                            outlined
                                            emit-value
                                            map-options
                                            multiple
                                            v-model="form.disease_ids"
                                            :options="diseasesOptions"
                                            label="Diagnosed Ailment"
                                            :error="form.errors.has('disease_id')"
                                            :error-message="form.getError('disease_id')"
                                    />
                                    <q-input
                                            clearable
                                            outlined
                                            v-model="form.note"
                                            type="textarea"
                                            :error="form.errors.has('note')"
                                            :error-message="form.getError('note')"
                                            label="Diagnosis Note"
                                    >
                                    </q-input>
                                    <q-select
                                            outlined
                                            emit-value
                                            map-options
                                            v-model="form.status_id"
                                            :options="diagnosisStatuses"
                                            label="Diagnosis Status"
                                            :error="form.errors.has('status_id')"
                                            :error-message="form.getError('status_id')"
                                    />
                                </q-card-section>
                                <!--                                <q-card-actions class="bg-white text-teal">-->
                                <!--                                    -->
                                <!--                                </q-card-actions>-->
                            </q-form>
                        </div>

                        <q-stepper-navigation>

                            <q-btn @click="step = 2" color="primary" class="q-ml-sm q-mr-lg" label="Continue"/>
                            <q-btn
                                    label="Save"
                                    icon="far fa-save"
                                    color="primary"
                                    @click="saveDiagnosis"
                            />
                        </q-stepper-navigation>
                    </q-step>

                    <q-step
                            :name="2"
                            title="Prescription"
                            icon="fas fa-prescription"
                            :done="step > 2"
                    >
                        <div class="col">
                            <q-form>
                                <q-card-section>
<!--                                    <q-field>-->
<!--                                        <div class="self-center full-width no-outline" tabindex="0">-->
<!--                                            <h5>Prescription</h5>-->
<!--                                        </div>-->
<!--                                    </q-field>-->
                                    <q-field dense borderless prefix="Patient Name: ">
                                        <div class="self-center full-width no-outline" tabindex="0">
                                            {{this.appointment? this.appointment.patient.name : null}}
                                        </div>
                                    </q-field>
                                    <q-field dense borderless prefix="Patient Contact: ">
                                        <div class="self-center full-width no-outline" tabindex="0">
                                            {{this.appointment? this.appointment.patient.phone : null}}
                                        </div>
                                    </q-field>
                                    <q-select
                                            outlined
                                            emit-value
                                            map-options
                                            multiple
                                            v-model="receipt_form.medicine_ids"
                                            :options="medicineOptions"
                                            label="Prescribed Medicines"
                                            :error="form.errors.has('medicine_ids')"
                                            :error-message="form.getError('medicine_ids')"
                                    />
                                    <q-select
                                            outlined
                                            emit-value
                                            map-options
                                            multiple
                                            v-model="receipt_form.test_ids"
                                            :options="testOptions"
                                            label="Prescribed Tests"
                                            :error="form.errors.has('test_ids')"
                                            :error-message="form.getError('test_ids')"
                                    />
                                    <q-input
                                            clearable
                                            outlined
                                            v-model="receipt_form.note"
                                            type="textarea"
                                            :error="form.errors.has('note')"
                                            :error-message="form.getError('note')"
                                            label="Prescription Note"
                                    >
                                    </q-input>
                                </q-card-section>
<!--                                <q-card-actions class="bg-white text-teal">-->
<!--                                    -->
<!--                                </q-card-actions>-->
                            </q-form>
                        </div>

                        <q-stepper-navigation>
                            <q-btn flat @click="step = 1" color="primary"  label="Back" class="q-ml-sm q-mr-lg"/>
                            <q-btn
                                    label="Save"
                                    icon="far fa-save"
                                    color="primary"
                                    @click="savePrescription"
                            />
                        </q-stepper-navigation>
                    </q-step>


                </q-stepper>
            </div>

        </div>
    </q-page>
</template>

<script>
    import Form from 'src/utils/form/Form'
    import ReceiptForm from 'src/utils/form/Form'
    import {mapGetters} from 'vuex'

    export default {
        name: "Index",
        props: [
            'id'
        ],
        data() {
            return {
                step: 1,
                form: new Form({
                    disease_ids: [],
                    note: '',
                    status_id: '',
                    appointment_id: this.id
                }),
                receipt_form: new Form({
                    medicine_ids: [],
                    test_ids: [],
                    diagnosis_id: [],
                    note: ''
                }),
                tests: [],
                diseases: [],
                medicines: [],
                appointment: null,
                all_diagnosis: []
            }
        },
        mounted() {
            this.fetchDiseases()
            this.fetchAppointment()
            // this.fetchAllDiagnosis()
            // console.log(this.fetchAllDiagnosis())
            this.fetchTests()
            this.fetchMedicines()
        },
        methods: {
            fetchTests() {
                this.$TylexApp.request().get(this.$TylexApp.$getRoutePath('medical-tests_all_list'))
                    .then(response => {
                        this.tests = response.data
                        this.loading = false
                    })
                    .catch(error => {
                        this.loading = false
                    })
            },
            fetchMedicines() {
                this.$TylexApp.request().get(this.$TylexApp.$getRoutePath('medicines_all_list'))
                    .then(response => {
                        this.medicines = response.data
                        this.loading = false
                    })
                    .catch(error => {
                        this.loading = false
                    })
            },
            fetchDiseases() {
                this.$TylexApp.request().get(this.$TylexApp.$getRoutePath('diseases_all_list'))
                    .then(response => {
                        this.diseases = response.data
                        this.loading = false
                    })
                    .catch(error => {
                        this.loading = false
                    })
            },
            fetchAppointment() {
                this.$TylexApp.request().get(this.$TylexApp.$getRoutePath('appointments_read', [this.id]))
                    .then(response => {
                        this.appointment = response.data
                        this.loading = false
                    })
                    .catch(error => {
                        this.loading = false
                    })
            },
            fetchAllDiagnosis() {
                this.$TylexApp.request().get(this.$TylexApp.$getRoutePath('patient_diagnosis_all_list', [this.id]))
                    .then(response => {
                        this.all_diagnosis = response.data
                        this.loading = false
                    })
                    .catch(error => {
                        this.loading = false
                    })
            },
            saveDiagnosis() {
                this.$TylexApp.$showLoading('Creating Diagnosis...')
                this.form.submit('post', this.$TylexApp.$getRoutePath('diagnosis_create'))
                    .then((data) => {
                        this.$TylexApp.$notifySuccess('Diagnosis created successfully...')
                        this.$TylexApp.$hideLoading()
                        this.receipt_form.diagnosis_id = data.id
                    })
                    .catch((error) => {
                        if (error.status === 400) {
                            this.$TylexApp.$notifyError('There are some errors with inputs.')
                        }

                        this.$TylexApp.$hideLoading()
                    })
            },
            savePrescription() {
                this.$TylexApp.$showLoading('Creating Prescription...')
                this.receipt_form.submit('post', this.$TylexApp.$getRoutePath('prescriptions_create'))
                    .then((data) => {
                        this.$TylexApp.$notifySuccess('Prescription created successfully...')
                        this.$TylexApp.$hideLoading()

                    })
                    .catch((error) => {
                        if (error.status === 400) {
                            this.$TylexApp.$notifyError('There are some errors with inputs.')
                        }

                        this.$TylexApp.$hideLoading()
                    })
            }
        },
        computed: {
            diseasesOptions: {
                get() {
                    if (this.diseases && this.diseases.length > 0) {
                        return this.diseases.map((diseasesOptions) => {
                            return {
                                label: diseasesOptions.name,
                                value: diseasesOptions.id
                            }
                        })
                    } else {
                        return []
                    }
                }
            },
            testOptions: {
                get() {
                    if (this.tests && this.tests.length > 0) {
                        return this.tests.map((testOptions) => {
                            return {
                                label: testOptions.name,
                                value: testOptions.id
                            }
                        })
                    } else {
                        return []
                    }
                }
            },
            medicineOptions: {
                get() {
                    if (this.medicines && this.medicines.length > 0) {
                        return this.medicines.map((medicineOptions) => {
                            return {
                                label: medicineOptions.name,
                                value: medicineOptions.id
                            }
                        })
                    } else {
                        return []
                    }
                }
            },
            diagnosisStatuses: {
                get() {
                    if (this.getDiagnosisStatuses && this.getDiagnosisStatuses.length > 0) {
                        return this.getDiagnosisStatuses.map((diagnosisStatuses) => {
                            return {
                                label: diagnosisStatuses.name,
                                value: diagnosisStatuses.id,
                                description: diagnosisStatuses.description
                            }
                        })
                    } else {
                        return []
                    }
                }
            },
            ...mapGetters('diagnosis', {
                getDiagnosisStatuses: 'getDiagnosisStatuses',
            })
        }
    }
</script>

<style scoped>

</style>
