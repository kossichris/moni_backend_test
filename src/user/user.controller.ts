import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInterface } from './types/types';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { BackendValidationPipe } from '@app/shared/backendValidation.pipe';
import { WalletService } from '@app/wallet/wallet.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly walletService: WalletService,
  ) {}

  @Get('users')
  @UsePipes(new BackendValidationPipe())
  async findAll(@User('id') currentUserId: number): Promise<UserEntity[]> {
    const users = await this.userService.getAllUsers(currentUserId);
    return users;
  }

  @Post('users')
  @UsePipes(new BackendValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    if (user) {
      const wallet = await this.walletService.createWallet(user, {
        name: user.username,
        balance: 0,
      });
    }
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new BackendValidationPipe())
  async login(@Body('user') loginUserDto: any): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(
    @User('id') userId: number,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.getCurrentUser(userId);
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(
      currentUserId,
      updateUserDto,
    );
    return this.userService.buildUserResponse(user);
  }
}
