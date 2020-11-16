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
                    <div class="text-h6">{{ isEdit ? 'Edit Company Type' : 'Add Company Type' }}</div>
                    <q-space />
                    <q-btn type="button" icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section>
                    <div class="row q-mb-md">
                        <div class="col-sm-12 col-md-12 col-lg-12">
                            <q-input
                                    v-model="form.name"
                                    autofocus
                                    outlined
                                    clearable
                                    name="name"
                                    :error="form.errors.has('name')"
                                    :error-message="form.getError('name')"
                                    label="Type name"
                            >
                            </q-input>
                        </div>
                    </div>
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
    import request  from 'src/utils/request'

    export default {
        name: 'CreateOrEditDialog',
        props: [
            'isEdit',
            'companyType',
            'openDialog'
        ],
        data() {
            return {
                form: new Form({
                    name: ''
                },{
                    http: request,
                }),
                loading: false,
                editId: null
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
                if (this.companyType) {
                    this.form.name = this.companyType.name
                    this.editId = this.companyType.id
                }
            },
            save() {
                if (!this.isEdit) {
                    this.$TylexApp.$showLoading('Creating Company Type...')

                    this.form.post(this.$TylexApp.$getRoutePath('companies_types_create')).then((data) => {
                        this.$TylexApp.$notifySuccess('Company Type created successfully...')
                        this.$TylexApp.$hideLoading()
                        this.$emit('companyTypeAddedOrUpdated')
                    }).catch((error) => {
                        if (error.status === 400) {
                            this.$TylexApp.$notifyError('There are some errors with inputs.')
                        }

                        this.$TylexApp.$hideLoading()
                    })
                }
                else {
                    this.$TylexApp.$showLoading('Updating Company Type...')

                    this.form.submit('patch', this.$TylexApp.$getRoutePath('companies_types_partial_update', [this.editId])).then((data) => {
                        this.$TylexApp.$notifySuccess('Company Type updated successfully...')
                        this.$TylexApp.$hideLoading()
                        this.$emit('companyTypeAddedOrUpdated')
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
