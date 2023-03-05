import * as React from 'react'
import Head from 'next/head'
import { Flex } from '@chakra-ui/react'
import { Footer, Header, HEADER_HEIGHT } from '@/components/organisms'

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
      <Flex minHeight="100vh" direction="column">
        <Header />
        <Flex pt={HEADER_HEIGHT} flexGrow={1} flexDirection="column">
          {children}
        </Flex>
        <Footer />
      </Flex>
    </>
  )
}
