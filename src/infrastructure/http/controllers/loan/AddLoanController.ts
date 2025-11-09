import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { AddLoanAction } from '../../../../domain/loan/AddLoanAction';

export const addLoanSchema = yup.object({
  patientId: yup.number().required('Patient ID is required'),
  item: yup.string().required('Item is required'),
  quantity: yup.number().required('Quantity is required'),
  signedDeclaration: yup.boolean().default(false),
  loanDate: yup.date().optional(),
  returnDate: yup.date().optional(),
  patientName: yup.string().optional(),
  equipment: yup.string().optional(),
  status: yup
    .mixed<'pending' | 'returned' | 'overdue'>()
    .oneOf(['pending', 'returned', 'overdue'], 'Invalid status')
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
