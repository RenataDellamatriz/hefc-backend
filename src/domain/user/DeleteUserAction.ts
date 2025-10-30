import { Action } from '../Action';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';

export class DeleteUserAction extends Action {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async execute(userId: number) {
    try {
      // First, check if user exists
      const user = await this.userRepository.getById(String(userId));
      if (!user) {
        const error = new Error('Usuário não encontrado');
        (error as any).statusCode = 404;
        throw error;
      }

      // Check if user is admin - admins cannot be deleted
      if ((user as any).role === 'admin') {
        const error = new Error('Não é possível remover um administrador');
        (error as any).statusCode = 403;
        throw error;
      }

      // Delete the user
      await this.userRepository.delete({ id: userId });
      return { message: 'Usuário removido com sucesso' };
    } catch (e: any) {
      if (e.statusCode) {
        throw e;
      }
      throw new Error(e as any);
    }
  }
}

