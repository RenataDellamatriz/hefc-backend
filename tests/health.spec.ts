import { Container } from '../src/infrastructure/container';
import { HttpServer } from '../src/infrastructure/http/HttpServer';
import { ApiRouter } from '../src/infrastructure/routes/ApiRouter';

describe('Health routes', () => {
  let container: Container;
  let server: HttpServer;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    container = new Container();
    await container.loadContainers();
    server = container.resolve<HttpServer>('httpServer');
    const apiRouter = container.resolve<ApiRouter>('apiRouter');
    await server.init({ logger: false });
    apiRouter.loadRoutes(server.fastify);
  });

  afterAll(async () => {
    await container.dispose();
  });

  it('GET /health/alive should return 200', async () => {
    const res = await server.fastify.inject({ method: 'GET', url: '/health/alive' });
    expect(res.statusCode).toBe(200);
  });

  it('GET /health/ready should return 200', async () => {
    const res = await server.fastify.inject({ method: 'GET', url: '/health/ready' });
    expect(res.statusCode).toBe(200);
  });
});


