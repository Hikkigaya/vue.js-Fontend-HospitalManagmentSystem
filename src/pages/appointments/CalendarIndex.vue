<template>
    <q-page padding>
        <q-toolbar>
            <q-btn-group>
                <q-btn
                        label="Prev"
                        icon="arrow_left"
                        @click="calendarPrev"
                />
                <q-separator vertical/>
                <q-btn
                        label="Next"
                        icon-right="arrow_right"
                        @click="calendarNext"
                />
                <q-separator vertical/>
                <q-btn
                        label="Month View"
                        @click="monthView"
                        icon="view_comfy"
                        v-if="calendarView != 'month'"
                />
                <q-separator vertical/>
                <q-btn
                        label="Add Appointment"
                        @click="openDialog = true"
                        icon="fas fa-user-injured"
                        v-if="calendarView != 'month'"
                />
            </q-btn-group>
            <q-space />
        </q-toolbar>

        <q-separator />

        <q-calendar
                animated
                class="calendar-container"
                v-model="dateSelected"
                transition-prev="slide-right"
                transition-next="slide-left"
                interval-minutes="30"
                interval-start="14"
                interval-count="34"
                :view="calendarView"
                @click:date="dayView"
                @click:time="timeClick"
                @change="calendarValueChanged"
        >
            <template #day="{ date }">
                <template v-for="(appointment, index) in getAppointCountForDate(date)">
                    <q-badge
                            :key="index"
                            style= "width: 100%; cursor: pointer; height: 100%"
                            class="q-event justify-center"
                            align = "middle"
                    >
                        <span class="appointment-count ">{{ appointment.appointment_count }}</span>
                    </q-badge>
                </template>
            </template>

            <template #day-header="{ date }">
                <div class="row justify-center">
                    <template v-for="(appointment, index) in eventsMap[date]">
                        <q-badge
                                :key="index"
                                class="q-ma-xs"
                                :class="badgeClasses(appointment, 'header')"
                                :style="badgeStyles(appointment, 'header')"
                                style="width: 10px; max-width: 10px; height: 10px; max-height: 10px"
                        />
                    </template>
                </div>
            </template>

            <template #day-body="{ date, timeStartPos, timeDurationHeight }">
                <template v-for="(appointment, index) in appointments">
                    <q-badge
                            class="my-event justify-center ellipsis"
                            :class="badgeClasses(appointment, 'body')"
                            v-if="appointment.time"
                            :key="index"
                            :style="badgeStyles(appointment, 'body', timeStartPos, timeDurationHeight)"
                            @click="editAppointment(appointment)"
                    >
                        <q-icon
                                name="far fa-calendar"
                                class="q-mr-xs"
                        >
                        </q-icon>
                        <span class="ellipsis">
                            {{ appointment.patient.name }} - {{appointment.patient.phone}}
                        </span>
                    </q-badge>
                </template>
            </template>

        </q-calendar>

        <create-or-edit-dialog
                :is-edit="isEdit"
                :open-dialog = "openDialog"
                :time-selected = "timeSelected"
                :date-selected = "dateSelected"
                :appointmentToEdit = 'appointmentToEdit'
                @closePopUp = "closePopUp"
                @appointmentEditOrUpdated = "appointmentEditOrUpdated"
        ></create-or-edit-dialog>
    </q-page>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import qCalendarMixin from 'src/mixins/q-calendar'
    import Form from 'src/utils/form/Form'
    import CreateOrEditDialog from 'src/components/appointments/CreateOrEditDialog'

    export default {
        name: 'AppointmentsCalendarView',
        components: {CreateOrEditDialog},
        mixins: [qCalendarMixin],

        data () {
            return {
                timeSelected:'',
                dateSelected: '',
                openDialog: false,
                isEdit: false,
                appointmentToEdit: null,
                calendarView: "month",
            }
        },

        mounted () {
            this.getAppointmentCounts({
                dateStart: null,
                dateEnd: null
            })
        },

        methods: {
            getAppointCountForDate (date) {
                if (!this.appointmentCounts) {
                    return []
                }
                let appointments = this.appointmentCounts.filter(
                    (appointment) => {
                        return appointment.date === date;
                    }
                )
                return appointments
            },

            calendarValueChanged(payload) {
                if ( this.calendarView === 'month')
                {
                    this.getAppointmentCounts({
                        dateStart: payload.start.date,
                        dateEnd: payload.end.date
                    })
                }
            },

            calendarNext () {
                this.$refs.calendar.next()
            },

            calendarPrev () {
                this.$refs.calendar.prev()
            },

            dayView(day) {
                this.calendarView = "day"
                this.dateSelected = day.date
                this.getDayAppointments(this.dateSelected)
            },

            monthView(){
                this.calendarView = "month"
            },

            timeClick(day){
                this.openDialog = true
                if(!this.isEdit){
                    this.timeSelected= day.time.substr(0,2).concat(":00")
                }
            },

            editAppointment(appointment){
                this.openDialog = true
                this.isEdit = true
                this.appointmentToEdit = appointment
            },

            appointmentEditOrUpdated(day){
                this.getDayAppointments(day)
            },

            closePopUp(){
                this.openDialog = false
                this.isEdit = false
                this.appointmentToEdit = null
            },

            ...mapActions('appointments', {
                getAllAppointments: 'getAllAppointments',
                getDayAppointments: 'getDayAppointments',
                getAppointmentCounts: 'getAppointmentCounts'
            }),

        },

        computed: {
            ...mapGetters('appointments', {
                appointments: 'getAppointments',
                appointmentCounts: 'getAppointmentCounts'
            }),
            eventsMap () {
                const map = []
                if(this.appointments){
                    this.appointments.forEach((appointments) => (map[appointments.date] = map[appointments.date] || []).push(appointments))
                }
                return map
            }
        },
    }
</script>

<style lang="scss">
    .q-calendar-daily__day-interval:hover {
        background-color: rgba(0,0,255,.1)
    }
    .q-calendar-weekly__workweek:hover {
        background-color: rgba(0,0,255,.1)
    }
    .q-calendar-weekly__day:hover {
        background-color: rgba(0,0,255,.1)
    }
    .q-calendar-weekly__head-weekday:hover {
        background-color: rgba(0,0,255,.1)
    }
    .appointment-count{
        font-size: 2rem;
        font-weight: bold;
    }
    .calendar-container{
        position: relative;
    }
    .my-event{
        width: 100%;
        position: absolute;
        font-size: 12px;
    }
    .full-width{
        left: 0;
        width: 100%;
    }
    .left-side{
        left: 0;
        width: 49.75%;
    }
    .right-side{
        left: 50.25%;
        width: 49.75%;
    }
</style>
