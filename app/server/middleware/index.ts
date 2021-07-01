import cookieParser from 'cookie-parser';
import helmet from 'helmet';

export const initMiddleware = (app, express) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  // app.use(helmet());
  app.use(express.static(__dirname + '/../../public'));
};
