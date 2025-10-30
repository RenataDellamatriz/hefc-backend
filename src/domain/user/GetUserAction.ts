import { Action } from '../Action';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';

export class GetUserAction extends Action {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async execute(userId: string) {
    try {
      return await this.userRepository.getById(userId);
    } catch (e) {
      throw new Error(e as any);
    }
  }
}
