import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { AddWorkshopAction } from '../../../../domain/workshop/AddWorkshopAction';

export const addWorkshopSchema = yup.object({
  name: yup.string().required('Workshop name is required'),
  weekday: yup
    .string()
    .oneOf(['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], 'Invalid weekday')
    .required('Weekday is required'),
  startTime: yup
    .string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid start time')
    .required('Start time is required'),
  endTime: yup
    .string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid end time')
    .required('End time is required')
    .test('is-after-startTime', 'End time must be after start time', function (value) {
      const { startTime } = this.parent;
      return value > startTime;
    }),
  participantsCount: yup
    .number()
    .integer('Participants must be an integer')
    .min(0, 'Participants must be at least 0')
    .required('Number of participants is required'),
  participants: yup.array().required('Participants are required'),
  description: yup.string().optional(),
  status: yup
    .string()
    .oneOf(['active', 'inactive', 'cancelled'], 'Invalid status')
    .required('Status is required'),
});

export type AddWorkshopSchema = yup.InferType<typeof addWorkshopSchema>;

export class AddWorkshopController extends Controller {
  constructor(private addWorkshopAction: AddWorkshopAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Add worhshop',
      tags: ['worhshop'],
      security: [
        {
          bearerToken: [],
        },
      ],
      body: addWorkshopSchema,
    };
  }

  async handle(req: FastifyRequest) {
    const { body } = await this.validateInputs<null, null, AddWorkshopSchema>(req);
    return await this.addWorkshopAction.execute(body);
  }
}
