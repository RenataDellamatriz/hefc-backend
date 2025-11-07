import { FastifyRequest } from 'fastify';
import { Controller } from '../Controller';
import * as yup from 'yup';
import { GetPatientReportAction } from '../../../../domain/report/GetPatientReportAction';

export type GetPatientReportSchema = yup.InferType<typeof getPatientReportSchema>;

const getPatientReportSchema = yup.object().shape({
  patientId: yup.string().optional(),
});

export class GetPatientReportController extends Controller {
  constructor(private getPatientReportAction: GetPatientReportAction) {
    super();
  }

  generateSchema() {
    return {
      description: 'Get patient report with all related data',
      tags: ['report'],
      security: [
        {
          bearerToken: [],
        },
      ],
      querystring: getPatientReportSchema,
    };
  }

  async handle(req: FastifyRequest) {
    const { query } = await this.validateInputs<null, GetPatientReportSchema, null>(req);
    return await this.getPatientReportAction.execute(query?.patientId);
  }
}
