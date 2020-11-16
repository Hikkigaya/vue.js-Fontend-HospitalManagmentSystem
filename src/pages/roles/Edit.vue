<template>
    <div>
        <group-form :is-edit="true"></group-form>
    </div>
</template>

<script>
    import GroupForm from 'src/components/groups/Form'

    export default {
        name: "Edit",
        components: {
            GroupForm
        }
    }
</script>

<style scoped>

</style>
