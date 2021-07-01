import express from 'express';
import session from 'express-session';
import next from 'next';

import { initRouter } from './routes';
import { initSession } from './config/session';
import { initMiddleware } from './middleware';
import passport from './config/passport';
import { config } from './config';

const { HOST, PORT, IS_PROD } = config;
const dev = !IS_PROD;

const app = next({ dev });

(async () => {
  try {
    await app.prepare();
    const server = express();
    const handle = app.getRequestHandler();
    
    server.all('*', (req, res) => {
      return handle(req, res)
    });

    initMiddleware(server, express);
    initSession(server, session);

    // server.use(passport.initialize());
    // server.use(passport.session());

    initRouter(app, server);

    server.listen(PORT, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${PORT} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
