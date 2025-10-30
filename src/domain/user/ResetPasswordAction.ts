import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { Action } from '../Action';
import bcrypt from 'bcrypt';


export class ResetPasswordAction extends Action {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async execute(userId: string, newPassword: string) {
    try {
      const user = await this.userRepository.getById(userId);

      if (!user) {
        throw new Error('Usuário não encontrado.');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await this.userRepository.update(
        { id: userId },
        { password: hashedPassword }
      );

      return { message: 'Senha redefinida com sucesso.' };
    } catch (e) {
      console.error(`Failed to sign in user: ${e.message}`, e);
      throw new Error(e.message);
    }
  }
}
