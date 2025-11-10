import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from './Patient';

export type LoanStatus = 'pending' | 'returned' | 'overdue';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'patient_id', nullable: true })
  patientId?: number;

  @ManyToOne(() => Patient, (patient) => patient.loans, { nullable: true })
  @JoinColumn({ name: 'patient_id' })
  patient?: Patient;

  // Dados da Pessoa (obrigatórios - pode ser paciente ou não)
  @Column({ type: 'varchar', length: 255, name: 'person_name', nullable: true })
  personName!: string;

  @Column({ type: 'varchar', length: 14, name: 'person_cpf', nullable: true })
  personCpf?: string;

  @Column({ type: 'varchar', length: 18, name: 'person_cnpj', nullable: true })
  personCnpj?: string;

  @Column({ type: 'varchar', length: 20, name: 'person_phone', nullable: true })
  personPhone?: string;

  @Column({ type: 'varchar', length: 20, name: 'person_type', default: 'individual' })
  personType!: string; // 'individual' ou 'company'

  // Endereço completo
  @Column({ type: 'varchar', length: 9, name: 'person_zip_code', nullable: true })
  personZipCode?: string;

  @Column({ type: 'varchar', length: 255, name: 'person_street', nullable: true })
  personStreet?: string;

  @Column({ type: 'varchar', length: 10, name: 'person_number', nullable: true })
  personNumber?: string;

  @Column({ type: 'varchar', length: 100, name: 'person_complement', nullable: true })
  personComplement?: string;

  @Column({ type: 'varchar', length: 100, name: 'person_neighborhood', nullable: true })
  personNeighborhood?: string;

  @Column({ type: 'varchar', length: 100, name: 'person_city', nullable: true })
  personCity?: string;

  @Column({ type: 'varchar', length: 2, name: 'person_state', nullable: true })
  personState?: string;

  // Dados do Empréstimo
  @Column({ type: 'varchar', length: 255, nullable: true })
  item?: string;

  @Column({ type: 'int', nullable: true })
  quantity?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit?: string;

  @Column({ type: 'date', name: 'loan_date', nullable: true })
  loanDate?: Date;

  @Column({ type: 'boolean', name: 'signed_declaration', default: false })
  signedDeclaration: boolean;

  @Column({ type: 'timestamp', nullable: true, name: 'return_date' })
  returnDate?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'patient_name' })
  patientName?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  equipment?: string;

  @Column({ type: 'enum', enum: ['pending', 'returned', 'overdue'], nullable: true })
  status?: LoanStatus;

  @CreateDateColumn()
  createdAt?: Date;
}