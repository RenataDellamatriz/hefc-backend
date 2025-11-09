import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Patient } from './Patient';
import { LoanContact } from './LoanContact';

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

  @Column({ type: 'varchar', length: 255, nullable: true })
  item?: string;

  @Column({ type: 'int', nullable: true })
  quantity?: number;

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

  @Column({ type: 'enum', enum: ['pending', 'returned'], nullable: true })
  status?: LoanStatus;

  @CreateDateColumn()
  createdAt?: Date;

  @OneToMany(() => LoanContact, (contact) => contact.loan, {
    cascade: true,
    eager: true,
  })
  contacts: LoanContact[];
}
