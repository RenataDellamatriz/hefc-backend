import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { DeleteUserAction } from '../../../../domain/user/DeleteUserAction';

export class DeleteUserController extends Controller {
  constructor(private deleteUserAction: DeleteUserAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Delete user (admin only)',
      tags: ['user'],
      security: [
        {
          bearerToken: [],
        },
      ],
      params: yup.object({
        id: yup.number().required('ID é obrigatório'),
      }),
    };
  }

  async handle(req: FastifyRequest) {
    const { params } = await this.validateInputs<{ id: number }, null, null>(req);
    return await this.deleteUserAction.execute(params.id);
  }
}

