import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
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

export interface Filho {
  nome: string;
  idade: number;
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

  @Column({ name: 'nome_completo', nullable: true })
  nomeCompleto?: string;

  @Column({ type: 'date', name: 'data_nascimento', nullable: true })
  dataNascimento?: Date;

  @Column({ nullable: true })
  cpf?: string;

  @Column({ nullable: true })
  rg?: string;

  @Column({ name: 'endereco_completo', nullable: true })
  enderecoCompleto?: string;

  @Column({ nullable: true })
  cep?: string;

  @Column({ nullable: true })
  telefone?: string;

  @Column({ name: 'estado_civil', nullable: true })
  estadoCivil?: string;

  @Column({ name: 'nome_esposa', nullable: true })
  nomeEsposa?: string;

  @Column({ type: 'jsonb', nullable: true })
  filhos?: Filho[];

  @OneToMany(() => Appointment, (appointment) => appointment.paciente)
  atendimentos: Appointment[];

  @OneToMany(() => Loan, (loan) => loan.paciente)
  emprestimos: Loan[];

  @OneToMany(() => Donation, (donation) => donation.paciente)
  doacoes: Donation[];

  @ManyToMany(() => Workshop, (workshop) => workshop.participantes)
  @JoinTable({
    name: 'paciente_oficina',
    joinColumn: { name: 'paciente_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'oficina_id', referencedColumnName: 'id' },
  })
  oficinas: Workshop[];

  @CreateDateColumn()
  createdAt?: Date;
}
