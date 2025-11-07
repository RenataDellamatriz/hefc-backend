import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { AddLoanAction } from '../../../../domain/loan/AddLoanAction';

export const addLoanSchema = yup.object({
  pacienteId: yup.number().required('ID do paciente é obrigatório'),
  item: yup.string().required('Item é obrigatório'),
  quantidade: yup.number().required('Quantidade é obrigatória'),
  unidade: yup.string().required('Unidade é obrigatória'),
  dataEmprestimo: yup.date().required('Data do empréstimo é obrigatória'),
  dataDevolucaoPrevista: yup.date().required('Data de devolução prevista é obrigatória'),
  declaracaoAssinada: yup.boolean().default(false),
  loanDate: yup.date().optional(),
  returnDate: yup.date().optional(),
  patientName: yup.string().optional(),
  equipment: yup.string().optional(),
  status: yup
    .mixed<'pending' | 'returned'>()
    .oneOf(['pending', 'returned'], 'Status inválido')
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
