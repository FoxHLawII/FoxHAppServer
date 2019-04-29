import { Router, Request, Response } from 'express';

import { environments as ENV } from '@env/environments';
import { registerAndLoginEmailValidator } from '../middlewares/validators';
import { COOKIE_SESSION } from '../constants';
import * as authService from '../services/auth';

const router = Router();

router.get('/login', (req: Request, res: Response) => res.redirect(`${ENV.front_url}${ENV.front_routes.login}`));

router.post('/register/email', registerAndLoginEmailValidator, (req: Request, res: Response) => {
  const { email, password } = req.body;
  authService.registerWithEmailAndPassword(email, password)
    .then(session => {
      res.cookie(COOKIE_SESSION, session.sessionId);
      res.json({success: true, message: 'User registered', data: {...session, token: 'generated'}});
    })
    .catch(errors => res.json({success:false, errors}));
});

router.post('/login/email', registerAndLoginEmailValidator, (req: Request, res: Response) => {
  const { email, password } = req.body;
  authService.loginWithEmailAndPassword(email, password)
    .then(session => {
      res.cookie(COOKIE_SESSION, session.sessionId);
      res.json({success: true, message: 'User logged', data: {...session, token: 'generated'}});
    })
    .catch(errors => res.json({success: false, errors}));
});

router.get('/login/token', (req: Request, res: Response) => {
  const sessionId = req.cookies[COOKIE_SESSION];
  const session = authService.loginWithSessionId(sessionId);
  if (!!session) res.json({success: true, message: 'User logged', data: {...session, token: 'generated'}});
  else res.json({success: false, message: 'Invalid session'});
})

router.get('/logout', (req: Request, res: Response) => {
  const sessionId = req.cookies[COOKIE_SESSION];
  authService.logout(sessionId).then(() => {
    res.clearCookie(COOKIE_SESSION);
    res.json({success: true, message: 'Signed out'});
  });
})

export default router;