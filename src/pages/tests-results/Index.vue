<template>
    <q-page padding>
        <tests-table :filters="{result__isnull:true}"></tests-table>
    </q-page>
</template>

<script>
    import TestsTable from "../../components/tests/TestsTable";
    export default {
        name: 'Index',
        components: {TestsTable},
        data(){
            return{
                prescriptions: [],
            }
        },
        mounted() {
            this.fetchPrescriptions()
        },
        methods:{
            fetchPrescriptions(){
                this.$TylexApp.request().get(this.$TylexApp.$getRoutePath('prescriptions_all_list'))
                    .then(response => {
                        this.prescriptions = response.data
                        this.loading = false
                    })
                    .catch(error => {
                        this.loading = false
                    })
            },
        }
    }
</script>

<style scoped>

</style>
