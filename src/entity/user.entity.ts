import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column({ default: 'user' })
  role: string;

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

  @BeforeInsert()
  async hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @BeforeUpdate()
  async hashNewPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }
}
