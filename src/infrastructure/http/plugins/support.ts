'use strict';

import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

// Properly type JWT user via @fastify/jwt module augmentation
declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: number;
      role: string;
    };
  }
}

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

export default fp(async function (_fastify: FastifyInstance) {
  // No-op: relying on @fastify/jwt to set request.user after jwtVerify
});
