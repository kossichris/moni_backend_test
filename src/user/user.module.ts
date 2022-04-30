import { Module } from '@nestjs/common';
import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { WalletService } from '@app/wallet/wallet.service';
import { WalletModule } from '@app/wallet/wallet.module';
import { WalletEntity } from '@app/wallet/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WalletEntity]), WalletModule],
  controllers: [UserController],
  providers: [UserService, WalletService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
