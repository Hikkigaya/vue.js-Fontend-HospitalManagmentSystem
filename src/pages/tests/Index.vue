<template>
    <q-page padding>
        <q-table
                dense
                row-key="id"
                :data="tests"
                :columns="columns"
                :pagination.sync="pagination"
                :filter="filter"
                :loading="loading"
                @request="fetchTests"
        >
            <template v-slot:top-left>
                <q-btn-group push>
                    <q-btn
                            dark
                            push
                            icon="add"
                            color="primary"
                            label="Add Test"
                            @click="openDialog = true"
                    />
                </q-btn-group>
            </template>

            <template v-slot:body-cell-actions="props">
                <q-td>
                    <q-btn
                            flat
                            round
                            icon="far fa-edit"
                            color="primary"
                            @click="editTest(props)"
                    >
                    </q-btn>
                    <q-btn
                            flat
                            round
                            icon="far fa-trash-alt"
                            color="negative"
                            @click="onDeleteClick(props)"
                    >
                    </q-btn>
                </q-td>
            </template>

            <template v-slot:top-right>
                <q-input
                        dense
                        borderless
                        debounce="300"
                        v-model="filter"
                        placeholder="Search"
                >
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>

        </q-table>

        <create-or-edit-dialogue
            :open-dialog="openDialog"
            :is-edit="isEdit"
            :test="editItem"
            @testAddedOrUpdated="testSaveCompleted"
            @closePopUp="closePopUp"
        >
        </create-or-edit-dialogue>
    </q-page>
</template>

<script>
    import Form from 'src/utils/form/Form'
    import CreateOrEditDialogue from 'src/components/tests/CreateOrEditDialogue'
    export default {
        name: "Index",
        components: {CreateOrEditDialogue},
        data(){
            return{

                openDialog: false,
                isEdit: false,
                editItem: null,

                loading: false,
                filter: '',

                form: new Form({

                }),

                pagination: {
                    rowsNumber: 0,
                    page: 1,
                    rowsPerPage: 10
                },

                tests: [],
                columns: [
                    {
                       name: 'name',
                       label: 'Name',
                       field: 'name',
                       sortable: true,
                       align: 'left'
                   },
                    {
                       name: 'description',
                       label: 'Description',
                       field: 'description',
                       sortable: true,
                       align: 'left'
                   },
                    {
                        name: 'actions',
                        label: 'Actions',
                        align: 'left'
                    },
                ],
            }
        },
        mounted () {
            this.fetchTests()
        },
        methods:{
            fetchTests (props) {
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
                    q: props ? props.filter : ''
                }
                this.$TylexApp.request().get(this.$TylexApp.$getRoutePath('medical-tests_list'), {
                    params: params
                })
                    .then(response => {
                        const tests = response.data
                        this.tests = tests.results


                        if (typeof props === 'undefined') {
                            this.pagination = {
                                rowsNumber: tests.count,
                                page: tests.page,
                                rowsPerPage: tests.rowsPerPage
                            }
                        } else {
                            this.pagination = {
                                rowsNumber: tests.count,
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
            editTest(props){
                this.openDialog = true
                this.isEdit = true
                this.editItem = props.row
            },
            closePopUp(){
                this.openDialog = false
                this.isEdit = false
                this.editItem = null
            },
            onDeleteClick (props) {
                this.$q.dialog({
                    title: 'Are you sure?',
                    message: 'Are you sure you want to delete this item?',
                    ok: {
                        push: true,
                        color: 'negative',
                        label: 'Yes'
                    },
                    cancel: {
                        push: true,
                        color: 'positive'
                    },
                }).onOk(() => {
                    this.$TylexApp.$showLoading('Deleting Test...')
                    this.form.delete(this.$TylexApp.$getRoutePath('medical-tests_delete', [props.row.id])).then(
                        () => {
                            this.$TylexApp.$notifySuccess('Test deleted successfully...')
                            this.fetchTests()
                            this.$TylexApp.$hideLoading()
                        }
                    ).catch(error => {
                        this.$TylexApp.$notifyError('There was a error in deleting the item! Please try again.')
                        this.$TylexApp.$hideLoading()
                    })
                })
            },
            testSaveCompleted() {
                this.fetchTests()
                this.closePopUp()
            }
        }
    }
</script>

<style scoped>

</style>