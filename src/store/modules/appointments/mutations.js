/*
 * Copyright (c) 2019 @TylexTech All Rights Reserved.
 */
import Vue from 'vue'

export function setAppointments (state, appointments) {
    Vue.set(state,'appointments', appointments)
}

export function setAppointmentStatuses (state, appointmentStatuses) {
    Vue.set(state, 'appointmentStatuses', appointmentStatuses)
}

export function setAppointmentTestStatuses (state, appointmentTestStatuses) {
    Vue.set(state, 'appointmentTestStatuses', appointmentTestStatuses)
}

export function setAppointmentCounts (state, appointmentCounts) {
    Vue.set(state, 'appointmentCounts', appointmentCounts)
}
