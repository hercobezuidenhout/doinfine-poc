import { NextPageWithLayout } from '@/pages/types'
import { ReactElement } from 'react'
import { MainLayout } from '@/components/templates'
import { Heading } from '@chakra-ui/react'

const HomePage: NextPageWithLayout = () => {
  return <Heading>Hello</Heading>
}

HomePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default HomePage
