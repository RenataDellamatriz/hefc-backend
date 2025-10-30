import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { SignInAction } from '../../../../domain/user/SignInAction';

export const signInSchema = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

export type SignInSchema = yup.InferType<typeof signInSchema>;

export class SignInController extends Controller {
  constructor(private signInAction: SignInAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Sign in user',
      tags: ['user'],
      body: yup
        .object({
          email: yup.string().email().required(),
          password: yup.string().required(),
        })
        .required(),
      response: {
        200: {
          type: 'object',
          properties: {
            accessToken: { type: 'string' },
          },
        },
      },
    };
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    const { body } = await this.validateInputs<null, null, { email: string; password: string }>(
      req,
    );
    const { email, password } = body;

    const user = await this.signInAction.execute(email, password);
    
    const accessToken = await res.jwtSign({ id: user.id, role: user.role });

    return res.status(200).send(accessToken);
  }
}
