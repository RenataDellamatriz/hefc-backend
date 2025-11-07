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

  @Column({ type: 'int', name: 'paciente_id', nullable: true })
  pacienteId?: number;

  @ManyToOne(() => Patient, (patient) => patient.doacoes, { nullable: true })
  @JoinColumn({ name: 'paciente_id' })
  paciente?: Patient;

  @Column({ type: 'varchar', length: 255, name: 'descricao_item', nullable: true })
  descricaoItem?: string;

  @Column({ type: 'int', nullable: true })
  quantidade?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unidade?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'valor_estimado', nullable: true })
  valorEstimado?: string;

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
