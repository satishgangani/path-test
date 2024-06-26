import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'd4e3f1a2312b4d5d6a7b8c9d10e11f12a13b14c15d16e17f18a19b1c20d21e2',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
