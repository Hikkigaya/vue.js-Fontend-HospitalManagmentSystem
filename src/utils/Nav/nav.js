/*
 * Copyright (c) 2020 @ TylexTech. All rights reserved.
 */

const NAVS = [
    {
        id: 1,
        route: 'dashboard',
        order: 1,
        icon: 'fas fa-tachometer-alt',
        title: 'Dashboard',
        permissions: [],
        children: [],
        exact: true
    },
    {
        id: 14,
        route: 'appointment-dash',
        order: 3,
        icon: 'fa fa-user-md',
        title: 'Doctor Dashboard',
        permissions: [
            window.TylexApp.permissionsEnum.APPOINTMENT.VIEW
        ],
        children: []
    },
    {
        id: 15,
        route: 'tests-results',
        order: 4,
        icon: 'fas fa-notes-medical',
        title: 'Tests Results',
        permissions: [
            window.TylexApp.permissionsEnum.APPOINTMENT.VIEW
        ],
        children: []
    },
    {
        id: 11,
        order: 2,
        icon: 'perm_contact_calendar',
        title: 'Appointments',
        permissions: [
            window.TylexApp.permissionsEnum.APPOINTMENT.VIEW
        ],
        children: [
            {
                id: 12,
                route: 'appointments_calendar',
                order: 1,
                icon: 'far fa-calendar-alt',
                title: 'Calendar',
                permissions: [
                    window.TylexApp.permissionsEnum.APPOINTMENT.VIEW
                ],
                children: []
            },
            {
                id: 13,
                route: 'appointments',
                order: 1,
                icon: 'view_list',
                title: 'List',
                permissions: [
                    window.TylexApp.permissionsEnum.APPOINTMENT.VIEW
                ],
                exact: true,
                children: []
            },
        ]
    },
    {
        id: 10,
        route: 'patients',
        order: 3,
        icon: 'fas fa-user-injured',
        title: 'Patients',
        permissions: [
            window.TylexApp.permissionsEnum.PATIENT.VIEW
        ],
        children: []
    },
    {
        id: 2,
        order: 10,
        icon: 'fas fa-users-cog',
        title: 'Admin',
        permissions: [
            window.TylexApp.permissionsEnum.COMPANY.VIEW,
            window.TylexApp.permissionsEnum.GROUPS.VIEW,
            window.TylexApp.permissionsEnum.DISEASE.VIEW,
            window.TylexApp.permissionsEnum.TESTS.VIEW,
            window.TylexApp.permissionsEnum.MEDICINE.VIEW,
            window.TylexApp.permissionsEnum.USERS.VIEW,
        ],
        children: [
            {
                id: 3,
                route: 'users',
                order: 1,
                icon: 'fas fa-users',
                title: 'Users',
                permissions: [
                    window.TylexApp.permissionsEnum.USERS.VIEW
                ],
                children: []
            },
            {
                id: 4,
                route: 'roles',
                order: 2,
                icon: 'fas fa-user-tag',
                title: 'Roles',
                permissions: [
                    window.TylexApp.permissionsEnum.GROUPS.VIEW
                ],
                children: []
            },
            {
                id: 5,
                route: 'company-types',
                order: 3,
                icon: 'queue',
                title: 'Company Types',
                permissions: [
                    window.TylexApp.permissionsEnum.COMPANY_TYPE.VIEW
                ],
                children: []
            },
            {
                id: 6,
                route: 'companies',
                order: 4,
                icon: 'far fa-building',
                title: 'Companies',
                permissions: [
                    window.TylexApp.permissionsEnum.COMPANY_TYPE.VIEW
                ],
                children: []
            },
            {
                id: 7,
                route: 'medicines',
                order: 5,
                icon: 'fas fa-prescription-bottle-alt',
                title: 'Medicines',
                permissions: [
                    window.TylexApp.permissionsEnum.MEDICINE.VIEW
                ],
                children: []
            },
            {
                id: 8,
                route: 'diseases',
                order: 6,
                icon: 'fas fa-biohazard',
                title: 'Diseases',
                permissions: [
                    window.TylexApp.permissionsEnum.DISEASE.VIEW
                ],
                children: []
            },
            {
                id: 9,
                route: 'tests',
                order: 7,
                icon: 'fas fa-vials',
                title: 'Tests',
                permissions: [
                    window.TylexApp.permissionsEnum.TESTS.VIEW
                ],
                children: []
            }
        ]
    }
]

const blank = {
    id: 0,
    route: '',
    order: 0,
    icon: '',
    title: '',
    permissions: [],
    children: []
}

export default NAVS;
