export type Post = {
    title: string;
    body: string;
    userId: number | undefined;
    id: number | undefined;
  };

  export type User = {
    "id": number,
    "name": string,
    "username": string,
    "email": string,
    "address": object
  }