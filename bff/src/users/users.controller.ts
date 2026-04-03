import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ClerkAuthGuard } from 'src/auth/cleark-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(ClerkAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('me')
  async me(@Req() req: any) {
    const clerkUserId = req.auth.sub;
    const email = req.auth.email || '';

    await this.usersService.findOrCreateFromClerk(clerkUserId, email);

    return this.usersService.findByClerkUserId(clerkUserId);
  }
}