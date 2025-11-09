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

  @Column({ type: 'int', name: 'patient_id', nullable: true })
  patientId?: number;

  @ManyToOne(() => Patient, (patient) => patient.donations, { nullable: true })
  @JoinColumn({ name: 'patient_id' })
  patient?: Patient;

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
