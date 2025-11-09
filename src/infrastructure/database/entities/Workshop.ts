import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Patient } from './Patient';

export enum WorkshopStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELLED = 'cancelled',
}

@Entity()
export class Workshop {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'weekday', nullable: true })
  weekday?: string;

  @Column({ name: 'start_time', nullable: true })
  startTime?: string;

  @Column({ name: 'end_time', nullable: true })
  endTime?: string;

  @ManyToMany(() => Patient, (patient) => patient.workshops)
  @JoinTable({
    name: 'patient_workshop',
    joinColumn: {
      name: 'workshop_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'patient_id', 
      referencedColumnName: 'id'
    }
  })
  participants: Patient[];

  @Column({
    type: 'enum',
    enum: WorkshopStatus,
    default: WorkshopStatus.ACTIVE,
  })
  status: WorkshopStatus;

  @Column({ type: 'int', nullable: true })
  participantsCount?: number;

  @CreateDateColumn()
  createdAt?: Date;
}
