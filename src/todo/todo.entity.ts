import { hash } from 'bcrypt';

export class Todo {
  private _hashedId: string;

  constructor(
    private readonly _name: string,
    private readonly _status: string,
  ) {}

  get name(): string {
    return this._name;
  }

  get status(): string {
    return this._status;
  }

  get hashedId(): string {
    return this._hashedId;
  }

  public async setHashedId(salt: number): Promise<void> {
    try {
      const id = this.generateUniqueId();
      const hashedId = await hash(id, salt);
      this._hashedId = hashedId;
    } catch (error) {
      console.error('Error generating and hashing ID:', error);
      throw error;
    }
  }

  private generateUniqueId(): string {
    return String(Date.now());
  }
}
