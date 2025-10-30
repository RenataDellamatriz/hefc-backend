import { FindManyOptions, ObjectLiteral } from 'typeorm';
import { Repository } from './Repository';
import { Database } from '../database';
import { User } from '../database/entities/User';

export class UserRepository extends Repository {
  constructor(private db: Database) {
    super();
  }

  async getById(userId: string) {
    return await this.db.getEntity(User).findOneBy({ id: parseInt(userId) });
  }

  async getByEmail(email: string) {
    return await this.db.getEntity(User).findOneBy({ email });
  }

  async getAll(condition: FindManyOptions<ObjectLiteral>) {
    return this.db.getEntity(User).find({ order: { createdAt: 'DESC' }, ...condition });
  }

  async add(obj: ObjectLiteral) {
    return this.db.getEntity(User).save(obj);
  }

  async update(condition: ObjectLiteral, updates: ObjectLiteral) {
    return this.db.getEntity(User).update(condition, updates);
  }

  async delete(condition: ObjectLiteral) {
    return this.db.getEntity(User).createQueryBuilder().delete().where(condition).execute();
  }
}

