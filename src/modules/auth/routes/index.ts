import { Router, Request, Response } from 'express';

import { environments as ENV } from '@env/environments';
import { registerAndLoginEmailValidator } from '../middlewares/validators';
import { COOKIE_SESSION } from '../constants';
import * as authService from '../services/auth';

const router = Router();

router.get('/login', (req: Request, res: Response) => res.redirect(`${ENV.front_url}${ENV.front_routes.login}`));

router.post('/login/email', registerAndLoginEmailValidator, (req: Request, res: Response) => {
  const { email, password } = req.body;
  authService.loginWithEmailAndPassword(email, password)
    .then(session => {
      res.cookie(COOKIE_SESSION, session.sessionId);
      res.json({message: 'User logged', data: {...session, token: 'generated'}});
    })
    .catch(errors => res.status(500).json(errors));
});

router.get('/login/token', (req: Request, res: Response) => {
  const sessionId = req.cookies[COOKIE_SESSION];
  const session = authService.loginWithSessionId(sessionId);
  if (!!session) res.status(200).json({message: 'User logged', data: {...session, token: 'generated'}});
  else res.status(400).json({message: 'Invalid session'});
});

router.post('/register/email', registerAndLoginEmailValidator, (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  authService.registerWithEmailAndPassword(name, email, password)
    .then(session => {
      res.cookie(COOKIE_SESSION, session.sessionId);
      res.status(200).json({message: 'User registered', data: {...session, token: 'generated'}});
    })
    .catch(errors => res.status(500).json(errors));
});

router.get('/logout', (req: Request, res: Response) => {
  const sessionId = req.cookies[COOKIE_SESSION];
  authService.logout(sessionId).then(() => {
    res.clearCookie(COOKIE_SESSION);
    res.status(200).json({message: 'Signed out'});
  });
});

export default router;