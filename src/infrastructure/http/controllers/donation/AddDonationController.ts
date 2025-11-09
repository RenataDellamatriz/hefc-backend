import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { DonationStatus, DonationType } from '../../../database/entities/Donation';
import { AddDonationAction } from '../../../../domain/donation/AddDonationAction';

export const addDonationSchema = yup.object({
  patientId: yup.number().required('Patient ID is required'),
  itemDescription: yup.string().required('Item description is required'),
  quantity: yup.number().required('Quantity is required'),
  unit: yup.string().optional(),
  estimatedValue: yup.string().optional(),
  type: yup.mixed<DonationType>().oneOf(Object.values(DonationType)).optional(),
  amount: yup.string().optional(),
  status: yup
    .mixed<DonationStatus>()
    .oneOf(Object.values(DonationStatus))
    .default(DonationStatus.PENDING)
    .optional(),
});

export type AddDonationSchema = yup.InferType<typeof addDonationSchema>;

export class AddDonationController extends Controller {
  constructor(private addDonationAction: AddDonationAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Add donation',
      tags: ['donation'],
      security: [
        {
          bearerToken: [],
        },
      ],
      body: addDonationSchema,
    };
  }

  async handle(req: FastifyRequest) {
    const { body } = await this.validateInputs<null, null, AddDonationSchema>(req);
    return await this.addDonationAction.execute(body);
  }
}
