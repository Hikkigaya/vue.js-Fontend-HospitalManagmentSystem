<!--
  - Copyright (c) 2020 @ TylexTech. All rights reserved.
  -->

<template>
    <div>
        <template v-if="navItem.children.length === 0">
            <q-item dense
                    v-if="userRoutesApi.hasAnyPermission(navItem.permissions)"
                    clickable
                    :to="{name: navItem.route}"
                    :exact="navItem.exact"
            >
                <q-item-section avatar>
                    <q-icon round  :name="navItem.icon"/>
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ navItem.title }}</q-item-label>
                </q-item-section>
            </q-item>
        </template>

        <template v-else>
            <q-expansion-item
                    v-if="userRoutesApi.hasAnyPermission(navItem.permissions)"
                    :icon="navItem.icon"
                    :label="navItem.title"
                    :content-inset-level=".2"
            >
                <template v-for="(navChild, childIndex) in navItem.children">
                    <navigation-routes
                            :nav-item="navChild"
                            :key="childIndex"
                    />
                </template>
            </q-expansion-item>
        </template>
    </div>
</template>

<script>
    import UserRoutes from 'src/utils/routes/UserRoutes'
    import {mapGetters} from 'vuex'

    export default {
        name: 'NavigationRoutes',
        props: [
            'navItem'
        ],
        data() {
            return {
                userRoutesApi: UserRoutes()
            }
        },
        computed: {
            ...mapGetters('user', {
                getLoggedInUser: 'getLoggedInUser'
            })
        }
    }
</script>

<style scoped>

</style>
