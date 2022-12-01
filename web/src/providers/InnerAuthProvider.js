import React from 'react'
import { useOuterAuthContext } from './OuterAuthProvider'

export const InnerAuthProvider = ({ children }) => {
    const { getCurrentUser } = useOuterAuthContext()
    return getCurrentUser() ? children : 'loading ...'
}