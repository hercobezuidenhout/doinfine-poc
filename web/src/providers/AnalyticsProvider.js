import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAnalytics, logEvent, setUserId } from "firebase/analytics";
import { useOuterAuthContext } from '@providers/OuterAuthProvider';

export const AnalyticsContext = createContext({
    logEvent: (event, data) => { }
})

export const AnalyticsProvider = ({ children }) => {
    const [analytics, setAnalytics] = useState()

    const newEvent = (event, data) => {
        logEvent(analytics, event, data)
    }

    useEffect(() => {
        const ga = getAnalytics()
        setAnalytics(ga)
    }, [])

    return (
        <AnalyticsContext.Provider value={{
            logEvent: newEvent
        }}>
            {analytics && children}
        </AnalyticsContext.Provider>
    )
}

export const useAnalyticsContext = () => useContext(AnalyticsContext)