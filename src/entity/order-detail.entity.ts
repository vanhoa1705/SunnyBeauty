import { Order } from 'src/entity/orders.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  orderId: string;

  @Column('uuid')
  productId: string;

  @Column()
  name: string;

  @Column()
  unitPrice: number;

  @Column()
  quantity: number;

  @Column()
  amount: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Date;
}
