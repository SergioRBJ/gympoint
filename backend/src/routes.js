import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlansController';
import RegistrationController from './app/controllers/RegistrationController';
import AnswerController from './app/controllers/AnswerController';
import UserController from './app/controllers/UserController';
import HelpController from './app/controllers/HelpController';
import CheckInController from './app/controllers/CheckInController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get('/students/:id/checkins', CheckInController.index);
routes.post('/students/:id/checkins', CheckInController.store);

routes.get('/students/:id/help', HelpController.index);
routes.post('/students/:id/help', HelpController.store);

routes.use(authMiddleware);

// Users

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

// Manage Students
routes.get('/students', StudentController.index);
routes.post('/student', StudentController.store);
routes.put('/student', StudentController.update);

// Plans

routes.post('/plans', PlanController.store);
routes.put('/plans', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);
routes.get('/plans', PlanController.index);

// Registrations

routes.get('/registrations', RegistrationController.index);
routes.post('/registrations', RegistrationController.store);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

// Help Orders

routes.get('/help', AnswerController.index);
routes.get('/students/:id/help', AnswerController.show);
routes.post('/help/:id/answer', AnswerController.store);

export default routes;
