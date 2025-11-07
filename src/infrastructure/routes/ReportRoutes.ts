import { FastifyInstance } from 'fastify';
import { Routes } from './Routes';
import { AuthMiddleware } from '../http/middlewares/AuthMiddleware';
import { GetPatientReportController } from '../http/controllers/report/GetPatientReportController';

export default class ReportRoutes implements Routes {
  constructor(
    private authMiddleware: AuthMiddleware,
    private getPatientReportController: GetPatientReportController,
  ) {}

  routes(fastify: FastifyInstance) {
    fastify.get(
      '/relatorios/pacientes',
      {
        schema: this.getPatientReportController.validateSchema(),
        preValidation: [this.authMiddleware.authenticate({ jwt: true })],
      },
      this.getPatientReportController.handle.bind(this.getPatientReportController),
    );
  }
}
