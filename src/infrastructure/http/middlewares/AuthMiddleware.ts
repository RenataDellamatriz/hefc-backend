import { FastifyRequest } from 'fastify';
import { AwilixResolver } from '../../resolver';

export class AuthMiddleware extends AwilixResolver {
  authenticate({ jwt = false } = {}) {
    return async (req: FastifyRequest) => {
      if (jwt) {
        if (req.headers['authorization']) {
          return this.authenticateJWT(req);
        }
        const error = new Error('Unauthorized JWT');
        (error as any).statusCode = 401;
        throw error;
      }
    };
  }

  async authenticateJWT(req: FastifyRequest) {
    try {
      const jwt = await req.jwtVerify() as any;
      req.user = {
        id: jwt['id'],
        role: jwt['role'],
      };
    } catch (err) {
      throw new Error('Unauthorized JWT');
    }
  }

  requireAdmin() {
    return async (req: FastifyRequest) => {
      const user = req.user as any;
      if (!user || user.role !== 'admin') {
        const error = new Error('Forbidden: Admin access required');
        (error as any).statusCode = 403;
        throw error;
      }
    };
  }
}
