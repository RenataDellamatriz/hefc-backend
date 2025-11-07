import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from './Patient';

export type LoanStatus = 'pending' | 'returned';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'paciente_id', nullable: true })
  pacienteId?: number;

  @ManyToOne(() => Patient, (patient) => patient.emprestimos, { nullable: true })
  @JoinColumn({ name: 'paciente_id' })
  paciente?: Patient;

  @Column({ type: 'varchar', length: 255, nullable: true })
  item?: string;

  @Column({ type: 'int', nullable: true })
  quantidade?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unidade?: string;

  @Column({ type: 'date', name: 'data_emprestimo', nullable: true })
  dataEmprestimo?: Date;

  @Column({ type: 'date', name: 'data_devolucao_prevista', nullable: true })
  dataDevolucaoPrevista?: Date;

  @Column({ type: 'boolean', name: 'declaracao_assinada', default: false })
  declaracaoAssinada: boolean;

  @Column({ type: 'timestamp', nullable: true, name: 'loan_date' })
  loanDate?: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'return_date' })
  returnDate?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'patient_name' })
  patientName?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  equipment?: string;

  @Column({ type: 'enum', enum: ['pending', 'returned'], nullable: true })
  status?: LoanStatus;

  @CreateDateColumn()
  createdAt?: Date;
}
