import { FastifyInstance } from 'fastify';
import { Routes } from './Routes';
import { AuthMiddleware } from '../http/middlewares/AuthMiddleware';
import { AddUserController } from '../http/controllers/user/AddUserController';
import { GetAllUsersController } from '../http/controllers/user/GetAllUsersController';
import { SignInController } from '../http/controllers/user/SignInController';
import { DeleteUserController } from '../http/controllers/user/DeleteUserController';
import { GetUserController } from '../http/controllers/user/GetUserController';
import { ForgotPasswordController } from '../http/controllers/user/ForgotPasswordController';
import { ResetPasswordController } from '../http/controllers/user/ResetPasswordController';

export default class UserRoutes implements Routes {
  constructor(
    private authMiddleware: AuthMiddleware,
    private addUserController: AddUserController,
    private getAllUsersController: GetAllUsersController,
    private getUserController: GetUserController,
    private signInController: SignInController,
    private deleteUserController: DeleteUserController,
    private forgotPasswordController: ForgotPasswordController,
    private resetPasswordController: ResetPasswordController
  ) {}

  routes(fastify: FastifyInstance) {
    fastify.post(
      '/user/signup',
      {
        schema: this.addUserController.validateSchema(),
        preValidation: [
          this.authMiddleware.authenticate({ jwt: true }),
          this.authMiddleware.requireAdmin(),
        ],
      },
      this.addUserController.handle.bind(this.addUserController),
    );

    fastify.post(
      '/user/signin',
      {
        schema: this.signInController.validateSchema(),
      },
      this.signInController.handle.bind(this.signInController),
    );

    fastify.get(
      '/user/all',
      {
        schema: this.getAllUsersController.validateSchema(),
        preValidation: [this.authMiddleware.authenticate({ jwt: true })],
      },
      this.getAllUsersController.handle.bind(this.getAllUsersController),
    );

    fastify.get(
      '/user',
      {
        schema: this.getUserController.validateSchema(),
        preValidation: [this.authMiddleware.authenticate({ jwt: true })],
      },
      this.getUserController.handle.bind(this.getUserController),
    );

    fastify.delete(
      '/user/:id',
      {
        schema: this.deleteUserController.validateSchema(),
        preValidation: [
          this.authMiddleware.authenticate({ jwt: true }),
          this.authMiddleware.requireAdmin(),
        ],
      },
      this.deleteUserController.handle.bind(this.deleteUserController),
    );

    fastify.post(
      '/user/forgot-password',
      {
        schema: this.forgotPasswordController.validateSchema(),
      },
      this.forgotPasswordController.handle.bind(this.forgotPasswordController),
    );
    fastify.post(
      '/user/reset-password',
      {
        schema: this.resetPasswordController.validateSchema(),
        preValidation: this.authMiddleware.authenticate({ jwt: true }),
      },
      this.resetPasswordController.handle.bind(this.resetPasswordController),
    );
  }
}
