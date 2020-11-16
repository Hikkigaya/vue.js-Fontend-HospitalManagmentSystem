<template>
   <div>
       <q-table
               dense
               row-key="id"
               :data="testresults"
               :columns="columns"
               :pagination.sync="pagination"
               :filter="filter"
               :loading="loading"
               @request="fetchTests"
       >
           <template v-slot:body-cell-result="{row}">
               <q-td>
                   <div  v-html="row.result?row.result:'No Results are provided'"></div>
                   <q-popup-edit v-model="row.result" buttons @save="saveResult(row)">
                       <q-editor v-model="row.result"
                                 min-height="5rem"
                                 autofocus
                                 @keyup.enter.stop/>
                   </q-popup-edit>
               </q-td>
           </template>
           <template v-slot:body-cell-image="{row}">
               <q-td>
                   <q-file  filled  bottom-slots @input="saveImage(row,$event)"  label="Picture" counter max-files="1">
                       <template v-slot:before>
                           <q-avatar @click="showImage(row)" v-if="row.image">
                               <img  :src="row.image">
                           </q-avatar>
                       </template>


                       <template v-slot:hint>
                           Field hint
                       </template>
                   </q-file>
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
       <q-dialog v-model="imageModel">
           <q-card >
                   <img  :src="currentImage"/>
           </q-card>
       </q-dialog>
   </div>
</template>

<script>
    import Form from "../../utils/form";

    export default {
        name: "TestsTable",
        props: {
            filters: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                currentImage:"",
                imageModel:false,
                pagination: {
                    rowsNumber: 0,
                    page: 1,
                    rowsPerPage: 10
                },

                filter: '',
                loading: false,
                testresults: [],

                columns: [
                    {
                        name: 'id',
                        label: 'Id',
                        field: 'id',
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'patient_name',
                        label: 'Patient Name',
                        field: row => {
                            return row.test ? row.patient.name : ''
                        },
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'name',
                        label: 'Test Name',
                        field: row => {
                            return row.test ? row.test.name : ''
                        },
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'result',
                        label: 'Result',
                        field: row => {
                            return row.result ? row.result : 'No Result Provided'
                        },
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'image',
                        label: 'Image',
                        field: row => {
                            return row.image ? row.result : 'No Image provided'
                        },
                        sortable: true,
                        align: 'left'
                    },
                    {
                        name: 'date',
                        label: 'Date',
                        field: "created_at",
                        sortable: true,
                        align: 'left'
                    },
                ],

                openDialog: false,
                isEdit: false,
                editItem: null,

            }
        },
        watch: {
            "filters"() {
                this.fetchTests()
            }
        },
        methods: {
            showImage(row){
                this.currentImage=row.image
                this.imageModel=true
            },
            saveImage(row,event){
                let data=new FormData();
                data.append('image',event);
                data.append('_method', 'PATCH');
                this.$TylexApp.request().patch(this.$TylexApp.$getRoutePath('medical-tests-results_patch', {id: row.id}),data)
                    .then(response => {
                        row.image=response.data.image
                    })
                    .catch(error => {
                        this.loading = false
                    })
            },
            saveResult(row) {
                this.$TylexApp.request().patch(this.$TylexApp.$getRoutePath('medical-tests-results_patch', {id: row.id}), {
                    result: row.result
                })
                    .then(response => {

                    })
                    .catch(error => {
                        this.loading = false
                    })
            },
            fetchTests(props) {
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
                    q: props ? props.filter : '',
                    ...this.filters
                }

                this.$TylexApp.request().get(this.$TylexApp.$getRoutePath('medical-tests-results_all'), {
                    params: params
                })
                    .then(response => {
                        const patients = response.data
                        this.testresults = patients.results


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
        },
        mounted() {
            this.fetchTests()
        },
    }
</script>

<style scoped>
.image_dialog{
    width: 250px;
    height: 50%;
}
</style>
