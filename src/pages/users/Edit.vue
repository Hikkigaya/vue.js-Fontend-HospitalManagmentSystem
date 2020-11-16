<template>
    <q-page>
        <Form :is-edit="true"></Form>
    </q-page>
</template>

<script>
    import Form from 'src/components/users/Form'
    export default {
        components: {
            Form
        },
        name: "edit"
    }
</script>

<style scoped>

</style>