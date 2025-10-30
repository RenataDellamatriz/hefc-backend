import { FastifyReply, FastifyRequest } from 'fastify';
import * as yup from 'yup';
import { Controller } from '../Controller';
import { ResetPasswordAction } from '../../../../domain/user/ResetPasswordAction';

interface BodyRequestParams {
  newPassword: string;
}

export class ResetPasswordController extends Controller {
  constructor(private resetPasswordAction: ResetPasswordAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Reset password',
      tags: ['user'],
      body: yup
        .object({
          newPassword: yup.string().required(),
        })
        .required(),
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },    
      },
    };
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const { body } = await this.validateInputs<null, null, BodyRequestParams>(req);
    const { newPassword } = body;

    const userId = req.user['id'];

    await this.resetPasswordAction.execute(userId, newPassword);

    return res.status(200).send({
      message: 'E-mail de redefinição de senha enviado.',
    });
  }
}
