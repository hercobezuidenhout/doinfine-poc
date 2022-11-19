import React, { createContext, useContext, useEffect, useState } from "react"

var baseLink = process.env.DEVELOPMENT ? 'https://localhost:3000' : 'https://doinfine.app';

export const WebNotificationsContext = createContext({
    createNotification: (title, body, link) => { }
})

export const WebNotificationsProvider = ({ children }) => {
    const [serviceWorkerRegistration, setServiceWorkerRegistration] = useState()
    const [notificationsPermission, setNotificationsPermissions] = useState()

    const checkNotificationsPermissions = async () => {
        setNotificationsPermissions(Notification.permission)
        if (Notification.permission == 'denied') {
            setNotificationsPermissions(false)
            return
        }
        if (Notification.permission !== 'granted') {
            const permission = await Notification.requestPermission()
            if (permission == 'granted') {
                setNotificationsPermissions(true)
                createNotification()
            }
        }
        if (Notification.permission == 'granted') setNotificationsPermissions(true)
    }

    const createNotification = (title, body, link) => {
        if (!('Notification' in window)) return

        const img = '../assets/logo.png'
        const text = body

        const notification = new Notification(title || 'DoinFine Notification', {
            body: text,
            icon: img
        })

        notification.onclick = (event) => {
            event.preventDefault()
            window.open(link ? link : baseLink, '_blank')
        }
    }

    useEffect(() => {
        if (!('Notification' in window)) {
            alert('Your device does not accept notifications')
            return
        }

        checkNotificationsPermissions()
    }, [notificationsPermission])

    return (
        <WebNotificationsContext.Provider value={{
            createNotification: createNotification
        }}>
            {children}
        </WebNotificationsContext.Provider>
    )
}

export const useWebNotificationsContext = () => useContext(WebNotificationsContext)