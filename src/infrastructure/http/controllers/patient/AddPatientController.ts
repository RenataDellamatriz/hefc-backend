import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { AddPatientAction } from '../../../../domain/patient/AddPatientAction';

export type AddPatientSchema = yup.InferType<typeof addPatientSchema>;

const addPatientSchema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  status: yup.string().required(),  
  birthDate: yup.date().required(),
  cpf: yup.string().required(),
  rg: yup.string().required(),
  address: yup.string().required(),
  zipCode: yup.string().required(),
  phone: yup.string().required(),
  maritalStatus: yup.string().required(),
  spouseName: yup.string().optional(),
  children: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required(),
        age: yup.number().required(),
      }),
    )
    .optional(),
});

export class AddPatientController extends Controller {
  constructor(private addPatientAction: AddPatientAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Add patient',
      tags: ['patient'],
      security: [
        {
          bearerToken: [],
        },
      ],
      body: addPatientSchema,
    };
  }

  async handle(req: FastifyRequest) {
    const { body } = await this.validateInputs<null, null, AddPatientSchema>(req);
    return await this.addPatientAction.execute(body);
  }
}
