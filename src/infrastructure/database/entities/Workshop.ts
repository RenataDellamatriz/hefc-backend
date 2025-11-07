import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
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
  descricao?: string;

  @Column({ name: 'dia_semana', nullable: true })
  diaSemana?: string;

  @Column({ name: 'horario_inicio', nullable: true })
  horarioInicio?: string;

  @Column({ name: 'horario_fim', nullable: true })
  horarioFim?: string;

  @ManyToMany(() => Patient, (patient) => patient.oficinas)
  participantes: Patient[];

  @Column({
    type: 'enum',
    enum: WorkshopStatus,
    default: WorkshopStatus.ACTIVE,
  })
  status: WorkshopStatus;

  @Column({ name: 'weekday', nullable: true })
  weekday?: string;

  @Column({ name: 'start_time', nullable: true })
  startTime?: string;

  @Column({ name: 'end_time', nullable: true })
  endTime?: string;

  @Column({ type: 'int', nullable: true })
  participants?: number;

  @CreateDateColumn()
  createdAt?: Date;
}
