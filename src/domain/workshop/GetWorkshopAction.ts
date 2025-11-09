import { WorkshopRepository } from '../../infrastructure/repositories/WorkshopRepository';
import { Action } from '../Action';

export class GetWorkshopAction extends Action {
  constructor(private workshopRepository: WorkshopRepository) {
    super();
  }

  async execute(workshopId?: string) {
    try {
      if (workshopId) {
        return await this.workshopRepository.getById(workshopId);
      }

      const workshops = await this.workshopRepository.getAll({
        where: {},
        relations: ['participants'],
      });

      return workshops;
    } catch (e) {
      throw new Error(e);
    }
  }
}
