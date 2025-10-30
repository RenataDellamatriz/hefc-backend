import { Action } from '../Action';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';

export class GetAllUsersAction extends Action {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async execute() {
    try {
      return await this.userRepository.getAll({});
    } catch (e) {
      throw new Error(e as any);
    }
  }
}
