import React, { MouseEventHandler } from 'react'
import { Box, Icon, IconButton } from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

interface MenuToggleProps {
  isOpen?: boolean
  toggle: MouseEventHandler
}

export const MenuToggle = ({ toggle, isOpen }: MenuToggleProps) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      <IconButton
        aria-label="Menu"
        icon={<Icon as={isOpen ? CloseIcon : HamburgerIcon} />}
        variant="ghost"
        size="lg"
      />
    </Box>
  )
}
