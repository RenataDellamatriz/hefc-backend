import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from './Patient';

export type AppointmentType = 'cancer' | 'family' | 'other';
export type AppointmentStatus = 'ongoing' | 'completed';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'patient_id', nullable: true })
  patientId?: number;

  @ManyToOne(() => Patient, (patient) => patient.appointments, { nullable: true })
  @JoinColumn({ name: 'patient_id' })
  patient?: Patient;

  @Column({ type: 'timestamp', name: 'appointment_date', nullable: true })
  appointmentDate?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  patientName?: string;

  @Column({ type: 'enum', enum: ['cancer', 'family', 'other'], nullable: true })
  type?: AppointmentType;

  @Column({ type: 'enum', enum: ['ongoing', 'completed'], nullable: true })
  status?: AppointmentStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  professional?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  specialty?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt?: Date;
}
