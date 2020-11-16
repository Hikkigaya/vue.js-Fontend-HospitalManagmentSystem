<!--
  - Copyright (c) 2019 @ TylexTech. All rights reserved.
  -->

<template>
    <q-dialog
            v-model="openDialogValue"
            @hide="onDialogHide"
            persistent
    >
        <q-card style="width: 700px; max-width: 80vw;">
            <q-form
                    @submit="save"
                    @keydown="form.clearFormErrorAtField($event)"
            >

                <q-card-section class="row items-center">
                    <div class="text-h6">{{ isEdit ? 'Edit Disease' : 'Add Disease' }}</div>
                    <q-space />
                    <q-btn type="button" icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section>
                    <q-input
                            v-model="form.name"
                            autofocus
                            clearable
                            outlined
                            name="name"
                            :error="form.errors.has('name')"
                            :error-message="form.getError('name')"
                            label="Disease name"
                    >
                    </q-input>

                    <q-input
                            v-model="form.description"
                            clearable
                            outlined
                            type="textarea"
                            name="description"
                            :error="form.errors.has('description')"
                            :error-message="form.getError('description')"
                            label="Disease Description"
                    >
                    </q-input>
                </q-card-section>

                <q-card-section>
                    <q-input
                            v-model="form.medical_name.name"
                            autofocus
                            clearable
                            outlined
                            name="medical_name.name"
                            :error="form.errors.has('medical_name.name')"
                            :error-message="form.getError('medical_name.name')"
                            label="Medical name"
                    >
                    </q-input>

                    <q-input
                            v-model="form.medical_name.description"
                            clearable
                            outlined
                            type="textarea"
                            name="medical_name.description"
                            :error="form.errors.has('medical_name.description')"
                            :error-message="form.getError('medical_name.description')"
                            label="Medical Name Description"
                    >
                    </q-input>
                </q-card-section>

                <q-card-actions class="bg-white text-teal">
                    <q-btn label="Cancel" icon="far fa-times-circle" color="negative" @click="$emit('closePopup')" />
                    <q-space></q-space>
                    <q-btn label="Save" class="float-right" icon="far fa-save" type="submit" color="positive" />
                </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script>
    import Form from 'src/utils/form/Form'
    import { mapActions, mapGetters} from 'vuex'

    export default {
        name: 'CreateOrEditDialog',
        props: [
            'isEdit',
            'disease',
            'openDialog'
        ],
        components: {

        },
        data() {
            return {
                form: new Form({
                    name: '',
                    description: '',
                    medical_name: {
                        name: '',
                        description: ''
                    },
                }),
                loading: false,
                editId: null,
                openCompanyDialog: false
            }
        },
        computed: {
            openDialogValue: {
                set(newVal) {
                    if (!newVal) {
                        this.$emit('closePopup')
                    }
                },
                get() {
                    return this.openDialog
                }
            }
        },
        watch: {
            isEdit(newVal) {
                this.editMode()
            }
        },
        mounted () {

        },
        methods: {
            editMode() {
                if (this.disease) {
                    this.form.name = this.disease.name
                    this.form.description = this.disease.description
                    this.form.medical_name.name = this.disease.medical_name? this.disease.medical_name.name : ''
                    this.form.medical_name.description = this.disease.medical_name? this.disease.medical_name.description : ''
                    this.editId = this.disease.id
                }
            },
            save() {
                if (!this.isEdit) {
                    this.$TylexApp.$showLoading('Creating Disease...')

                    this.form.submit('post', this.$TylexApp.$getRoutePath('diseases_create')).then((data) => {
                        this.$TylexApp.$notifySuccess('Disease created successfully...')
                        this.$TylexApp.$hideLoading()
                        this.$emit('diseaseAddedOrUpdated')
                    }).catch((error) => {
                        if (error.status === 400) {
                            this.$TylexApp.$notifyError('There are some errors with inputs.')
                        }

                        this.$TylexApp.$hideLoading()
                    })
                }
                else {
                    this.$TylexApp.$showLoading('Updating Disease...')

                    this.form.submit('patch', this.$TylexApp.$getRoutePath('diseases_partial_update', [this.editId])).then((data) => {
                        this.$TylexApp.$notifySuccess('Disease updated successfully...')
                        this.$TylexApp.$hideLoading()
                        this.$emit('diseaseAddedOrUpdated')
                    }).catch((error) => {
                        if (error.status === 400) {
                            this.$TylexApp.$notifyError('There are some errors with inputs.')
                        }

                        this.$TylexApp.$hideLoading()
                    })
                }
            },
            onDialogHide() {
                this.form.reset()
                this.editId = null
            }
        }
    }
</script>

<style scoped>

</style>
