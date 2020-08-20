import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
} from 'typeorm';
@Entity()
export class CommentsProduct {
  @PrimaryGeneratedColumn('uuid')
  commentId: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  productId: string;

  @Column('uuid', { nullable: true })
  parentId: string;

  @Column()
  content: string;

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

  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp' })
  deletedAt: Date;
}
