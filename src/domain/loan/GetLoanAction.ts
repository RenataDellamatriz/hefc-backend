import { LoanRepository } from '../../infrastructure/repositories/LoanRepository';
import { PatientRepository } from '../../infrastructure/repositories/PatientRepository';
import { Action } from '../Action';

export class GetLoanAction extends Action {
  constructor(
    private loanRepository: LoanRepository,
    private patientRepository: PatientRepository,
  ) {
    super();
  }

  async execute(loanId?: string) {
    try {
      if (loanId) {
        const patientName = await this.patientRepository.getById(loanId);
        const loan = await this.loanRepository.getById(loanId);
        return {
          ...loan,
          patientName,
        };
      }
      return await this.loanRepository.getAll({relations: ['contacts']});
    } catch (e) {
      throw new Error(e);
    }
  }
}
