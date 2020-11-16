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
                    <div class="text-h6">{{ isEdit ? 'Edit Medicine' : 'Add Medicine' }}</div>
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
                            label="Medicine name"
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
                            label="Medicine Description"
                    >
                    </q-input>

                    <div class="row">
                        <div class="col-sm-10 col-md-10 col-lg-10">
                            <q-select
                                    v-model="form.company_id"
                                    clearable
                                    outlined
                                    name="company_id"
                                    use-input
                                    input-debounce="0"
                                    emit-value
                                    map-options
                                    @filter="filterCompany"
                                    :options="companies"
                                    :error="form.errors.has('company_id')"
                                    :error-message="form.getError('company_id')"
                                    label="Company"
                            />
                        </div>

                        <div class="col-sm-2 col-md-2 col-lg-2">
                            <q-btn
                                type="button"
                                icon="add"
                                color="primary"
                                class="q-mt-sm q-ml-lg"
                                @click="openCompanyDialog = true"
                            >
                            </q-btn>
                        </div>
                    </div>
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

        <create-or-edit-company-dialog
                :is-edit="false"
                :open-dialog="openCompanyDialog"
                @companyAddedOrUpdated="companySaveCompleted"
                @closePopup="closeAddOrEditDialog"
        />
    </q-dialog>
</template>

<script>
    import Form from 'src/utils/form/Form'
    import { mapActions, mapGetters} from 'vuex'
    import CreateOrEditCompanyDialog from 'src/components/compnaies/CreateOrEditDialog'

    export default {
        name: 'CreateOrEditDialog',
        props: [
            'isEdit',
            'medicine',
            'openDialog'
        ],
        components: {
            CreateOrEditCompanyDialog
        },
        data() {
            return {
                form: new Form({
                    name: '',
                    description: '',
                    company_id: null,
                    medical_name: {
                        id: null,
                        name: '',
                        description: ''
                    },
                }),
                companies: [],
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
            },
            ...mapGetters('companies', {
                    companiesList: 'getCompaniesSelectValues'
            })
        },
        watch: {
            isEdit(newVal) {
                this.editMode()
            }
        },
        mounted () {
            this.getAllCompanies().then(
                () => {
                    this.companies = this.companiesList
                }
            )
        },
        methods: {
            editMode() {
                if (this.medicine) {
                    this.form.name = this.medicine.name
                    this.form.company_id = this.medicine.company.id
                    this.form.description = this.medicine.description
                    this.form.medical_name.id = this.medicine.medical_name? this.medicine.medical_name.id : ''
                    this.form.medical_name.name = this.medicine.medical_name? this.medicine.medical_name.name : ''
                    this.form.medical_name.description = this.medicine.medical_name? this.medicine.medical_name.description : ''
                    this.editId = this.medicine.id
                }
            },
            save() {
                if (!this.isEdit) {
                    this.$TylexApp.$showLoading('Creating Medicine...')

                    this.form.submit('post', this.$TylexApp.$getRoutePath('medicines_create')).then((data) => {
                        this.$TylexApp.$notifySuccess('Medicine created successfully...')
                        this.$TylexApp.$hideLoading()
                        this.$emit('medicineAddedOrUpdated')
                    }).catch((error) => {
                        if (error.status === 400) {
                            this.$TylexApp.$notifyError('There are some errors with inputs.')
                        }

                        this.$TylexApp.$hideLoading()
                    })
                }
                else {
                    this.$TylexApp.$showLoading('Updating Medicine...')

                    this.form.submit('patch', this.$TylexApp.$getRoutePath('medicines_partial_update', [this.editId])).then((data) => {
                        this.$TylexApp.$notifySuccess('Medicine updated successfully...')
                        this.$TylexApp.$hideLoading()
                        this.$emit('medicineAddedOrUpdated')
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
            },
            filterCompany(val, update) {
                if (val === '') {
                    update(() => {
                        this.companies = this.companiesList
                    })
                    return
                }

                update(() => {
                    const needle = val.toLowerCase()
                    this.companies = this.companiesList.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
                })
            },
            editCompany(props) {
                this.openCompanyDialog = true
            },
            companySaveCompleted() {
                this.getAllCompanies()
                this.closeAddOrEditDialog()
            },
            closeAddOrEditDialog() {
                this.openCompanyDialog = false
            },
            ...mapActions('companies', {
                getAllCompanies: 'getAllCompanies'
            })
        }
    }
</script>

<style scoped>

</style>
