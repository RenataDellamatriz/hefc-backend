import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import { GetUserAction } from '../../../../domain/user/GetUserAction';

export class GetUserController extends Controller {
  constructor(private getUserAction: GetUserAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'User details',
      tags: ['user'],
      security: [
        {
          bearerToken: [],
        },
      ],
    };
  }

  async handle(req: FastifyRequest) {
    const userId = String((req.user as any)['id']);
    return await this.getUserAction.execute(userId);
  }
}
