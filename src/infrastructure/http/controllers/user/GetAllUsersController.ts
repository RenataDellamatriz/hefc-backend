import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import { GetAllUsersAction } from '../../../../domain/user/GetAllUsersAction';

export class GetAllUsersController extends Controller {
  constructor(private getAllUsersAction: GetAllUsersAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'List all users',
      tags: ['user'],
      security: [
        {
          bearerToken: [],
        },
      ],
    }
  }

  async handle(_req: FastifyRequest) {
    return await this.getAllUsersAction.execute();
  }
}
