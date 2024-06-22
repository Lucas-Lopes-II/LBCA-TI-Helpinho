export interface IJsonWebToken<
  O = unknown,
  D = unknown,
  J = unknown,
  V = unknown,
> {
  sign(payload: string | Buffer | object, options?: O): string;

  decode(token: string, options?: D): null | J;

  verify<T extends object = any>(token: string, options?: V): T;
}
