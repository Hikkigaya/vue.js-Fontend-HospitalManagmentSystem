/*
 * Copyright (c) 2019 @ TylexTech. All rights reserved.
 */
import { Cookies } from 'quasar'
export default {
    leftDrawerOpen: Cookies.get('drawerState'),
    appSettings: null,
    doctors: []
}
