<!--
  - Copyright (c) 2019 @ TylexTech. All rights reserved.
  -->

<template>
    <q-layout view="lHh Lpr lFr">
        <top-bar></top-bar>

        <left-drawer v-if="getLoggedInUser"></left-drawer>

        <q-page-container>
            <page-heading></page-heading>
            <router-view/>
        </q-page-container>
    </q-layout>
</template>

<script>
    import TopBar from 'src/layouts/components/TopBar'
    import LeftDrawer from 'src/layouts/components/LeftDrawer'
    import PageHeading from 'src/layouts/components/PageHeading'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: 'MyLayout',
        components: {
            LeftDrawer,
            TopBar,
            PageHeading
        },
        data () {
            return {
            }
        },
        computed: {
            ...mapGetters('user', {
                getLoggedInUser: 'getLoggedInUser'
            })
        },
        mounted () {
            this.$TylexApp.$getLoggedInUser().then(data => {
                this.initApp()
            })
        },
        methods: {
            ...mapActions('app', {
                initApp: 'initApp'
            })
        }
    }
</script>
