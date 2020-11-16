<template>
    <q-dialog v-model="dialog" persistent>
        <q-card :style="{width:options.width}">
            <slot></slot>
            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" @click.native="cancel" v-close-popup />
                <q-btn flat label="Ok" @click.native="agree" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
    export default {
        name: "DialogWithSlot",
        data: () => ({
            dialog: false,
            resolve: null,
            reject: null,
            options: {
                color: 'primary',
                width: 290,
                zIndex: 200
            }
        }),
        methods: {
            open( options) {
                this.dialog = true
                this.options = Object.assign(this.options, options)
                return new Promise((resolve, reject) => {
                    this.resolve = resolve
                    this.reject = reject
                })
            },
            agree() {
                this.resolve(true)
                this.dialog = false
            },
            cancel() {
                this.resolve(false)
                this.dialog = false
            }
        }
    }
</script>

<style scoped>

</style>
