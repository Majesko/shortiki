import { customAlphabet } from 'nanoid';
import { injectable } from 'inversify';

@injectable()
export class NanoidService {
  private readonly nanoid: () => string;

  constructor() {
    // Customize Nanoid to generate 6-character alphanumeric strings
    this.nanoid = customAlphabet(
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      6,
    );
  }

  generate(): string {
    return this.nanoid();
  }
}
