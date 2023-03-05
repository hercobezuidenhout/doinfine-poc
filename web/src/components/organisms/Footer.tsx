import { MenuToggle, ResponsiveContainer } from '@/components/atoms'
import { Flex, Link, Spacer } from '@chakra-ui/react'
import NextLink from 'next/link'
import { InfoIcon } from '@chakra-ui/icons'
import { MenuLinks } from '@/components/molecules'

export const Footer = () => {
  return (
    <ResponsiveContainer gap={6} bg="brand.primary" color="brand.light" py={16}>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        w="100%"
        wrap={{ base: 'wrap', md: 'nowrap' }}
      >
        <NextLink href="/teams" passHref>
          <Link>TEAMS</Link>
        </NextLink>
      </Flex>
    </ResponsiveContainer>
  )
}
