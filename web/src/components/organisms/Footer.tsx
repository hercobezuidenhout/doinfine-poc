import { ResponsiveContainer } from '@/components/atoms';
import { Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

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
        <Link as={NextLink} href={'teams'}>
          TEAMS
        </Link>
      </Flex>
    </ResponsiveContainer>
  );
};
