<template>
    <q-dialog
            persistant
            v-model="dialogStatus"
    >
        <q-card style="width: 700px; max-width: 80vw;">
            <q-form>
                <q-card-section class="row items-center">
                    <div class="text-h6">{{ isEdit ? 'Edit Patient' : 'Add Patient' }}</div>
                    <q-space />
                    <q-btn
                            flat
                            round
                            dense
                            v-close-popup
                            type="button"
                            icon="close"
                    />
                </q-card-section>

                <q-card-section >
                    <q-input
                            autofocus
                            clearable
                            outlined
                            v-model="form.name"
                            label="Patient Name"
                            :error="form.errors.has('name')"
                            :error-message="form.getError('name')"
                    >
                    </q-input>
                    <q-input
                            clearable
                            outlined
                            v-model="form.phone"
                            label="Patient Phone Number"
                            hint=""
                            :error="form.errors.has('phone')"
                            :error-message="form.getError('phone')"
                    >
                    </q-input>
                    <q-input
                            clearable
                            outlined
                            v-model="form.address"
                            label="Patient Address"
                            hint=""
                    >
                    </q-input>
                    <q-input
                            clearable
                            outlined
                            v-model="form.age"
                            label="Patient Age"
                            hint=""
                    >
                    </q-input>
                    <q-input
                            disable
                            outlined
                            v-model="form.blood_type"
                            label="Patient Blood Type"
                            hint=""
                    >
                    </q-input>
                    <q-option-group
                            inline
                            v-model="form.blood_type"
                            :options="options"
                    >
                    </q-option-group>
                </q-card-section>

                <q-card-actions class="bg-white text-teal">
                    <q-btn
                            v-close-popup
                            label="Cancel"
                            icon="far fa-times-circle"
                            color="negative"
                            @click="$emit('closePopUp')"
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
    export default {
        name: "CreateOrEditDialog",

        props: [
            'isEdit',
            'patient',
            'openDialog'
        ],

        data(){
            return{
                form: new Form({
                    name: '',
                    phone: '',
                    address:'',
                    age: '',
                    blood_type: ''
                }),

                options: [
                    {
                        label: 'Unknown',
                        value: 'Unknown'
                    },
                    {
                        label: 'A+',
                        value: 'A+'
                    },
                    {
                        label: 'A-',
                        value: 'A-'
                    },
                    {
                        label: 'B+',
                        value: 'B+'
                    },
                    {
                        label: 'B-',
                        value: 'B-'
                    },
                    {
                        label: 'AB+',
                        value: 'AB+'
                    },
                    {
                        label: 'AB-',
                        value: 'AB-'
                    },
                    {
                        label: 'O+',
                        value: 'O+'
                    },
                    {
                        label: 'O-',
                        value: 'O-'
                    }

                ],

                editId: null
            }
        },

        methods:{
            save(){
                if(!this.isEdit){
                    this.$TylexApp.$showLoading('Creating Patient...')
                    this.form.submit('post', this.$TylexApp.$getRoutePath('patients_create')).then((data) => {
                        this.$TylexApp.$notifySuccess('Patient created successfully...')
                        this.$TylexApp.$hideLoading()
                        this.$emit('patientAddedOrUpdated')
                    }).catch((error) => {
                        if (error.status === 400) {
                            this.$TylexApp.$notifyError('There are some errors with inputs.')
                        }
                        this.$TylexApp.$hideLoading()
                    })
                }
                else{
                    this.$TylexApp.$showLoading('Updating Patient...')
                    this.form.submit('patch', this.$TylexApp.$getRoutePath('patients_partial_update', [this.editId])).then((data) => {
                        this.$TylexApp.$notifySuccess('Patient updated successfully...')
                        this.$TylexApp.$hideLoading()
                        this.$emit('patientAddedOrUpdated')
                    }).catch((error) => {
                        if (error.status === 400) {
                            this.$TylexApp.$notifyError('There are some errors with inputs.')
                        }
                        this.$TylexApp.$hideLoading()
                    })
                }
            },
            editMode() {
                if(this.patient){
                    this.form.name = this.patient.name
                    this.form.phone = this.patient.phone
                    this.form.address = this.patient.address
                    this.form.age = this.patient.age
                    this.form.blood_type = this.patient.blood_type
                    this.editId = this.patient.id
                }
            },
        },
        computed:{
            dialogStatus:{
                set(newVal){
                    if(!newVal){
                        this.$emit('closePopUp')
                    }
                },
                get(){
                    return this.openDialog
                }
            }
        },
        watch: {
            isEdit(newVal) {
                this.editMode()
            }
        }
    }
</script>

<style scoped>

</style>