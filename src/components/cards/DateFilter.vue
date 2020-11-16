<template>
    <q-btn color="blue-7" class="filter_btn" round icon="filter_list">
        <q-menu>
            <q-list style="min-width: 100px">
                <q-item v-for="filter in appointmentsFilterOptions" :key="'appointmentFilter_'+filter.value" @click="appointmentsFilterClickHandler(filter)" clickable v-close-popup>
                    <q-item-section>{{filter.text}}</q-item-section>
                </q-item>
            </q-list>
        </q-menu>
        <DialogWithSlot ref="opt">
            <template>
                <q-card-section>

                </q-card-section>
                <q-card-section>
                    <q-input label="Starting Date" filled v-model="appointmentFilter.date__gte">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="from" transition-show="scale" transition-hide="scale">
                                    <q-date mask="YYYY-MM-DD"  v-model="appointmentFilter.date__gte" @input="() => $refs.from.hide()" />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </q-card-section>
                <q-card-section>
                    <q-input label="Ending Date" filled v-model="appointmentFilter.date__lte">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="to" transition-show="scale" transition-hide="scale">
                                    <q-date  mask="YYYY-MM-DD" v-model="appointmentFilter.date__lte" @input="() => $refs.to.hide()" />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </q-card-section>
            </template>
        </DialogWithSlot>
    </q-btn>
</template>

<script>
    import DialogWithSlot from "../../utils/dialog/DialogWithSlot";
    export default {
        name: "DateFilter",
        components: {DialogWithSlot},
        data(){
            return{
                appointmentsFilterOptions:[
                    {text:"Today",value:"today"},
                    {text:"Week",value:"week"},
                    {text:"Month",value:"month"},
                    {text:"Year",value:"year"},
                    {text:"Custom",value:"custom"},
                    {text:"All",value:"all"},
                ],
                appointmentFilter:{
                    date:null,
                    date__lte:null,
                    date__gte:null,
                }
            }
        },
        methods:{
            async appointmentsFilterClickHandler(filter){
                let datefilter={
                    date:null,
                    date__gte:null,
                    date__lte:null
                }
                if(filter.value===this.appointmentsFilterOptions[0].value){
                    datefilter.date=this.$moment().format("YYYY-MM-DD");
                    datefilter.date__gte=null;
                    datefilter.date__lte=null;
                }else if(filter.value===this.appointmentsFilterOptions[4].value){
                    if(await this.$refs.opt.open()){
                        datefilter.date__gte=this.appointmentFilter.date__gte
                        datefilter.date__lte=this.appointmentFilter.date__lte
                    }
                }
                else if(filter.value===this.appointmentsFilterOptions[5].value){
                    datefilter.date=null;
                    datefilter.date__gte=null;
                    datefilter.date__lte=null;
                }else{
                    let today=this.$moment()
                    datefilter.date__gte=today.startOf(filter.value).format("YYYY-MM-DD")
                    datefilter.date__lte=today.endOf(filter.value).format("YYYY-MM-DD")
                    datefilter.date=null;
                }
                this.appointmentFilter=datefilter
                this.$emit("filterUpdated",this.appointmentFilter)
            }
        },
    }
</script>

<style scoped>

</style>
