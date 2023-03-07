import {
  createMiddlewareDecorator,
  NextFunction,
  UnauthorizedException,
} from 'next-api-decorators';
import { NextApiResponse } from 'next';
import { getServerSession, Session, User } from 'next-auth';
import { AUTH_OPTIONS } from '@/pages/api/auth/[...nextauth]';
import { UserApiRequest } from '@/models';

export const AuthGuard = createMiddlewareDecorator(
  async (req: UserApiRequest, res: NextApiResponse, next: NextFunction) => {
    const session: Session | null = await getServerSession(
      req,
      res,
      AUTH_OPTIONS
    );

    if (!session) {
      return new UnauthorizedException();
    }

    const user = session.user as User;
    req.userId = user.id;

    next();
  }
);
