import { DonationRepository } from '../../infrastructure/repositories/DonationRepository';
import { PatientRepository } from '../../infrastructure/repositories/PatientRepository';
import { Action } from '../Action';

export class GetDonationAction extends Action {
  constructor(
    private donationRepository: DonationRepository,
    private patientRepository: PatientRepository,
  ) {
    super();
  }

  async execute(donationId?: string) {
    try {
      if (donationId) {
        const patientName = await this.patientRepository.getById(donationId);
        const appointment = await this.donationRepository.getById(donationId);
        return {
          ...appointment,
          paciente: patientName,
        };
      }
      return await this.donationRepository.getAll({});
    } catch (e) {
      throw new Error(e);
    }
  }
}
