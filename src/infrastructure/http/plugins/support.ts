'use strict';

import { FastifyInstance, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

// Define the user type for request
declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: number;
      role: string;
    };
  }
}

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

export default fp(async function (fastify: FastifyInstance) {
  if (!fastify.hasRequestDecorator('user')) {
    fastify.decorateRequest('user', null);
  }
});
