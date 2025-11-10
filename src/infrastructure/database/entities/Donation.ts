import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Patient } from './Patient';

export enum DonationStatus {
  PENDING = 'pending',
  RECEIVED = 'received',
}

export enum DonationType {
  MEDICINE = 'medicine',
  SUPPLIES = 'supplies',
  EQUIPMENT = 'equipment',
  MONEY = 'money',
  FOOD = 'food',
  CLOTHES = 'clothes',
  OTHER = 'other',
}

@Entity()
export class Donation {
  @PrimaryGeneratedColumn()
  id!: number;

  // Relação opcional com paciente (caso o doador seja também um paciente)
  @Column({ type: 'int', name: 'patient_id', nullable: true })
  patientId?: number;

  @ManyToOne(() => Patient, (patient) => patient.donations, { nullable: true })
  @JoinColumn({ name: 'patient_id' })
  patient?: Patient;

  // Dados do Doador (obrigatórios)
  @Column({ type: 'varchar', length: 255, name: 'donor_name', nullable: true })
  donorName!: string;

  @Column({ type: 'varchar', length: 14, name: 'donor_cpf', nullable: true })
  donorCpf?: string;

  @Column({ type: 'varchar', length: 18, name: 'donor_cnpj', nullable: true })
  donorCnpj?: string;

  @Column({ type: 'varchar', length: 20, name: 'donor_phone', nullable: true })
  donorPhone?: string;

  @Column({ type: 'varchar', length: 20, name: 'donor_type', default: 'individual' })
  donorType!: string; // 'individual' ou 'company'

  // Endereço completo
  @Column({ type: 'varchar', length: 9, name: 'donor_zip_code', nullable: true })
  donorZipCode?: string;

  @Column({ type: 'varchar', length: 255, name: 'donor_street', nullable: true })
  donorStreet?: string;

  @Column({ type: 'varchar', length: 10, name: 'donor_number', nullable: true })
  donorNumber?: string;

  @Column({ type: 'varchar', length: 100, name: 'donor_complement', nullable: true })
  donorComplement?: string;

  @Column({ type: 'varchar', length: 100, name: 'donor_neighborhood', nullable: true })
  donorNeighborhood?: string;

  @Column({ type: 'varchar', length: 100, name: 'donor_city', nullable: true })
  donorCity?: string;

  @Column({ type: 'varchar', length: 2, name: 'donor_state', nullable: true })
  donorState?: string;

  // Dados da Doação
  @Column({ type: 'varchar', length: 255, name: 'item_description', nullable: true })
  itemDescription?: string;

  @Column({ type: 'int', nullable: true })
  quantity?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'estimated_value', nullable: true })
  estimatedValue?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @Column({
    type: 'enum',
    enum: DonationType,
    nullable: true,
  })
  type?: DonationType;

  @Column({ nullable: true })
  amount?: string;

  @Column({
    type: 'enum',
    enum: DonationStatus,
    default: DonationStatus.PENDING,
    nullable: true,
  })
  status?: DonationStatus;
}