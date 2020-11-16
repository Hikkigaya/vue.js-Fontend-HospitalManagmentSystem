/*
 * Copyright (c) 2019 @ TylexTech. All rights reserved.
 */

/**
 * List of the frontend api routes to be used.
 *
 * @type Array | Object
 */
const apiRoutes = [
    // 1- Auth related
    {
        name: 'create_jwt',
        path: 'auth/jwt/create/',
        method: 'post',
        permissions: []
    },
    {
        name: 'refresh_jwt',
        path: 'auth/jwt/refresh/',
        method: 'post',
        permissions: []
    },
    {
        name: 'verify_jwt',
        path: 'auth/jwt/verify/',
        method: 'post',
        permissions: []
    },
    {
        name: 'users_list',
        path: 'auth/users/',
        method: 'get',
        permissions: []
    },
    {
        name: 'users_doctors_list',
        path: 'auth/users/doctors',
        method: 'get',
        permissions: []
    },
    {
        name: 'users_create',
        path: 'auth/users/',
        method: 'post',
        permissions: []
    },
    {
        name: 'users_activation',
        path: 'auth/users/activation/',
        method: 'post',
        permissions: []
    },
    {
        name: 'users_me',
        path: 'auth/users/me/',
        method: 'get',
        permissions: []
    },
    {
        name: 'users_me_update',
        path: 'auth/users/me/',
        method: 'put',
        permissions: []
    },
    {
        name: 'users_me_patch_update',
        path: 'auth/users/me/',
        method: 'patch',
        permissions: []
    },
    {
        name: 'users_me_delete',
        path: 'auth/users/me/',
        method: 'delete',
        permissions: []
    },
    {
        name: 'users_resend_activation',
        path: 'auth/users/resend_activation/',
        method: 'post',
        permissions: []
    },
    {
        name: 'users_reset_password',
        path: 'auth/users/reset_password/',
        method: 'post',
        permissions: []
    },
    {
        name: 'users_reset_password_confirm',
        path: 'auth/users/reset_password_confirm/',
        method: 'post',
        permissions: []
    },
    {
        name: 'user_reset_username',
        path: 'auth/users/reset_username/',
        method: 'post',
        permissions: []
    },
    {
        name: 'users_reset_username_confirm',
        path: 'auth/users/reset_username_confirm/',
        method: 'post',
        permissions: []
    },
    {
        name: 'users_set_password',
        path: 'auth/users/set_password/',
        method: 'post',
        permissions: []
    },
    {
        name: 'users_set_username',
        path: 'auth/users/set_username/',
        method: 'post',
        permissions: []
    },
    {
        name: 'users_get',
        path: 'auth/users/:id/',
        method: 'get',
        permissions: []
    },
    {
        name: 'users_update',
        path: 'auth/users/:id/',
        method: 'put',
        permissions: []
    },
    {
        name: 'users_partial_update',
        path: 'auth/users/:id/',
        method: 'patch',
        permissions: []
    },
    {
        name: 'users_delete',
        path: 'auth/users/:id/',
        method: 'delete',
        permissions: []
    },
    {
        name: 'users_deactivate',
        path: 'auth/users/deactivate/:id/',
        method: 'get',
        permissions: []
    },
    {
        name: 'users_activate',
        path: 'auth/users/activate/:id/',
        method: 'get',
        permissions: []
    },

    // 2- Groups Related

    {
        name: 'groups_list',
        path: 'groups/',
        method: 'get',
        permissions: []
    },
    {
        name: 'groups_create',
        path: 'groups/',
        method: 'post',
        permissions: []
    },
    {
        name: 'groups_all_list',
        path: 'groups/all/',
        method: 'get',
        permissions: []
    },
    {
        name: 'groups_read',
        path: 'groups/:id/',
        method: 'get',
        permissions: []
    },
    {
        name: 'groups_update',
        path: 'groups/:id/',
        method: 'put',
        permissions: []
    },
    {
        name: 'groups_partial_update',
        path: 'groups/:id/',
        method: 'patch',
        permissions: []
    },
    {
        name: 'groups_delete',
        path: 'groups/:id/',
        method: 'delete',
        permissions: []
    },

    // 3- Permissions Related

    {
        name: 'permissions_list',
        path: 'permissions/',
        method: 'get',
        permissions: []
    },
    {
        name: 'permissions_read',
        path: 'permissions/:id/',
        method: 'get',
        permissions: []
    },
    {
        name: 'permissions_all_list',
        path: 'permissions/all/',
        method: 'get',
        permissions: []
    },

    // 4- Companies Related

    {
        name: 'companies_types_list',
        path: 'companies/types/',
        method: 'get',
        permissions: []
    },
    {
        name: 'companies_types_all_list',
        path: 'companies/types/all/',
        method: 'get',
        permissions: []
    },
    {
        name: 'companies_types_create',
        path: 'companies/types/',
        method: 'post',
        permissions: []
    },
    {
        name: 'companies_types_read',
        path: 'companies/types/:id/',
        method: 'get',
        permissions: []
    },
    {
        name: 'companies_types_update',
        path: 'companies/types/:id/',
        method: 'put',
        permissions: []
    },
    {
        name: 'companies_types_partial_update',
        path: 'companies/types/:id/',
        method: 'patch',
        permissions: []
    },
    {
        name: 'companies_types_delete',
        path: 'companies/types/:id/',
        method: 'delete',
        permissions: []
    },
    {
        name: 'companies_list',
        path: 'companies/',
        method: 'get',
        permissions: []
    },
    {
        name: 'companies_create',
        path: 'companies/',
        method: 'post',
        permissions: []
    },
    {
        name: 'companies_read',
        path: 'companies/:id/',
        method: 'get',
        permissions: []
    },
    {
        name: 'companies_update',
        path: 'companies/:id/',
        method: 'put',
        permissions: []
    },
    {
        name: 'companies_partial_update',
        path: 'companies/:id/',
        method: 'patch',
        permissions: []
    },
    {
        name: 'companies_delete',
        path: 'companies/:id/',
        method: 'delete',
        permissions: []
    },
    {
        name: 'companies_all_list',
        path: 'companies/all/',
        method: 'get',
        permissions: []
    },

    // 5- Medicines Related

    {
        name: 'medicines_list',
        path: 'medicines/',
        method: 'get',
        permissions: []
    },
    {
        name: 'medicines_all_list',
        path: 'medicines/all/',
        method: 'get',
        permissions: []
    },
    {
        name: 'medicines_dashboard',
        path: 'medicines/dashboard/',
        method: 'get',
        permissions: []
    },
    {
        name: 'medicines_create',
        path: 'medicines/',
        method: 'post',
        permissions: []
    },
    {
        name: 'medicines_read',
        path: 'medicines/:id/',
        method: 'get',
        permissions: []
    },
    {
        name: 'medicines_update',
        path: 'medicines/:id/',
        method: 'put',
        permissions: []
    },
    {
        name: 'medicines_partial_update',
        path: 'medicines/:id/',
        method: 'patch',
        permissions: []
    },
    {
        name: 'medicines_delete',
        path: 'medicines/:id/',
        method: 'delete',
        permissions: []
    },

    // 6- Medical Terminologies Related

    {
        name: 'medical-terminologies_list',
        path: 'medical-terminologies/',
        method: 'get',
        permissions: []
    },
    {
        name: 'medical-terminologies_create',
        path: 'medical-terminologies/',
        method: 'post',
        permissions: []
    },
    {
        name: 'medical-terminologies_read',
        path: 'medical-terminologies/:id/',
        method: 'get',
        permissions: []
    },
    {
        name: 'medical-terminologies_update',
        path: 'medical-terminologies/:id/',
        method: 'put',
        permissions: []
    },
    {
        name: 'medical-terminologies_partial_update',
        path: 'medical-terminologies/:id/',
        method: 'patch',
        permissions: []
    },
    {
        name: 'medical-terminologies_delete',
        path: 'medical-terminologies/:id/',
        method: 'delete',
        permissions: []
    },

    // 7- Diseases Related

    {
        name: 'diseases_list',
        path: 'diseases/',
        method: 'get',
        permissions: []
    },
    {
        name: 'diseases_all_list',
        path: 'diseases/all/',
        method: 'get',
        permissions: []
    },
    {
        name: 'diseases_create',
        path: 'diseases/',
        method: 'post',
        permissions: []
    },
    {
        name: 'diseases_read',
        path: 'diseases/:id/',
        method: 'get',
        permissions: []
    },
    {
        name: 'diseases_update',
        path: 'diseases/:id/',
        method: 'put',
        permissions: []
    },
    {
        name: 'diseases_partial_update',
        path: 'diseases/:id/',
        method: 'patch',
        permissions: []
    },
    {
        name: 'diseases_delete',
        path: 'diseases/:id/',
        method: 'delete',
        permissions: []
    },


    // 8- Medial Tests Related

    {
        name: 'medical-tests_list',
        path: 'medical-tests/',
        method: 'get',
        permissions: []
    },
    {
        name: 'medical-tests_all_list',
        path: 'medical-tests/all/',
        method: 'get',
        permissions: []
    },
    {
        name: 'medical-tests_dashboard',
        path: 'medical-tests/dashboard/',
        method: 'get',
        permissions: []
    },
    {
        name: 'medical-tests_create',
        path: 'medical-tests/',
        method: 'post',
        permissions: []
    },
    {
        name: 'medical-tests_read',
        path: 'medical-tests/:id/',
        method: 'get',
        permissions: []
    },
    {
        name: 'medical-tests_update',
        path: 'medical-tests/:id/',
        method: 'put',
        permissions: []
    },
    {
        name: 'medical-tests_partial_update',
        path: 'medical-tests/:id/',
        method: 'patch',
        permissions: []
    },
    {
        name: 'medical-tests_delete',
        path: 'medical-tests/:id/',
        method: 'delete',
        permissions: []
    },

    // Medical test results

    {
        name: 'medical-tests-results_all',
        path: 'medical-tests/results/',
        method: 'get',
        permissions: []
    },
    {
        name: 'medical-tests-results_read',
        path: 'medical-tests/results/:id/',
        method: 'get',
        permissions: []
    },
    {
        name: 'medical-tests-results_patch',
        path: 'medical-tests/results/:id/',
        method: 'patch',
        permissions: []
    },

    // 9- Patient Related

    {
        name: 'patients_list',
        path: 'patients/',
        method: 'get',
        permissions: []
    },
    {
        name: 'patients_all_list',
        path: 'patients/all/',
        method: 'get',
        permissions: []
    },
    {
        name: 'patients_dashboard',
        path: 'patients/dashboard/',
        method: 'get',
        permissions: []
    },
    {
        name: 'patients_create',
        path: 'patients/',
        method: 'post',
        permissions: []
    },
    {
        name: 'patients_read',
        path: 'patients/:id/',
        method: 'get',
        permissions: []
    },
    {
        name: 'patients_update',
        path: 'patients/:id/',
        method: 'put',
        permissions: []
    },
    {
        name: 'patients_partial_update',
        path: 'patients/:id/',
        method: 'patch',
        permissions: []
    },
    {
        name: 'patients_delete',
        path: 'patients/:id/',
        method: 'delete',
        permissions: []
    },

    // 10- Appointments Related

    {
        name: 'appointments_list',
        path: 'appointments/',
        method: 'get',
        permissions: []
    },
    {
        name: 'appointments_all_list',
        path: 'appointments/all/',
        method: 'get',
        permissions: []
    },
    {
        name: 'appointments_count_list',
        path: 'appointments/count/',
        method: 'get',
        permissions: []
    },
    {
        name: 'appointments_dashboard',
        path: 'appointments/dashboard/',
        method: 'get',
        permissions: []
    },
    {
        name: 'appointments_scheduled_all_list',
        path: 'appointments/scheduled/all/',
        method: 'get',
        permissions: []
    },
    {
        name: 'appointments_create',
        path: 'appointments/',
        method: 'post',
        permissions: []
    },
    {
        name: 'appointments_read',
        path: 'appointments/:id/',
        method: 'get',
        permissions: []
    },
    {
        name: 'appointments_update',
        path: 'appointments/:id/',
        method: 'put',
        permissions: []
    },
    {
        name: 'appointments_partial_update',
        path: 'appointments/:id/',
        method: 'patch',
        permissions: []
    },
    {
        name: 'appointments_delete',
        path: 'appointments/:id/',
        method: 'delete',
        permissions: []
    },

    // 11 - Appointment Status Related

    {
        name: 'appointments_appointments-status_all_list',
        path: 'appointments/appointments-status/all/',
        method: 'get',
        permissions: []
    },

    // 12 - Appointment Test Status Related

    {
        name: 'appointments_appointments-test-status_all_list',
        path: 'appointments/appointments-test-status/all/',
        method: 'get',
        permissions: []
    },

    // 13 - App Related

    {
        name: 'app_init_list',
        path: 'app/init/',
        method: 'get',
        permissions: []
    },

    // 14- Diagnose Related

    {
        name: 'diagnosis_list',
        path: 'diagnosis/',
        method: 'get',
        permissions: []
    },
    {
        name: 'diagnosis_all_list',
        path: 'diagnosis/all/',
        method: 'get',
        permissions: []
    },
    {
        name: 'diagnosis_create',
        path: 'diagnosis/',
        method: 'post',
        permissions: []
    },
    {
        name: 'diagnosis_read',
        path: 'diagnosis/:id/',
        method: 'get',
        permissions: []
    },
    {
        name: 'diagnosis_update',
        path: 'diagnosis/:id/',
        method: 'put',
        permissions: []
    },
    {
        name: 'diagnosis_partial_update',
        path: 'diagnosis/:id/',
        method: 'patch',
        permissions: []
    },
    {
        name: 'diagnosis_delete',
        path: 'diagnosis/:id/',
        method: 'delete',
        permissions: []
    },

    // 15 - diagnosis Status Related
    {
        name: 'diagnosis_diagnosis-status_all_list',
        path: 'appointments/diagnosis-status/all/',
        method: 'get',
        permissions: []
    },

    // 16 - Prescription Related
    {
        name: 'prescriptions_list',
        path: 'prescriptions/',
        method: 'get',
        permissions: []
    },
    {
        name: 'prescriptions_create',
        path: 'prescriptions/',
        method: 'post',
        permissions: []
    },
    {
        name: 'prescriptions_all_list',
        path: 'prescriptions/all/',
        method: 'get',
        permissions: []
    },
    {
        name: 'prescriptions_read',
        path: 'prescriptions/:id/',
        method: 'get',
        permissions: []
    },
    {
        name: 'prescriptions_update',
        path: 'prescriptions/:id/',
        method: 'put',
        permissions: []
    },
    {
        name: 'prescriptions_partial_update',
        path: 'prescriptions/:id',
        method: 'patch',
        permissions: []
    },
    {
        name: 'prescriptions_delete',
        path: 'prescriptions/:id/',
        method: 'delete',
        permissions: []
    },

]




export default apiRoutes

