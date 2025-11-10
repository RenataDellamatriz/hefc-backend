import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { AddLoanAction } from '../../../../domain/loan/AddLoanAction';

export const addLoanSchema = yup.object({
  // Dados da Pessoa
  personName: yup.string().required('Nome completo é obrigatório'),
  personType: yup.string().oneOf(['individual', 'company']).default('individual'),
  personCpf: yup.string().nullable().optional(),
  personCnpj: yup.string().nullable().optional(),
  personPhone: yup.string().nullable().optional(),

  // Endereço
  personZipCode: yup.string().nullable().optional(),
  personStreet: yup.string().nullable().optional(),
  personNumber: yup.string().nullable().optional(),
  personComplement: yup.string().nullable().optional(),
  personNeighborhood: yup.string().nullable().optional(),
  personCity: yup.string().nullable().optional(),
  personState: yup.string().nullable().optional(),

  // Dados do Empréstimo
  patientId: yup.number().nullable().optional(),
  patientName: yup.string().optional(),
  item: yup.string().required('Item é obrigatório'),
  quantity: yup.number().required('Quantidade é obrigatória'),
  unit: yup.string().optional(),
  loanDate: yup.date().optional(),
  returnDate: yup.date().optional(),
  signedDeclaration: yup.boolean().default(false),
  equipment: yup.string().optional(),
  status: yup
    .mixed<'pending' | 'returned' | 'overdue'>()
    .oneOf(['pending', 'returned', 'overdue'], 'Status inválido')
    .optional(),
});

export type AddLoanSchema = yup.InferType<typeof addLoanSchema>;

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
