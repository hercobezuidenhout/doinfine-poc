import { Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import * as R from 'ramda';
import { Link } from '@/components/atoms/Link';

export interface MenuItemProps {
  target: string | (() => void);
  children: ReactNode;
}

export const MenuItem = ({ target, children }: MenuItemProps) => {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const targetProp = R.is(String, target)
    ? { href: target }
    : { onClick: target };

  return (
    <Link {...targetProp} ref={ref} visibility={inView ? 'visible' : 'hidden'}>
      <Heading as="p" fontSize="xl" p={2} textAlign="center">
        {children}
      </Heading>
    </Link>
  );
};
