import { AddUserSchema } from '../../infrastructure/http/controllers/user/AddUserController';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { Action } from '../Action';

export class AddUserAction extends Action {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async execute(data: AddUserSchema) {
    try {      
      const existingUser = await this.userRepository.getByEmail(data.email);
      if (existingUser) {
        throw new Error('Email já está em uso');
      }

      return await this.userRepository.add(data);
    } catch (e) {
      throw new Error(e);
    }
  }
}

