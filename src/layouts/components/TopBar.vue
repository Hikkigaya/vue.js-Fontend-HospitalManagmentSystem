<!--
  - Copyright (c) 2019 @ TylexTech. All rights reserved.
  -->

<template>
    <q-header elevated>
        <q-toolbar>
            <q-btn
                flat
                dense
                round
                @click="toggleLeftDrawer"
                icon="menu"
                aria-label="Menu"
            />

            <q-toolbar-title>
                Patient Management System
            </q-toolbar-title>

            <q-btn
                    color="primary"
                    label="Logout"
                    icon="logout"
                    @click="logout"
            >
            </q-btn>
        </q-toolbar>
    </q-header>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'

    export default {
        name: 'TopBar',
        computed: {
            ...mapGetters('user', {
                userModel: 'getLoggedInUser'
            })
        },
        methods: {
            logout() {
                this.$TylexApp.$removeLoggedInUser()
                this.$TylexApp.$removeToken()
                this.$router.push({
                    name: 'login'
                })
            },
            ...mapMutations('app', {
                toggleLeftDrawer: 'toggleLeftDrawer'
            })
        }
    }
</script>

<style scoped>

</style>
