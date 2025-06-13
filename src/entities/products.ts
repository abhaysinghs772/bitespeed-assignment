import 'reflect-metadata';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: number;

  @Column({ type: 'bigint' })
  user_id!: number;

  @Column({ type: 'bigint' })
  category_id!: number;

  @Column({ type: 'bigint', nullable: true })
  sub_category_id!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  slug!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  brand_name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  sku!: string;

  @Column({ type: 'varchar', length: 255 })
  apc!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  specification?: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt?: Date;
}
