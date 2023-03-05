import { ResponsiveContainer } from '@/components/atoms'

export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <ResponsiveContainer
      gap={6}
      bg="brand.primary"
      color="brand.light"
      py={16}
    />
  )
}
