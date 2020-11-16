<!--
  - Copyright (c) 2019 @ TylexTech. All rights reserved.
  -->

<template>
    <div id="q-app">
        <router-view/>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: 'App',
        data() {
            return {

            }
        },
        mounted () {

        },
        methods: {

        }
    }
</script>
<style>
    :root{
        --light-shadow:rgb(255,255,255);
        --dark-shadow:rgba(0,0,0,.8);
        --background-color:rgb(60,60,60);
    }
    .route-bounce-enter-active .route-bounce-leave-active {
        transition: all .3s ease;
    }

    .v-application ::-webkit-scrollbar {
        height: 8px;
        width: 8px;
    }

    .v-application ::-webkit-scrollbar-corner {
        background: transparent;
    }

    .v-application ::-webkit-scrollbar-thumb {
        background: rgba(128, 134, 138, .30);
        border-radius: 8px;
    }

    html {
        background: rgba(243, 249, 253, 0.5);
    }

    html ::-webkit-scrollbar {
        height: 8px;
        width: 14px;
    }

    html ::-webkit-scrollbar-corner {
        background: transparent;
    }

    html ::-webkit-scrollbar-thumb {
        background: rgba(128, 134, 138, .30);
        border-radius: 14px;
    }
</style>
