import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { AddLoanAction } from '../../../../domain/loan/AddLoanAction';

export const loanContactSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().optional(),
  zipCode: yup.string().optional(),
  address: yup.string().optional(),
  phone: yup.string().optional(),
  relationship: yup.string().optional(),
});

export const addLoanSchema = yup.object({
  patientId: yup.number().required('ID do paciente é obrigatório'),
  item: yup.string().required('Item é obrigatório'),
  quantity: yup.number().required('Quantidade é obrigatória'),
  signedDeclaration: yup.boolean().default(false),
  loanDate: yup.date().optional(),
  returnDate: yup.date().optional(),
  patientName: yup.string().optional(),
  equipment: yup.string().optional(),
  status: yup
    .mixed<'pending' | 'returned' | 'overdue'>()
    .oneOf(['pending', 'returned', 'overdue'], 'Status inválido')
    .optional(),
  contacts: yup.array().of(loanContactSchema).optional().default([]),
});

export type AddLoanSchema = yup.InferType<typeof addLoanSchema>;
export type LoanContactSchema = yup.InferType<typeof loanContactSchema>;

export class AddLoanController extends Controller {
  constructor(private addLoanAction: AddLoanAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Add loan',
      tags: ['loan'],
      security: [
        {
          bearerToken: [],
        },
      ],
      body: addLoanSchema,
    };
  }

  async handle(req: FastifyRequest) {
    const { body } = await this.validateInputs<null, null, AddLoanSchema>(req);
    return await this.addLoanAction.execute(body);
  }
}
