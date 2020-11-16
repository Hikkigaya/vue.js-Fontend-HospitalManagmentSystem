/*
 * Copyright (c) 2020 @ TylexTech. All rights reserved.
 */

const PermissionsEnum = {
    //GROUPS RELATED.
    GROUPS: {
        ADD: 'add_group',
        UPDATE: 'change_group',
        DELETE: 'delete_group',
        VIEW: 'view_group',
    },
    
    //USERS RELATED.
    USERS: {
        ADD: 'add_user',
        UPDATE: 'change_user',
        DELETE: 'delete_user',
        VIEW: 'view_user',
    },
    
    //COMPANY RELATED
    COMPANY: {
        ADD: 'add_company',
        UPDATE: 'change_company',
        DELETE: 'delete_company',
        VIEW: 'view_company',
    },
    
    //COMPANY TYPES RELATED
    COMPANY_TYPE: {
        ADD: 'add_companytype',
        UPDATE: 'change_companytype',
        DELETE: 'delete_companytype',
        VIEW: 'view_companytype',
    },
    
    //MEDICINE RELATED
    MEDICINE: {
        ADD: 'add_medicine',
        UPDATE: 'change_medicine',
        DELETE: 'delete_medicine',
        VIEW: 'view_medicine',
    },
    
    //DISEASE RELATED
    DISEASE: {
        ADD: 'add_disease',
        UPDATE: 'change_disease',
        DELETE: 'delete_disease',
        VIEW: 'view_disease',
    },
    
    //TESTS RELATED
    TESTS: {
        ADD: 'add_test',
        UPDATE: 'change_test',
        DELETE: 'delete_test',
        VIEW: 'view_test',
    },

    //PATIENT RELATED
    PATIENT: {
        ADD: 'add_patient',
        UPDATE: 'change_patient',
        DELETE: 'delete_patient',
        VIEW: 'view_patient',
    },
    
    //APPOINTMENT RELATED
    APPOINTMENT: {
        ADD: 'add_appointment',
        UPDATE: 'change_appointment',
        DELETE: 'delete_appointment',
        VIEW: 'view_appointment',
    },
    
    //APPOINTMENT_STATUS RELATED
    APPOINTMENT_STATUS: {
        ADD: 'add_appointmentstatus',
        UPDATE: 'change_appointmentstatus',
        DELETE: 'delete_appointmentstatus',
        VIEW: 'view_appointmentstatus',
    },
    
    //APPOINTMENT_TEST_STATUS RELATED
    APPOINTMENT_TEST_STATUS: {
        ADD: 'add_appointmentteststatus',
        UPDATE: 'change_appointmentteststatus',
        DELETE: 'delete_appointmentteststatus',
        VIEW: 'view_appointmentteststatus',
    }
}

export default PermissionsEnum
