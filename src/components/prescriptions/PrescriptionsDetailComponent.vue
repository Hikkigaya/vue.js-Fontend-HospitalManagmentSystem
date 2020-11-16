<!--
  - Copyright (c) 2020 @ TylexTech. All rights reserved.
  -->

<template>
    <div v-if="prescription">
        <q-card-section>
            <div class="row">
                <div class="col-sm-8 col-md-8 col-lg-9">
                    <div class="text-h6">{{ prescription.diagnosis.appointment.patient.name }}</div>
                </div>

                <div class="col-sm-4 col-md-4 col-lg-3">
                    <div class="text-subtitle2">{{ $moment(prescription.created_at).format('DD MMM, YYYY') }}</div>
                </div>
            </div>

            <q-separator/>

            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 q-pt-lg">
                    {{ prescription.note }}
                </div>
            </div>
        </q-card-section>

        <q-card-section v-if="prescription.medicines.length > 0">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="text-h5">Medicines</div>
                </div>

                <div class="col-sm-12 col-md-12 col-lg-12">
                    <q-list
                            class="q-pa-sm q-ma-lg"
                            bordered
                            separator
                    >
                        <q-item
                                v-for="medicine in prescription.medicines"
                                :key="medicine.id"
                                clickable
                                v-ripple
                        >
                            <q-item-section>{{ medicine.name }}</q-item-section>
                        </q-item>
                    </q-list>
                </div>
            </div>

        </q-card-section>

        <q-card-section v-if="prescription.tests.length > 0">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="text-h5">Medical Tests</div>
                </div>

                <div class="col-sm-12 col-md-12 col-lg-12">
                    <q-list
                            class="q-pa-sm q-ma-lg"
                            bordered
                            separator
                    >
                        <q-item
                                v-for="test in prescription.tests"
                                :key="test.id"
                                clickable
                                v-ripple
                        >
                            <q-item-section>{{ test.name }}</q-item-section>
                        </q-item>
                    </q-list>
                </div>
            </div>

        </q-card-section>

        <q-card-section>
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="text-h5">Details</div>
                </div>

                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="row">
                        <div class="col-sm-6 col-md-6 col-lg-6">
                            <div class="row">
                                <div class="col-sm-6 col-md-6 col-lg-6">
                                    Doctor:
                                </div>

                                <div class="col-sm-6 col-md-6 col-lg-6">
                                    {{ prescription.diagnosis.appointment.doctor.name }}
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-6 col-lg-6">
                            <div class="row">
                                <div class="col-sm-6 col-md-6 col-lg-6">
                                    Appointment Date:
                                </div>

                                <div class="col-sm-6 col-md-6 col-lg-6">
                                    {{ $moment(prescription.diagnosis.appointment.date).format('DD MMM, YYYY')}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </q-card-section>

    </div>
</template>

<script>
    export default {
        name: 'PrescriptionsDetailComponent',
        props: [
            'prescription'
        ]
    }
</script>

<style scoped>

</style>
