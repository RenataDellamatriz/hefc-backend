import { Action } from '../Action';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import bcrypt from 'bcrypt';

export class SignInAction extends Action {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async execute(email: string, password: string) {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      const error = new Error('Credenciais inválidas');
      (error as any).statusCode = 401;
      throw error;
    }

    const passwordMatch = await bcrypt.compare(password, (user as any).password);

    if (!passwordMatch) {
      const error = new Error('Credenciais inválidas');
      (error as any).statusCode = 401;
      throw error;
    }

    return user;
  }
}
