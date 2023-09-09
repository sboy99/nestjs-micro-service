import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from '../auth';

export const UseAuth = () => applyDecorators(UseGuards(JwtAuthGuard));
