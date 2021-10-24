import { Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateMessageController } from './controllers/CreateMessageController';
import { GetLast3MessagesController } from './controllers/GetLast3MessagesController';
import { ProfileUserController } from './controllers/ProfileUserController';
import { ensureAuthenticated } from './middleware/ensureAuthenticated';

// nesse arquivo ficarão todas as rotas da aplicação

const router = Router();

// nesse caso automaticamente o express passa os parametros request e response para dentro do método handle
router.post('/authenticate', new AuthenticateUserController().handle);

router.post('/messages', ensureAuthenticated, new CreateMessageController().handle)

router.get('/messages/last3', new GetLast3MessagesController().handle)

router.get('/profile', ensureAuthenticated, new ProfileUserController().handle)

export { router }