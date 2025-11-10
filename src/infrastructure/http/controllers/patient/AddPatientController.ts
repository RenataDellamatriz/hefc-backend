import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { AddPatientAction } from '../../../../domain/patient/AddPatientAction';
import { PatientStatus, PatientType } from '../../../database/entities/Patient';

export const childSchema = yup.object({
  name: yup.string().required('Nome da criança é obrigatório'),
  age: yup.number().required('Idade é obrigatória').min(0, 'Idade deve ser maior ou igual a 0'),
});

export const addPatientSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  type: yup.mixed<PatientType>().oneOf(Object.values(PatientType)).required('Tipo é obrigatório'),
  status: yup.mixed<PatientStatus>().oneOf(Object.values(PatientStatus)).required('Status é obrigatório'),
  birthDate: yup.date().nullable().optional(),
  cpf: yup.string().nullable().optional(),
  rg: yup.string().nullable().optional(),
  phone: yup.string().nullable().optional(),
  maritalStatus: yup.string().nullable().optional(),
  spouseName: yup.string().nullable().optional(),
  children: yup.array().of(childSchema).optional(),

  // Endereço
  zipCode: yup.string().nullable().optional(),
  street: yup.string().nullable().optional(),
  number: yup.string().nullable().optional(),
  complement: yup.string().nullable().optional(),
  neighborhood: yup.string().nullable().optional(),
  city: yup.string().nullable().optional(),
  state: yup.string().nullable().optional(),
});

export type AddPatientSchema = yup.InferType<typeof addPatientSchema>;
export type ChildSchema = yup.InferType<typeof childSchema>;

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
