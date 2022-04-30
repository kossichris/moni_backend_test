import { UserEntity } from '@app/user/user.entity';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateWalletDto } from './dto/createWallet.dto';
import { FundWalletDto } from './dto/fundWallet.dto';
import { UpdateWalletDto } from './dto/updateWallet.dto';
import {
  TransferResponsesInterface,
  WalletResponsesInterface,
} from './types/walletResponse.interface';
import { WalletEntity } from './wallet.entity';

const c = console.log.bind(console);

@Injectable()
export class WalletService {
  @Inject(ConfigService)
  public config: ConfigService;

  @InjectRepository(WalletEntity)
  private readonly walletRepository: Repository<WalletEntity>;
  private readonly userRepository: Repository<UserEntity>;

  async getUserWallet(userId: number): Promise<WalletEntity> {
    const queryBuilder = getRepository(WalletEntity)
      .createQueryBuilder('wallets')
      .leftJoinAndSelect('wallets.author', 'author')
      .where('author.id = :id', { id: userId });

    const wallet = await queryBuilder.getOne();
    return wallet;
  }

  async createWallet(
    currentUser: UserEntity,
    walletDto: CreateWalletDto,
  ): Promise<WalletEntity> {
    const wallet = new WalletEntity();

    const walletFromDb = await this.walletRepository.findOne({
      name: walletDto.name,
    });

    if (walletFromDb) {
      throw new HttpException(
        'A wallet of same name already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    Object.assign(wallet, walletDto);
    wallet.author = currentUser;
    return await this.walletRepository.save(wallet);
  }

  async updateWallet(updateWalletDto: UpdateWalletDto): Promise<WalletEntity> {
    const wallet = new WalletEntity();
    Object.assign(wallet, updateWalletDto);
    return await this.walletRepository.save(wallet);
  }

  async fundWallet(fundWalletDto: FundWalletDto): Promise<WalletEntity> {
    const wallet = await this.walletRepository.findOne({
      name: fundWalletDto.name,
    });
    if (!wallet) {
      throw new HttpException(
        'Provide a valid wallet',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const walletEntity = new WalletEntity();
    Object.assign(walletEntity, wallet);
    walletEntity.balance = walletEntity.balance + fundWalletDto.balance;
    return await this.walletRepository.save(walletEntity);
  }

  async transferMoney(
    sender_id: string,
    recipient_id: string,
    amount: number,
  ): Promise<TransferResponsesInterface> {
    const queryBuilderSender = getRepository(WalletEntity)
      .createQueryBuilder('wallets')
      .leftJoinAndSelect('wallets.author', 'author')
      .where('author.id = :id', { id: sender_id });

    const queryBuilderReceiver = getRepository(WalletEntity)
      .createQueryBuilder('wallets')
      .leftJoinAndSelect('wallets.author', 'author')
      .where('author.id = :id', { id: recipient_id });

    const senderWallet = await queryBuilderSender.getOne();
    const receiverWallet = await queryBuilderReceiver.getOne();

    if (amount > senderWallet.balance) {
      throw new HttpException(
        'Your balance is not sufficient',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    senderWallet.balance = senderWallet.balance - amount;
    receiverWallet.balance = receiverWallet.balance + amount;

    await this.walletRepository.save(senderWallet);
    await this.walletRepository.save(receiverWallet);

    return { senderWallet, receiverWallet };
  }

  buildWalletResponse(wallet: WalletEntity): WalletResponsesInterface {
    return {
      wallet,
    };
  }
}
