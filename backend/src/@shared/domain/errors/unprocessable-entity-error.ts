export class UnprocessableEntityError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = 'UnprocessableEntityError';
  }
}
