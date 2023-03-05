import { Box, Center } from '@chakra-ui/react'
import { CenterProps } from '@chakra-ui/layout'

interface ResponsiveContainerProps extends CenterProps {
  containerWidth?: number | string
}

export const CONTAINER_MAX_WIDTH = '1200px'

export const ResponsiveContainer = ({
  children,
  containerWidth = CONTAINER_MAX_WIDTH,
  ...props
}: ResponsiveContainerProps) => {
  return (
    <Center {...props} px={5}>
      <Box maxWidth={containerWidth} w="100%">
        {children}
      </Box>
    </Center>
  )
}
