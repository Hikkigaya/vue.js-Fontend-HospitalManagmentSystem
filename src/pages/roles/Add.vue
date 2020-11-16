<template>
    <q-page>
        <Form :is-edit="false"></Form>
    </q-page>
</template>

<script>
    import Form from 'src/components/groups/Form'
    export default {
        components: {
            Form
        },
        name: "add"
    }
</script>

<style scoped>

</style>
