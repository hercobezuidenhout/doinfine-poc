import { MenuItem } from '@/components/atoms';
import { Box, Flex } from '@chakra-ui/react';
import { useMenuLinks } from '@/hooks';
import { SignInMenuItem } from '@/components/atoms/SignInMenuItem';

interface MenuLinksProps {
  isOpen?: boolean;
}

export const MenuLinks = ({ isOpen }: MenuLinksProps) => {
  const links = useMenuLinks();

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
          <MenuItem key={label} target={to}>
            {label}
          </MenuItem>
        ))}
        <SignInMenuItem />
        <MenuItem
          target={() =>
            fetch('/api/spaces')
              .then(async (res) =>
                console.log({ status: 'success', result: await res.json() })
              )
              .catch((error) => console.error(error))
          }
        >
          Test
        </MenuItem>
      </Flex>
    </Box>
  );
};
