import { Flex, Link, Spacer, useBoolean } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { MenuToggle, ResponsiveContainer } from '@/components/atoms'
import { MenuLinks } from '@/components/molecules'
import { InfoIcon } from '@chakra-ui/icons'

export const HEADER_HEIGHT = 24

export const Header = () => {
  const router = useRouter()
  const [isOpen, { toggle, off }] = useBoolean(false)

  useEffect(() => off(), [off, router.pathname])

  return (
    <ResponsiveContainer
      position="fixed"
      width="100%"
      bg="rgba(255,255,255,0.5)"
      backdropFilter="auto"
      backdropBlur="5px"
      height={{
        base: isOpen ? undefined : HEADER_HEIGHT,
        md: HEADER_HEIGHT,
      }}
      zIndex={1000}
    >
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        w="100%"
        wrap={{ base: 'wrap', md: 'nowrap' }}
      >
        <NextLink href="/" passHref>
          <Link>
            <InfoIcon w={20} h={20} m={2} color="brand.primary" />
          </Link>
        </NextLink>
        <Spacer />
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} />
      </Flex>
    </ResponsiveContainer>
  )
}
