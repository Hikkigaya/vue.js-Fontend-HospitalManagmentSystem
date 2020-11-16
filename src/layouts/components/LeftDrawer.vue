<!--
  - Copyright (c) 2019 @ TylexTech. All rights reserved.
  -->

<template>
    <q-drawer
            v-model="leftDrawerOpen"
            show-if-above

            :mini="leftDrawerOpen && miniState"
            @click.capture="drawerClick"

            :width="200"
            :breakpoint="500"
            bordered
            content-class="bg-grey-2"
            elevated
    >
        <q-img class="" src="statics/avatar-background.png" style="height: 150px">
            <div class="absolute-bottom bg-transparent">
                <q-avatar size="56px" class="q-mb-sm">
                    <img :src="userModel && userModel.picture ? userModel.picture : 'statics/boy-avatar.png'">
                </q-avatar>
                <div class="text-weight-bolder">{{ userModel? userModel.name : '' }}</div>
<!--                <div>@rstoenescu</div>-->
            </div>
        </q-img>

        <q-list>

            <template v-for="(nav, index) in navItems">
                <navigation-routes
                        :nav-item="nav"
                        :key="index"
                />
            </template>

            <q-item class="desktop-only" clickable @click="drawer = !drawer">

                <q-item-section avatar >
                    <q-icon v-show="!drawer" name="fas fa-arrow-circle-right"/>
                    <q-icon v-show="drawer" name="fas fa-arrow-circle-left"/>
                </q-item-section>

                <q-item-section>
                    <q-item-label>Mini Mode</q-item-label>
                </q-item-section>

            </q-item>
<!--            <q-item :to="{name: 'roleEdit', }"></q-item>-->
        </q-list>
    </q-drawer>
</template>

<script>
    import { mapState, mapMutations, mapGetters } from 'vuex'
    import NAVS from 'src/utils/Nav/nav'
    import NavigationRoutes from 'src/layouts/components/NavigationRoutes'

    export default {
        name: 'LeftDrawer',
        components: {
            NavigationRoutes
        },
        data: function () {
            return {
                drawer: false,
                miniState: false,
                navItems: NAVS
            }
        },
        computed: {
            leftDrawerOpen: {
                get() { return this.leftDrawer },
                set() { this.toggleLeftDrawer() }
            },
            ...mapState('app', {
                leftDrawer: 'leftDrawerOpen'
            }),
            ...mapGetters('user', {
                userModel: 'getLoggedInUser'
            })
        },
        methods: {
            ...mapMutations('app', {
                toggleLeftDrawer: 'toggleLeftDrawer'
            }),
            // to_roles:function () {
            //     this.$router.push({ name: 'roles'})
            // },
            drawerClick (e) {
                // if in "mini" state and user
                // click on drawer, we switch it to "normal" mode
                if (this.miniState) {
                    this.miniState = false
                    this.$q.cookies.set('drawer', true)

                    // notice we have registered an event with capture flag;
                    // we need to stop further propagation as this click is
                    // intended for switching drawer to "normal" mode only
                    e.stopPropagation()
                }
            },
        }
    }
</script>

<style scoped>

</style>
