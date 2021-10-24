// todaa regra de negócio fica aqui

import axios from "axios";
import prismaClient from "../prisma";
import { sign } from 'jsonwebtoken';

/*
- Receber o código - code(string)
- Recuperar o access token no github
-  Verificar se o usuário existe no banco de dados
- Recuperar infos do usuário no github
---- Sim: gera um token
---- Não: cria no banco de dados e gera um token
- Retornar o token com as infos do usuário logado
*/

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string,
  login: string,
  id: number,
  name: string,
}

class AuthenticateUserService {
  // para todo service criar um função execute
  async execute(code: string) {
    // url para acessar o access token
    const url = 'https://github.com/login/oauth/access_token';

    // chamada
    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      // parametros necessários para acessar o token
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        'Accept': 'application/json'
      }
    })

    //pegar infos do usuário no github
    const response = await axios.get<IUserResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    });

    const { login, id, avatar_url, name } = response.data;

    // procura no banco
    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id
      }
    });

    // se não existir cria no banco
    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name
        }
      });
    }

    // criando token
    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        }
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d"
      }
    )

    return { token, user };
  }
}

// export assim facilita na hora do autoimport do vscode
export { AuthenticateUserService }