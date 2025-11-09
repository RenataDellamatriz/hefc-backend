import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany, 
} from 'typeorm';
import { Appointment } from './Appointment';
import { Loan } from './Loan';
import { Donation } from './Donation';
import { Workshop } from './Workshop';

export enum PatientType {
  FAMILY = 'family',
  CANCER = 'cancer',
  OTHER = 'other',
}

export enum PatientStatus {
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
}

export interface Child {
  name: string;
  age: number;
}

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: PatientType,
  })
  type: PatientType;

  @Column({
    type: 'enum',
    enum: PatientStatus,
  })
  status: PatientStatus;

  @Column({ type: 'date', name: 'birth_date', nullable: true })
  birthDate?: Date;

  @Column({ nullable: true })
  cpf?: string;

  @Column({ nullable: true })
  rg?: string;

  @Column({ name: 'full_address', nullable: true })
  address?: string;

  @Column({ nullable: true })
  zipCode?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ name: 'marital_status', nullable: true })
  maritalStatus?: string;

  @Column({ name: 'spouse_name', nullable: true })
  spouseName?: string;

  @Column({ type: 'jsonb', nullable: true })
  children?: Child[];

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];

  @OneToMany(() => Loan, (loan) => loan.patient)
  loans: Loan[];

  @OneToMany(() => Donation, (donation) => donation.patient)
  donations: Donation[];

  @ManyToMany(() => Workshop, (workshop) => workshop.participants)
  workshops: Workshop[];

  @CreateDateColumn()
  createdAt?: Date;
}
