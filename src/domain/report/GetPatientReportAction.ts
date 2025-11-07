import { PatientRepository } from '../../infrastructure/repositories/PatientRepository';
import { Action } from '../Action';

export class GetPatientReportAction extends Action {
  constructor(private patientRepository: PatientRepository) {
    super();
  }

  async execute(patientId?: string) {
    try {
      if (patientId) {
        const patient = await this.patientRepository.getById(patientId);
        if (!patient) {
          throw new Error('Patient not found');
        }
        return {
          paciente: patient,
          atendimentos: patient.atendimentos || [],
          emprestimos: patient.emprestimos || [],
          doacoes: patient.doacoes || [],
          oficinas: patient.oficinas || [],
        };
      }
      // Se não há patientId, retorna todos os pacientes com seus relacionamentos
      const pacientes = await this.patientRepository.getAll({});
      return pacientes.map((patient) => ({
        paciente: patient,
        atendimentos: patient.atendimentos || [],
        emprestimos: patient.emprestimos || [],
        doacoes: patient.doacoes || [],
        oficinas: patient.oficinas || [],
      }));
    } catch (e) {
      throw new Error(e as string);
    }
  }
}
