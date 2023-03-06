import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, Session, User } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { AUTH_OPTIONS } from '@/pages/api/auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: Session | null = await getServerSession(
    req,
    res,
    AUTH_OPTIONS
  );

  if (!session?.user) {
    return res.status(401).end();
  }

  const user = session.user as User;

  switch (req.method) {
    case 'GET': {
      const client = new PrismaClient();
      const spaces = await client.space.findMany({
        where: { roles: { some: { userId: user.id } } },
      });

      console.log(spaces);

      return res.send(spaces);
    }
    default:
      return res.status(405).end();
  }
};

export default handler;
