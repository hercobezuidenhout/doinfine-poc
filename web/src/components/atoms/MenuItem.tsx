import NextLink from 'next/link';
import { Heading, Link } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import * as R from 'ramda';

export interface MenuItemProps {
  target: string | (() => void);
  children: ReactNode;
  onInViewChange: (inView: boolean) => void;
  isHidden?: boolean;
}

export const MenuItem = ({
  isHidden,
  target,
  children,
  onInViewChange,
}: MenuItemProps) => {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const targetProp = R.is(String, target)
    ? { as: NextLink, href: target }
    : { onClick: target };

  onInViewChange(inView);

  return (
    <Link
      {...targetProp}
      ref={ref}
      visibility={isHidden ? 'hidden' : 'visible'}
    >
      <Heading as="p" fontSize="xl" p={2} textAlign="center">
        {children}
      </Heading>
    </Link>
  );
};
