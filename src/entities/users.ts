import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity('users')
@Unique(['empCode'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  empCode?: string;

  @Column({ type: 'bigint', nullable: true })
  divisionId?: bigint;

  @Column({ type: 'varchar', length: 255, nullable: true })
  level?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({ type: 'bigint', nullable: false })
  mobile!: bigint;

  @Column({ type: 'bigint', nullable: true })
  whatsappNumber?: bigint;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt!: Date;
}
