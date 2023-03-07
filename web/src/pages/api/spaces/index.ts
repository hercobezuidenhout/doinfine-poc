import { PrismaClient } from '@prisma/client';
import { createHandler, Get, Req } from 'next-api-decorators';
import { AuthGuard } from '@/utilities';
import type { UserApiRequest } from '@/models';

class SpacesHandler {
  @Get()
  @AuthGuard()
  public async spaces(@Req() req: UserApiRequest) {
    const client = new PrismaClient();
    return await client.space.findMany({
      where: { roles: { some: { userId: req.userId } } },
    });
  }
}

export default createHandler(SpacesHandler);
