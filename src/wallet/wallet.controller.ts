import { BackendValidationPipe } from '@app/shared/backendValidation.pipe';
import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { UserEntity } from '@app/user/user.entity';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateWalletDto, TransferWalletDto } from './dto/createWallet.dto';
import { FundWalletDto } from './dto/fundWallet.dto';
import { UpdateWalletDto } from './dto/updateWallet.dto';
import { WalletResponsesInterface } from './types/walletResponse.interface';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @UsePipes(new BackendValidationPipe())
  @UseGuards(AuthGuard)
  async createWallet(
    @User() currentUser: UserEntity,
    @Body('wallet') walletDto: CreateWalletDto,
  ): Promise<WalletResponsesInterface> {
    console.log(walletDto);
    const wallet = await this.walletService.createWallet(
      currentUser,
      walletDto,
    );
    return this.walletService.buildWalletResponse(wallet);
  }

  @Put()
  @UsePipes(new BackendValidationPipe())
  @UseGuards(AuthGuard)
  async updateWallet(
    @Body('wallet') walletDto: UpdateWalletDto,
  ): Promise<WalletResponsesInterface> {
    const wallet = await this.walletService.updateWallet(walletDto);
    return this.walletService.buildWalletResponse(wallet);
  }

  @Post('fund')
  @UsePipes(new BackendValidationPipe())
  @UseGuards(AuthGuard)
  async fundWallet(
    @User('id') userId: string,
    @Body('wallet') fundDto: FundWalletDto,
  ): Promise<WalletResponsesInterface> {
    console.log(fundDto);
    const wallet = await this.walletService.fundWallet(fundDto);
    return this.walletService.buildWalletResponse(wallet);
  }

  @Post(':recipient_id/transfer')
  @UsePipes(new BackendValidationPipe())
  @UseGuards(AuthGuard)
  async transferMoney(
    @User('id') sender_id: string,
    @Param('recipient_id') recipient_id: string,
    @Body('wallet') transferObject: TransferWalletDto,
  ): Promise<any> {
    console.log(transferObject);
    return await this.walletService.transferMoney(
      sender_id,
      recipient_id,
      transferObject.amount,
    );
  }

  @Get('/user')
  @UsePipes(new BackendValidationPipe())
  @UseGuards(AuthGuard)
  async getUserWallet(
    @User('id') userId: number,
  ): Promise<WalletResponsesInterface> {
    const wallet = await this.walletService.getUserWallet(userId);
    return this.walletService.buildWalletResponse(wallet);
  }
}
