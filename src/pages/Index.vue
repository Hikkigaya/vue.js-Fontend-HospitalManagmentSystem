<!--
  - Copyright (c) 2019 @ TylexTech. All rights reserved.
  -->

<template>
  <q-page>
      <div class="q-pa-md">
          <div class=" row card-row">
              <div class="card-col col-sm-12 col-md-4 col-lg-4 ">
                  <base-card
                    title="Appointments"
                    :count="25"
                    :icon="'perm_contact_calendar'"
                    :filters="appointmentFilter"
                    subheading="Today's appointments"
                    url="appointments_dashboard"
                  >
                      <template v-slot:filters>
                         <DateFilter @filterUpdated="appointmentFilterUpdated"></DateFilter>
                      </template>
                  </base-card>
              </div>
              <div class="card-col col-sm-12 col-md-4 col-lg-4 ">
                  <base-card
                          title="Medicine"
                          :count="25"
                          icon="fas fa-prescription-bottle-alt"
                          subheading="Total registered medicines"
                          url="medicines_dashboard"
                  >
                  </base-card>
              </div>
              <div class="card-col col-sm-12 col-md-4 col-lg-4 ">
                  <base-card
                          title="Test Results"
                          :count="25"
                          icon="fas fa-vials"
                          subheading="Awaiting Test Results"
                          url="medical-tests_dashboard"
                  ></base-card>
              </div>
              <div class="card-col col-sm-12 col-md-4 col-lg-4 ">
                  <base-card
                          hover
                          title="Total Patients"
                          :count="25"
                          icon="fas fa-user-injured"
                          subheading="Patients In Records"
                          url="patients_dashboard"
                          :filters="patientFilter"
                  >
                      <template v-slot:filters>
                          <simple-filter @selected="patientFilterSelectedHandler" :filters-option="patientFiltersOptions"></simple-filter>
                      </template>
                      <template v-slot:hover>
                          <div class="card-hover">
                              <q-btn @click="patientDialoge=!patientDialoge" color="primary" class="filter_btn" round icon="remove_red_eye">
                              </q-btn>
                              <q-dialog v-model="patientDialoge">
                                <q-card>
                                    <q-card-section>
                                        <div class="text-h6">Patients</div>
                                        <q-space />
                                    </q-card-section>
                                    <q-separator />
                                    <q-card-section>
                                        <patients-table :filters="patientTableFilter"></patients-table>
                                    </q-card-section>
                                    <q-separator />

                                    <q-card-actions align="right">
                                        <q-btn flat label="Close" color="primary" v-close-popup />
                                    </q-card-actions>
                                </q-card>
                              </q-dialog>
                          </div>
                      </template>

                  </base-card>
              </div>
          </div>
          <div class="row">

          </div>

      </div>
  </q-page>
</template>

<script>
import BaseCard from "../components/cards/BaseCard";
import DateFilter from "../components/cards/DateFilter";
import SimpleFilter from "../components/cards/SimpleFilter";
import PatientsTable from "../components/patients/PatientsTable";
export default {
    name: 'PageIndex',
    components: {PatientsTable, SimpleFilter, DateFilter, BaseCard},
    data(){
        return{
            patientDialoge:false,
            fabLeft:false,
            single:"",
            patientFiltersOptions:[
                {text:"All Patients",value:1},
                {text:"Open Diagnoses",value:2},
                {text:"Closed Diagnoses",value:3},
                {text:"Overdue Diagnoses",value:4}
            ],
            patientFilter:{

            },
            patientTableFilter:{

            },
            appointmentFilter:{
                date:null,
                date__lte:null,
                date__gte:null,
            }
        }
    },
    methods:{
        appointmentFilterUpdated(filter){
            this.appointmentFilter=filter
        },
        patientFilterSelectedHandler(filter){
            if(filter.value===1){
                this.patientFilter={}
                this.patientTableFilter={}
            }
            else if(filter.value===2){
                this.patientFilter={
                    appointment__status__code__in:['cancelled','completed']
                }
                this.patientTableFilter={
                    appointment__status__code__in:'cancelled,completed'
                }
            }
            else if(filter.value===3){
                this.patientFilter={
                    appointment__status__code__in:['Scheduled','Attended','Tests Result Awaiting']
                }
                this.patientTableFilter={
                    appointment__status__code__in:'Scheduled,Attended,Tests Result Awaiting'
                }
            }
        }
    },
    created() {
        this.appointmentFilter.date=this.$moment().format("YYYY-MM-DD")
    }
}
</script>

<style lang="sass" scoped>
    .card-row > .card-col
        padding: 10px 15px
    .card-row + .card-row
        margin-top: 1rem

    .filter_btn

        /*left: 100px!important*/
        /*right: 3px !important*/
        /*top: 3px !important*/
    .card-hover
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%,-50%)
</style>
