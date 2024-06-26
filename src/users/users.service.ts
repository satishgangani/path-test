import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

export interface User {
    id: number;
    username: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [];

    constructor(private jwtService: JwtService) {}

    async register(username: string, password: string): Promise<User> {
        //const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword = password;
        const user: User = { id: Date.now(), username, password: hashedPassword };
        this.users.push(user);
        return user;
    }

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = this.users.find(user => user.username === username);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
