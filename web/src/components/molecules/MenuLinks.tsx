import { MenuItem } from '@/components/atoms';
import { Box, Flex } from '@chakra-ui/react';
import { useMenuLinks } from '@/hooks';
import { useState } from 'react';
import produce from 'immer';
import * as R from 'ramda';
import { SignInMenuItem } from '@/components/atoms/SignInMenuItem';

interface MenuLinksProps {
  isOpen?: boolean;
}

export const MenuLinks = ({ isOpen }: MenuLinksProps) => {
  const links = useMenuLinks();
  const [outOfViewLinks, setOutOfViewLinks] = useState<string[]>([]);

  const handleInViewChange = (label: string, inView: boolean) => {
    if (
      (inView && outOfViewLinks.includes(label)) ||
      (!inView && !outOfViewLinks.includes(label))
    ) {
      setOutOfViewLinks(
        produce(inView ? R.without([label]) : R.union([label]))
      );
    }
  };

  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
      flexGrow={1}
    >
      <Flex
        gap={6}
        align="center"
        justify={{ base: 'center', md: 'flex-end' }}
        flexDirection={{ base: 'column', md: 'row' }}
        pt={{ base: 4, md: 0 }}
      >
        {links.map(({ to, label }) => (
          <MenuItem
            key={label}
            target={to}
            onInViewChange={(inView) => handleInViewChange(label, inView)}
            isHidden={outOfViewLinks.includes(label)}
          >
            {label}
          </MenuItem>
        ))}
        <SignInMenuItem
          onInViewChange={(inView) => handleInViewChange('Sign In', inView)}
          isHidden={outOfViewLinks.includes('Sign In')}
        />
      </Flex>
    </Box>
  );
};
