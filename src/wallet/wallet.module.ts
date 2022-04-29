import { UserEntity } from '@app/user/user.entity';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletController } from './wallet.controller';
import { WalletEntity } from './wallet.entity';
import { WalletService } from './wallet.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([WalletEntity, UserEntity])],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
