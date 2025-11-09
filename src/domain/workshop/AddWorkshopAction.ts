import { AddWorkshopSchema } from '../../infrastructure/http/controllers/workshop/AddWorkshopController';
import { PatientRepository } from '../../infrastructure/repositories/PatientRepository';
import { WorkshopRepository } from '../../infrastructure/repositories/WorkshopRepository';
import { Action } from '../Action';

export class AddWorkshopAction extends Action {
  constructor(
    private workshopRepository: WorkshopRepository,
    private patientRepository: PatientRepository,
  ) {
    super();
  }

  async execute(workshopData: AddWorkshopSchema) {
    try {
      // Verificar se todos os pacientes existem
      if (workshopData.participants && workshopData.participants.length > 0) {
        const patientIds = workshopData.participants.map((p) => p.id);

        const existingPatients = patientIds.map(
          async (id) => await this.patientRepository.getById(id),
        );

        if (existingPatients.length !== patientIds.length) {
          const existingIds = existingPatients
          const missingIds = patientIds.filter((id) => !existingIds.includes(id));
          throw new Error(`Pacientes não encontrados: ${missingIds.join(', ')}`);
        }
      }

      // Agora criar o workshop
      return await this.workshopRepository.add(workshopData);
    } catch (error) {
      throw new Error(`Erro ao criar oficina: ${error.message}`);
    }
  }
}
