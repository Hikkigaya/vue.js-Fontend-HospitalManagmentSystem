/**
 * This file handles notify related default values and provide us
 * a common place to handle all of its default values.
 */

import { Notify } from 'quasar'

Notify.setDefaults({
    position: 'top-right',
    timeout: 3000,
    textColor: 'white',
    actions: [{ icon: 'close', color: 'white' }]
})
