import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { GetPatientAction } from '../../../../domain/patient/GetPatientAction';

export type GetPatientSchema = yup.InferType<typeof getPatientSchema>;

const getPatientSchema = yup.object().shape({
  patientId: yup.string(),
});

export class GetPatientController extends Controller {
  constructor(private getPatientAction: GetPatientAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Get patient',
      tags: ['patient'],
      security: [
        {
          bearerToken: [],
        },
      ],
      querystring: getPatientSchema,
    };
  }

  async handle(req: FastifyRequest) {
    const { querystring } = await this.validateInputs<null, GetPatientSchema, null>(req);
    return await this.getPatientAction.execute(querystring?.patientId);
  }
}
