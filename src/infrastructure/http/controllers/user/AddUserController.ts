import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { AddUserAction } from '../../../../domain/user/AddUserAction';
import bcrypt from 'bcrypt';

export const addUserSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  role: yup
    .string()
    .oneOf(['admin', 'collaborator'], 'Role inválida')
    .required('Role é obrigatória'),
});

export type AddUserSchema = yup.InferType<typeof addUserSchema>;

export class AddUserController extends Controller {
  constructor(private addUserAction: AddUserAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Register new user (admin only)',
      tags: ['user'],
      security: [
        {
          bearerToken: [],
        },
      ],
      body: addUserSchema,
    };
  }

  async handle(req: FastifyRequest) {
    const { body } = await this.validateInputs<null, null, AddUserSchema>(req);    
  
    const hashedPassword = await bcrypt.hash(body.password, 10);
    
    return await this.addUserAction.execute({
      ...body,
      password: hashedPassword,
    });
  }
}

