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
                    <div class="text-h6">{{ isEdit ? 'Edit Company' : 'Add Company' }}</div>
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
                            label="Company name"
                    >
                    </q-input>

                    <q-input
                            v-model="form.address"
                            clearable
                            outlined
                            name="address"
                            :error="form.errors.has('address')"
                            :error-message="form.getError('address')"
                            label="Company Address"
                    >
                    </q-input>

                    <q-input
                            v-model="form.phone"
                            clearable
                            outlined
                            name="phone"
                            :error="form.errors.has('phone')"
                            :error-message="form.getError('phone')"
                            label="Phone Number"
                    >
                    </q-input>

                    <div class="row">
                        <div class="col-sm-10 col-md-10 col-lg-10">
                            <q-select
                                    v-model="form.type_id"
                                    clearable
                                    outlined
                                    name="type_id"
                                    emit-value
                                    map-options
                                    use-input
                                    input-debounce="0"
                                    @filter="filterCompanyTypes"
                                    :options="companyTypes"
                                    :error="form.errors.has('type_id')"
                                    :error-message="form.getError('type_id')"
                                    label="Company Type"
                            />
                        </div>

                        <div class="col-sm-2 col-md-2 col-lg-2">
                            <q-btn
                                type="button"
                                icon="add"
                                color="primary"
                                class="q-mt-sm q-ml-lg"
                                @click="openCompanyTypeDialog = true"
                            >
                            </q-btn>
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

        <create-or-edit-company-type-dialog
                :is-edit="false"
                :open-dialog="openCompanyTypeDialog"
                @companyTypeAddedOrUpdated="companyTypeSaveCompleted"
                @closePopup="closeAddOrEditDialog"
        />
    </q-dialog>
</template>

<script>
    import Form from 'src/utils/form/Form'
    import { mapActions, mapGetters} from 'vuex'
    import CreateOrEditCompanyTypeDialog from 'src/components/compnaies/types/CreateOrEditDialog'

    export default {
        name: 'CreateOrEditDialog',
        props: [
            'isEdit',
            'company',
            'openDialog'
        ],
        components: {
            CreateOrEditCompanyTypeDialog
        },
        data() {
            return {
                form: new Form({
                    name: '',
                    phone: '',
                    address: '',
                    type_id: null
                }),
                companyTypes: [],
                loading: false,
                editId: null,
                openCompanyTypeDialog: false
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
                    companyTypesList: 'getCompanyTypesSelectValues'
            })
        },
        watch: {
            isEdit(newVal) {
                this.editMode()
            }
        },
        mounted () {
            this.getAllCompanyTypes().then(()=>
            {
                this.companyTypes = this.companyTypesList
            })
        },
        methods: {
            editMode() {
                if (this.company) {
                    this.form.name = this.company.name
                    this.form.phone = this.company.phone
                    this.form.address = this.company.address
                    this.form.type_id = this.company.type.id
                    this.editId = this.company.id
                }
            },
            save() {
                if (!this.isEdit) {
                    this.$TylexApp.$showLoading('Creating Company...')

                    this.form.submit('post', this.$TylexApp.$getRoutePath('companies_create')).then((data) => {
                        this.$TylexApp.$notifySuccess('Company created successfully...')
                        this.$TylexApp.$hideLoading()
                        this.$emit('companyAddedOrUpdated')
                    }).catch((error) => {
                        if (error.status === 400) {
                            this.$TylexApp.$notifyError('There are some errors with inputs.')
                        }

                        this.$TylexApp.$hideLoading()
                    })
                }
                else {
                    this.$TylexApp.$showLoading('Updating Company...')

                    this.form.submit('patch', this.$TylexApp.$getRoutePath('companies_partial_update', [this.editId])).then((data) => {
                        this.$TylexApp.$notifySuccess('Company updated successfully...')
                        this.$TylexApp.$hideLoading()
                        this.$emit('companyAddedOrUpdated')
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
            filterCompanyTypes(val, update) {
                if (val === '') {
                    update(() => {
                        this.companyTypes = this.companyTypesList
                    })
                    return
                }

                update(() => {
                    const needle = val.toLowerCase()
                    this.companyTypes = this.companyTypesList.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
                })
            },
            editCompanyType(props) {
                this.openCompanyTypeDialog = true
            },
            companyTypeSaveCompleted() {
                this.getAllCompanyTypes()
                this.closeAddOrEditDialog()
            },
            closeAddOrEditDialog() {
                this.openCompanyTypeDialog = false
            },
            ...mapActions('companies', {
                getAllCompanyTypes: 'getAllCompanyTypes'
            })
        }
    }
</script>

<style scoped>

</style>
