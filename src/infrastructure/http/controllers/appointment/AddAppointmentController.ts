import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { AddAppointmentAction } from '../../../../domain/appointment/AddAppointmentAction';

export const addAppointmentSchema = yup.object({
  pacienteId: yup.number().required('ID do paciente é obrigatório'),
  data: yup.date().required('Data do atendimento é obrigatória'),
  profissional: yup.string().required('Profissional é obrigatório'),
  especialidade: yup.string().required('Especialidade é obrigatória'),
  observacoes: yup.string().optional(),
  appointmentDate: yup.date().optional(),
  patientName: yup.string().trim().optional(),
  type: yup.string().oneOf(['cancer', 'family', 'other'], 'Tipo inválido').optional(),
  status: yup
    .string()
    .oneOf(['ongoing', 'completed'], 'Status inválido')
    .optional(),
});

export type AddAppointmentSchema = yup.InferType<typeof addAppointmentSchema>;

export class AddAppointmentController extends Controller {
  constructor(private addAppointmentAction: AddAppointmentAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Add appointment',
      tags: ['appointment'],
      security: [
        {
          bearerToken: [],
        },
      ],
      body: addAppointmentSchema,
    };
  }

  async handle(req: FastifyRequest) {
    const { body } = await this.validateInputs<null, null, AddAppointmentSchema>(req);
    return await this.addAppointmentAction.execute(body);
  }
}
