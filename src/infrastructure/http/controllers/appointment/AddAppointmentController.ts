import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { AddAppointmentAction } from '../../../../domain/appointment/AddAppointmentAction';

export const addAppointmentSchema = yup.object({
  patientId: yup.number().required('Patient ID is required'),
  appointmentDate: yup.date().required('Appointment date is required'),
  professional: yup.string().required('Professional is required'),
  specialty: yup.string().required('Specialty is required'),
  notes: yup.string().optional(),
  patientName: yup.string().trim().optional(),
  type: yup.string().oneOf(['cancer', 'family', 'other'], 'Invalid type').optional(),
  status: yup
    .string()
    .oneOf(['ongoing', 'completed'], 'Invalid status')
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
