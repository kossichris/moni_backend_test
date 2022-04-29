import { UserEntity } from '@app/user/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum WalletCurrency {
  NGN = 'NGN',
}

@Entity({ name: 'wallets' })
export class WalletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  balance: number;

  @Column({})
  name: string;

  @Column({
    type: 'enum',
    enum: WalletCurrency,
    default: WalletCurrency.NGN,
  })
  currency: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimeStamp() {
    this.updatedAt = new Date();
  }

  @OneToOne(() => UserEntity, (user) => user.wallet)
  author: UserEntity;
}
