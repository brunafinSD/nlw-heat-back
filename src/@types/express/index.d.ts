// sobrescreve as tipagens padrões de express, pega tudo de Request + user_id

declare namespace Express{
  export interface Request{
    user_id: string;
  }
}