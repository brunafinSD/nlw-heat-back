import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

class AuthenticateUserController {
  // para todo controle faz um método handle
  async handle(request: Request, response: Response) {

    const { code } = request.body;

    //instanciando a camada de serviço
    const service = new AuthenticateUserService();

    try {
      // armazena o resultado da função feita lá pelo service
      const result = await service.execute(code);
      // retorna o resultado em json
      return response.json(result);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { AuthenticateUserController };