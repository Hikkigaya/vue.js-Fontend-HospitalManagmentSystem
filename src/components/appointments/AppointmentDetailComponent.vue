<!--
  - Copyright (c) 2020 @ TylexTech. All rights reserved.
  -->

<template>
    <div v-if="appointment">
        <q-card-section>
            <div class="row">
                <div class="col-sm-8 col-md-8 col-lg-9">
                    <div class="text-h6">{{ appointment.patient.name }}</div>
                </div>

                <div class="col-sm-4 col-md-4 col-lg-3">
                    <div class="text-subtitle2">{{ $moment(appointment.date).format('DD MMM, YYYY') }}</div>
                </div>
            </div>

            <q-separator/>

            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12 q-pt-lg">
                    {{ appointment.description }}
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
                                    {{ appointment.doctor.name }}
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-6 col-lg-6">
                            <div class="row">
                                <div class="col-sm-6 col-md-6 col-lg-6">
                                    Appointment Date:
                                </div>

                                <div class="col-sm-6 col-md-6 col-lg-6">
                                    {{ $moment(appointment.created_at).format('DD MMM, YYYY')}}
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
        name: 'AppointmentDetailComponent',
        props: [
            'appointment'
        ]
    }
</script>

<style scoped>

</style>
