import { WalletEntity } from '../wallet.entity';

export interface WalletResponsesInterface {
  wallet: WalletEntity;
}

export interface TransferResponsesInterface {
  senderWallet: WalletEntity;
  receiverWallet: WalletEntity;
}
