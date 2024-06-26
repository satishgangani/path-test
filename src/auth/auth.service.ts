import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.validateUser(username, password);
        if (user) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        return this.usersService.login(user);
    }

    async register(username: string, password: string) {
        return this.usersService.register(username, password);
    }
}
