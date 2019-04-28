import { Router, Request, Response } from 'express';

import { environments as ENV } from '@env/environments';
import { registerEmailValidator } from '../middlewares/validators';
import authService from '../services/auth';

const router = Router();

router.get('/login', (req: Request, res: Response) => res.redirect(`${ENV.front_url}${ENV.front_routes.login}`));

router.post('/register/email', registerEmailValidator, (req: Request, res: Response) => {
  const { email, password } = req.body;
  authService.registerWithEmailAndPassword(email, password)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

router.post('/login/email', registerEmailValidator, (req: Request, res: Response) => {
  const { email, password } = req.body;
  authService.registerWithEmailAndPassword(email, password)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

export default router;