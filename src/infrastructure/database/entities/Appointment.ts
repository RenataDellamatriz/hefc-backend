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

  @Column({ type: 'int', name: 'paciente_id', nullable: true })
  pacienteId?: number;

  @ManyToOne(() => Patient, (patient) => patient.atendimentos, { nullable: true })
  @JoinColumn({ name: 'paciente_id' })
  paciente?: Patient;

  @Column({ type: 'date', name: 'data', nullable: true })
  data?: Date;

  @Column({ type: 'timestamp', name: 'appointment_date', nullable: true })
  appointmentDate?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  patientName?: string;

  @Column({ type: 'enum', enum: ['cancer', 'family', 'other'], nullable: true })
  type?: AppointmentType;

  @Column({ type: 'enum', enum: ['ongoing', 'completed'], nullable: true })
  status?: AppointmentStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profissional?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  especialidade?: string;

  @Column({ type: 'text', nullable: true })
  observacoes?: string;

  @CreateDateColumn()
  createdAt?: Date;
}
