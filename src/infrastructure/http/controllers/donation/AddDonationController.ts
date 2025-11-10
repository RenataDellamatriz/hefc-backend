import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { DonationStatus, DonationType } from '../../../database/entities/Donation';
import { AddDonationAction } from '../../../../domain/donation/AddDonationAction';


export const addDonationSchema = yup.object({
  // Dados do Doador
  donorName: yup.string().required('Nome do doador é obrigatório'),
  donorType: yup.string().oneOf(['individual', 'company']).default('individual'),
  donorCpf: yup.string().nullable().optional(),
  donorCnpj: yup.string().nullable().optional(),
  donorPhone: yup.string().nullable().optional(),

  // Endereço
  donorZipCode: yup.string().nullable().optional(),
  donorStreet: yup.string().nullable().optional(),
  donorNumber: yup.string().nullable().optional(),
  donorComplement: yup.string().nullable().optional(),
  donorNeighborhood: yup.string().nullable().optional(),
  donorCity: yup.string().nullable().optional(),
  donorState: yup.string().nullable().optional(),

  // Dados da Doação
  patientId: yup.number().nullable().optional(),
  itemDescription: yup.string().nullable().optional(),
  quantity: yup.number().nullable().optional(),
  unit: yup.string().nullable().optional(),
  estimatedValue: yup.string().nullable().optional(),
  type: yup
    .mixed<DonationType>()
    .oneOf(Object.values(DonationType), 'Tipo de doação inválido')
    .optional(),
  amount: yup.string().nullable().optional(),
  status: yup
    .mixed<DonationStatus>()
    .oneOf(Object.values(DonationStatus), 'Status inválido')
    .default(DonationStatus.PENDING),
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
