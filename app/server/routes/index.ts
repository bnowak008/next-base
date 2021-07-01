import { initAuthRoutes, isAuth } from './auth';
import apiRouter from './api';

export const initRouter = (app, server) => {
  const handle = app.getRequestHandler();

  server.use(apiRouter);
 initAuthRoutes(server);

  server.all(
    '*',
    isAuth,
    (req, res, next) => {
      return handle(req, res);
    },
  );
};
