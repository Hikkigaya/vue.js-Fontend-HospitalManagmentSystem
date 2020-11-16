/*
 * Copyright (c) 2019 @ TylexTech. All rights reserved.
 */

const routes = [
    {
        path: '/login',
        component: () => import('pages/auth/Login'),
        name: 'login',
        meta: {
            guest:true
        }
    },
    {
        path: '/',
        component: () => import('layouts/Index'),
        children: [
            {
                path: '/roles',
                component: () => import('pages/roles/Index'),
                name: 'roles',
                meta: {
                    pageTitle: 'Permissions Groups'
                }
            },
            {
                path: '/roles/create',
                component: () => import('pages/roles/Add'),
                name: 'create-roles',
                meta: {
                    pageTitle: 'Permissions Group Create'
                }
            },
            {
                path: '/roles/edit/:id_send',
                component: () => import('pages/roles/Edit'),
                name: 'edit-roles',
                meta: {
                    pageTitle: 'Permissions Group Update'
                }
            },
            {
                path: '/users',
                component:() => import('pages/users/Index'),
                name: 'users',
                meta: {
                    pageTitle: 'Users'
                }
            },
            {
                path:'/users/create',
                component: () => import('pages/users/Add'),
                name: 'create-users',
                meta: {
                    pageTitle: 'User Create'
                }
            },
            {
                path:'/users/edit/:id',
                component: () => import('pages/users/Edit'),
                name: 'users_update',
                meta: {
                    pageTitle: 'User Edit'
                }
            },
            {
                path: '/company/types',
                component: () => import('pages/companies/types/Index'),
                name: 'company-types',
                meta: {
                    pageTitle: 'Company Types'
                }
            },
            {
                path: '/companies',
                component: () => import('pages/companies/Index'),
                name: 'companies',
                meta: {
                    pageTitle: 'Companies'
                }
            },
            {
                path: '/medicines',
                component: () => import('pages/medicines/Index'),
                name: 'medicines',
                meta: {
                    pageTitle: 'Medicines'
                }
            },
            {
                path: '/diseases',
                component: () => import('pages/diseases/Index'),
                name: 'diseases',
                meta: {
                    pageTitle: 'Diseases'
                }
            },
            {
                path: '/tests',
                component: () => import('pages/tests/Index'),
                name: 'tests',
                meta: {
                    pageTitle: 'Tests'
                }
            },
            {
                path: '/test-results',
                component: () => import('pages/tests-results/Index'),
                name: 'tests-results',
                meta: {
                    pageTitle: 'Tests Results'
                }
            },
            {
                path: '/patients',
                component: () => import('pages/patients/Index'),
                name: 'patients',
                meta: {
                    pageTitle: 'Patients'
                }
            },
            {
                path: '/patients/:id/history',
                component: () => import('pages/patients/History'),
                name: 'patient-history',
                props: true,
                meta: {
                    pageTitle: 'Patient History'
                }
            },
            {
                path: '/appointments',
                component: () => import('pages/appointments/Index'),
                name: 'appointments',
                meta: {
                    pageTitle: 'Appointments'
                }
            },
            {
                path: '/appointments/calendar',
                component: () => import('pages/appointments/CalendarIndex'),
                name: 'appointments_calendar',
                meta: {
                    pageTitle: 'Appointments'
                }
            },
            {
                path: '/appointments/:id/diagnose',
                component: () => import('pages/diagnosis-prescription/Index'),
                name: 'diagnosis-prescription',
                meta: {
                    pageTitle: 'Diagnose'
                },
                props: true
            },
            {
                path: '/appointments/dashboard/',
                component: () => import('pages/appointment-dash/Index'),
                name: 'appointment-dash',
                meta: {
                    pageTitle: 'Doctor Dashboard'
                },
                props: true
            },
            {
                path: '',
                component: () => import('pages/Index'),
                name: 'dashboard',
                meta: {
                    pageTitle: 'Dashboard'
                }
            }
        ]
    },

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () => import('pages/Error404.vue')
    })
}

export default routes
