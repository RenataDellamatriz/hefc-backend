import { FastifyReply, FastifyRequest } from 'fastify';
import * as yup from 'yup';
import { Controller } from '../Controller';
import { ForgotPasswordAction } from '../../../../domain/user/ForgotPasswordAction';

interface BodyRequestParams {
  email: string;
}

export class ForgotPasswordController extends Controller {
  constructor(private forgotPasswordAction: ForgotPasswordAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Forgot password',
      tags: ['user'],
      body: yup
        .object({
          email: yup.string().email().required(),
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
    const { email } = body;

    console.log("email", email)

    await this.forgotPasswordAction.execute(email, res);

    return res.status(200).send({
      message: 'E-mail de redefinição de senha enviado.',
    });
  }
}
