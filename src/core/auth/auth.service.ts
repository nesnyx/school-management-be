import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/system-admin/users/users.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UsersService) {

  }
  async validateUser(identifier: string, password: string) {
    const user = await this.userService.findByIdentifier(identifier);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(identifier: string, password: string) {
    const user = await this.validateUser(identifier, password)
    const payload = {
      userId: user.id,
      identity: user.identifier,
    }
    const token = this.jwtService.sign(payload)
    return { token };
  }
}
