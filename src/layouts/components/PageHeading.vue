<!--
  - Copyright (c) 2019 @ TylexTech. All rights reserved.
  -->

<template>
    <div class="q-layout-padding">
        <div class="content-header">
            <span class="content-header-title">{{ pageTitle }}</span>
            <hr>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PageHeading',
        computed: {
            pageTitle () {
                return this.$route.meta.pageTitle
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content-header {
        position: relative;

        .content-header-title {
            font-size: 22px;
            font-weight: 400;
        }
    }
</style>
