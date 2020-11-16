/*
 * Copyright (c) 2020 @ TylexTech. All rights reserved.
 */

export default {
    methods: {
        badgeClasses (appointment, type) {
            const isHeader = type === 'header'
            return {
                [`text-white bg-primary`]: true
            }
        },
        badgeStyles (appointment, type, timeStartPos, timeDurationHeight) {
            const s = {}
            if (timeStartPos) {
                s.top = timeStartPos(appointment.time) + 'px'
                s.position = 'absolute'
                s.width = '100%'
            }
            if (timeDurationHeight) {
                s.height = timeDurationHeight(appointment.duration) + 'px'
            }
            s['align-items'] = 'flex-start'
            return s
        },
    }
}
