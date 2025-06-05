import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, UserResponseDto } from './dto/auth';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signup(userCredentials: SignUpDto) {
    const hashed = await bcrypt.hash(userCredentials.password, 10);
    if (!userCredentials) throw new ForbiddenException('Invalid credentials');
    const user: UserResponseDto = await this.prisma.user.create({
      data: {
        email: userCredentials.email,
        password: hashed,
        lastname: userCredentials.lastname,
        firstname: userCredentials.firstname,
      },
    });
    return this.signToken(user.id, user.email, user.lastname, user.firstname);
  }

  async signin(email: string, password: string) {
    const user: UserResponseDto | null = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new ForbiddenException('Invalid credentials');

    const pwMatches = await bcrypt.compare(password, user.password);
    if (!pwMatches) throw new ForbiddenException('Invalid credentials');

    return this.signToken(user.id, user.email, user.lastname, user.firstname);
  }

  signToken(userId: number, email: string, lastname: string, firstname: string) {
    const payload = { sub: userId, email, lastname, firstname };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
