import { AppointmentRepository } from '../../infrastructure/repositories/AppointmentRepository';
import { PatientRepository } from '../../infrastructure/repositories/PatientRepository';
import { Action } from '../Action';

export class GetAppointmentAction extends Action {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private patientRepository: PatientRepository,
  ) {
    super();
  }

  async execute(appointmentId?: string) {
    try {
      if (appointmentId) {
        const patientName = await this.patientRepository.getById(appointmentId);
        const appointment = await this.appointmentRepository.getById(appointmentId);
        return {
          ...appointment,
          patientName,
        };
      }
      return await this.appointmentRepository.getAll({});
    } catch (e) {
      throw new Error(e);
    }
  }
}
