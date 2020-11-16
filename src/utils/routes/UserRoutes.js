/*
 * Copyright (c) 2020 @ TylexTech. All rights reserved.
 */

import Store from 'src/store'

class UserRoutes {
    user = null
    permissions = []
    groups = []
    
    constructor (user) {
        this.user = user
        this.groups = { ...user.groups }
        for (const group of user.groups) {
            this.assignGroupPermissions(group)
        }
    }
    
    assignGroupPermissions (group) {
        for (const permission of group.permissions) {
            this.permissions[permission.codename] = permission
        }
    }
    
    hasPermission (permissionName) {
        return !!this.permissions[permissionName]
    }
    
    hasAnyPermission (permissionsList) {
        
        if (permissionsList.length <= 0) {
            return true
        }
        
        for (let permission of permissionsList) {
            if (this.hasPermission(permission)) {
                return true
            }
        }
        
        return false
    }
}

const userRouteInstance = function () {
    const user = Store().getters['user/getLoggedInUser']
    let instance = null
    if (!instance) {
        instance = new UserRoutes(user)
    }
    
    return instance
}

export default userRouteInstance

