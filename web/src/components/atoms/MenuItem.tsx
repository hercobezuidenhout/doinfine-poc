import Nextlink from "next/link";
import { Heading, Link } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

interface MenuItemProps {
  to: string;
  children: ReactNode;
  onInViewChange: (inView: boolean) => void;
  isHidden?: boolean;
}

export const MenuItem = ({
  isHidden,
  to,
  children,
  onInViewChange,
}: MenuItemProps) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
  });

  onInViewChange(inView);

  return (
    <Nextlink href={to} passHref>
      <Link ref={ref} visibility={isHidden ? "hidden" : "visible"}>
        <Heading as="p" fontSize="xl" p={2} textAlign="center">
          {children}
        </Heading>
      </Link>
    </Nextlink>
  );
};
