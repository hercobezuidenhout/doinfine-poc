import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { forwardRef } from 'react';

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const hasHref = !!props.href;
  return (
    <ChakraLink as={hasHref ? NextLink : undefined} {...props} ref={ref} />
  );
});
