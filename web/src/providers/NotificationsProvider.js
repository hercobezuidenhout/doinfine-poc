import React, { createContext, useContext, useEffect, useState } from 'react';
import * as signalr from '@microsoft/signalr';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useNotificationService } from '@services/notification-service';
import { useTeamContext } from './TeamProvider';

var hubsUrlBase = process.env.DEVELOPMENT ? 'https://localhost:5001' : 'https://api.doinfine.app';

var connection = new signalr.HubConnectionBuilder().withUrl(`${hubsUrlBase}/hubs/notifications`).build();

export const NotificationsContext = createContext({
    nofiticiations: [],
    readNotification: (id) => { },
    readAll: () => { }
});

export const NotificationsProvider = ({ children }) => {
    const [connectionReady, setConnectionReady] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const notificationService = useNotificationService();
    const teamContext = useTeamContext();

    const fetchNotifications = async () => {
        const result = await notificationService.fetchAll();
        if (!result) return;
        setNotifications(result);
    };

    const readNotification = async (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
        await notificationService.update(id);
    };

    const readAll = async () => {
        const notificationsToRead = notifications;

        setNotifications([]);

        for (let index = 0; index < notificationsToRead.length; index++) {
            const notificationToRead = notifications[index];
            await notificationService.update(notificationToRead.id);
        }
    };

    useEffect(() => {
        if (!connectionReady) return;

        connection.on('ReceiveNofication', data => {
            setNotifications(prevNotifications => [...prevNotifications, data]);

            const action = snackbarId => (
                <>
                    <Button onClick={() => navigate(data.link)}>
                        View
                    </Button>
                </>
            );

            if (data.link) {
                enqueueSnackbar(data.title, {
                    action,
                    anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
                });
            } else {
                enqueueSnackbar(data.title, {
                    anchorOrigin: { horizontal: 'center', vertical: 'bottom' }
                });
            }
        });

    }, [connectionReady]);

    useEffect(() => {
        if (connection.state !== 'Disconnected') return;
        connection.start()
            .then(() => {
                setConnectionReady(true);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (!connectionReady) return;
        if (!teamContext) return;

        const roomName = teamContext.id.toString();
        connection.invoke('JoinRoom', roomName)
            .then(() => console.info('Connected to room: ', roomName))
            .catch(error => console.log(error));
    }, [teamContext, connectionReady]);


    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <NotificationsContext.Provider value={{
            nofiticiations: notifications,
            readNotification: readNotification,
            readAll: readAll
        }}>
            <SnackbarProvider>
                {children}
            </SnackbarProvider>
        </NotificationsContext.Provider>
    );
};

export const useNotificationsContext = () => useContext(NotificationsContext);