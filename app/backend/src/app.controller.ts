import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Controller('autoAuth')
export class AppController {
  @UseGuards(AuthGuard('jwt'))
  @Get('protected')
  getProtected(@Req() req: Request) {
    return { user: req.user };
  }
}
