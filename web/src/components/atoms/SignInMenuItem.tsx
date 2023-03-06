import { MenuItem, MenuItemProps } from '@/components/atoms/MenuItem';
import { signIn, signOut, useSession } from 'next-auth/react';

interface SignInMenuItemProps
  extends Omit<MenuItemProps, 'target' | 'children'> {}

export const SignInMenuItem = (props: SignInMenuItemProps) => {
  const { data: session } = useSession();
  const loggedIn = !!session;

  if (loggedIn) {
    return (
      <MenuItem target={signOut} {...props}>
        Sign Out
      </MenuItem>
    );
  }

  return (
    <MenuItem target={signIn} {...props}>
      Sign In
    </MenuItem>
  );
};
