
import { Action } from '../Action';
import { FastifyReply } from 'fastify';
import { GlobalConfig } from '../../application/config/globalConfig';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import EmailService from '../../infrastructure/services/EmailService';

export class ForgotPasswordAction extends Action {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
    private globalConfig: GlobalConfig,
  ) {
    super();
  }

  async execute(email: string, res: FastifyReply) {
    try {
      const user = await this.userRepository.getByEmail(email);
      console.log("user", user)

      if (!user) {
        throw new Error('Usuário não encontrado.');
      }

      const resetToken = await res.jwtSign(
        { id: user.id },
        {
          expiresIn: '1h',
        },
      );

      const resetLink = `${this.globalConfig.appUrl}/auth/redefinir-senha?token=${resetToken}`;

      await this.emailService.sendResetPasswordEmail(user.email, resetLink);
    } catch (e) {
      console.error(`Failed to sign in user: ${e.message}`, e);
      throw new Error(`Falied to reset password: ${e.message}`)
    }
  }
}
