import { FindManyOptions, ObjectLiteral } from 'typeorm';
import { Repository } from './Repository';
import { Database } from '../database';
import { Patient } from '../database/entities/Patient';

export class PatientRepository extends Repository {
  constructor(private db: Database) {
    super();
  }

  async getById(id: string | number) {
    const patientId = typeof id === 'string' ? parseInt(id, 10) : id;
    return await this.db.getEntity(Patient).findOne({
      where: { id: patientId },
      relations: ['appointments', 'loans', 'donations', 'workshops'],
    });
  }

  async getAll(condition: FindManyOptions<ObjectLiteral> = {}) {
    return this.db.getEntity(Patient).find({
      order: { createdAt: 'DESC' },
      relations: ['appointments', 'loans', 'donations', 'workshops'],
      ...condition,
    });
  }

  async getByIdWithRelations(patientId: string) {
    return await this.db.getEntity(Patient).findOne({
      where: { id: patientId },
      relations: ['appointments', 'loans', 'donations', 'workshops'],
    });
  }
  async add(obj: ObjectLiteral) {
    return this.db.getEntity(Patient).save(obj);
  }

  async delete(condition: ObjectLiteral) {
    console.log('condition', condition);
    return this.db.getEntity(Patient).createQueryBuilder().delete().where(condition).execute();
  }
}
