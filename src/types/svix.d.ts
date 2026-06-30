declare module "svix" {
  export class Webhook {
    constructor(secret: string);
    verify(body: string, headers: Record<string, string>): unknown;
  }
}
