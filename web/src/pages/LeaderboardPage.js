import { LeaderboardItem } from '@components/atoms'
import { Box, List, Skeleton, Typography } from '@mui/material'
import { useLeaderboardService } from '@services'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const LeaderboardPage = () => {
    const leaderboardService = useLeaderboardService();

    const [searchParams, setSearchParams] = useSearchParams()
    const [activeTab, setActiveTab] = useState()
    const [items, setItems] = useState()

    const fetchUsersLeaderboard = async () => {
        const leaderboardItems = await leaderboardService.fetchUsersLeaderboard()
        if (leaderboardItems) setItems(leaderboardItems)
    }

    const fetchTeamsLeaderboard = async () => {
        const leaderboardItems = await leaderboardService.fetchTeamsLeaderboard()
        if (leaderboardItems) setItems(leaderboardItems)
    }

    useEffect(() => {
        const tab = searchParams.get('tab')
        if (!tab) {
            setSearchParams({
                tab: 'users'
            })
            setActiveTab('Users')
            return
        }
        setActiveTab(`${tab.charAt(0).toUpperCase()}${tab.slice(1)}`)
    }, [searchParams])

    useEffect(() => {
        setItems(undefined)
        if (activeTab === 'Users') fetchUsersLeaderboard()
        if (activeTab === 'Teams') fetchTeamsLeaderboard()
    }, [activeTab])

    return (
        <div>
            <h1>{activeTab}</h1>
            <List>
                {items ? items.map((item, index) => (
                    <LeaderboardItem key={index} position={index + 1} name={item.title} fines={item.fines} />
                )) : (
                    <>
                        <Skeleton variant='text' sx={{ fontSize: '2rem', display: 'inline-block', width: '100%', marginBottom: '1rem ' }} />
                        <Skeleton variant='text' sx={{ fontSize: '2rem', display: 'inline-block', width: '100%', marginBottom: '1rem ' }} />
                        <Skeleton variant='text' sx={{ fontSize: '2rem', display: 'inline-block', width: '100%', marginBottom: '1rem ' }} />
                        <Skeleton variant='text' sx={{ fontSize: '2rem', display: 'inline-block', width: '100%', marginBottom: '1rem ' }} />
                    </>
                )}
                {items && items.length == 0 && (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        padding: '10rem 0'
                    }}>
                        <Box sx={{ textAlign: 'center ' }}>
                            <Typography variant='h1'>🎉</Typography>
                            <Typography variant='body1'>No fines to show</Typography>
                        </Box>
                    </Box>
                )}
            </List>
        </div>
    )
}