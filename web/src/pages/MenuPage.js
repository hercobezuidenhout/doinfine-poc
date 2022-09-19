import { LinkListItem } from '@components/molecules'
import { OptionsBox } from '@components/organisms'
import React from 'react'

export const MenuPage = () => {
    return <div>
        <OptionsBox label="Options">
            <LinkListItem label="Account" link="/me" />
        </OptionsBox>
    </div>
}