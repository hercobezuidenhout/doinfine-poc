import * as React from 'react'
import Head from 'next/head'
import { Flex, Link } from '@chakra-ui/react'
import { Footer, Header, HEADER_HEIGHT } from '@/components/organisms'
import { ResponsiveContainer } from '@/components/atoms'
import NextLink from 'next/link'

interface LayoutProps {
  children?: React.ReactNode
}

export const MainLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Doinfine</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <main>
        <Flex minHeight="100vh" direction="column">
          <Header />
          <ResponsiveContainer pt={HEADER_HEIGHT} flexGrow={1}>
            {children}
          </ResponsiveContainer>
          <Footer />
        </Flex>
      </main>
    </>
  )
}
