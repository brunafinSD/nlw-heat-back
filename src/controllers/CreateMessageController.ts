import { Request, Response } from 'express';
import { CreateMessageService } from '../services/CreateMessageService';

class CreateMessageController {
  // para todo controle faz um método handle
  async handle(request: Request, response: Response) {
    const { message } = request.body;
    // antes de chegar aqui no controller já foi verificado a autenticação no middleware ensureAuthenticated para depois chamar esse aqui
    const { user_id } = request;
    const service = new CreateMessageService();

    const result = await service.execute(message, user_id);

    return response.json(result);
  }
}

export { CreateMessageController };