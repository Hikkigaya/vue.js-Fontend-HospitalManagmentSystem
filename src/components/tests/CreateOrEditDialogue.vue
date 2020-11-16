<template>
    <q-dialog
        v-model="dialogStatus"
        persistent
    >
        <q-card style="width: 700px; max-width: 80vw;">
            <q-form>
                <q-card-section class="row items-center">
                    <div class="text-h6">{{ isEdit ? 'Edit Test' : 'Add Test' }}</div>
                    <q-space />
                    <q-btn type="button" icon="close" flat round dense v-close-popup/>
                </q-card-section>

                <q-card-section >
                    <q-input
                            v-model="form.name"
                            autofocus
                            clearable
                            outlined
                            label="Test Name"
                            :error="form.errors.has('name')"
                            :error-message="form.getError('name')"
                    >
                    </q-input>
                    <q-input
                            v-model="form.description"
                            clearable
                            outlined
                            label="Test Description"
                    >
                    </q-input>
                </q-card-section>

                <q-card-actions class="bg-white text-teal">
                    <q-btn  label="Cancel" icon="far fa-times-circle" color="negative" v-close-popup @click="$emit('closePopUp')" />
                    <q-space />
                    <q-btn label="Save" icon="far fa-save" color="primary" @click="save"/>
                </q-card-actions>

            </q-form>
        </q-card>
    </q-dialog>
</template>

<script>
    import Form from 'src/utils/form/Form'

    export default {
        name: "CreateOrEditDialogue",
        props: [
            'isEdit',
            'test',
            'openDialog'
        ],
        data(){
            return{
                form: new Form({
                    name: '',
                    description: ''
                }),
                editId: null
            }
        },
        watch: {
            isEdit(newVal) {
                this.editMode()
            }
        },
        methods: {
            save(){
                if(!this.isEdit){
                    this.$TylexApp.$showLoading('Creating Test...')

                    this.form.submit('post', this.$TylexApp.$getRoutePath('medical-tests_create')).then((data) => {
                        this.$TylexApp.$notifySuccess('Test created successfully...')
                        this.$TylexApp.$hideLoading()
                        this.$emit('testAddedOrUpdated')
                    }).catch((error) => {
                        if (error.status === 400) {
                            this.$TylexApp.$notifyError('There are some errors with inputs.')
                        }

                        this.$TylexApp.$hideLoading()
                    })
                }
                else{
                    this.$TylexApp.$showLoading('Updating Test...')

                    this.form.submit('patch', this.$TylexApp.$getRoutePath('medical-tests_partial_update', [this.editId])).then((data) => {
                        this.$TylexApp.$notifySuccess('Test updated successfully...')
                        this.$TylexApp.$hideLoading()
                        this.$emit('testAddedOrUpdated')
                    }).catch((error) => {
                        if (error.status === 400) {
                            this.$TylexApp.$notifyError('There are some errors with inputs.')
                        }

                        this.$TylexApp.$hideLoading()
                    })
                }
            },
            editMode() {
                if(this.test){
                    this.form.name = this.test.name
                    this.form.description= this.test.description
                    this.editId = this.test.id
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
        }

    }
</script>

<style scoped>

</style>
