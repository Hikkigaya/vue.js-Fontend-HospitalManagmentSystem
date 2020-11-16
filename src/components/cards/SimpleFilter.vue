<template>
    <q-btn color="blue-7" class="filter_btn" round icon="filter_list">
        <q-menu>
            <q-list style="min-width: 100px">
                <q-item v-for="filter in filtersOption" :key="'Filter_'+filter.value" @click="filtersOptionSelectedHandler(filter)" clickable v-close-popup>
                    <q-item-section>{{filter.text}}</q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </q-btn>
</template>

<script>
    export default {
        name: "SimpleFilter",
        props:{
            filtersOption:{
                type:Array,
                default:()=>{
                    return[

                    ]
                }
            }
        },
        methods:{
            filtersOptionSelectedHandler(selection){
                this.$emit("selected",selection)
            }
        }
    }
</script>

<style scoped>

</style>
