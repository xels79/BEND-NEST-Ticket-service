import { Injectable } from '@nestjs/common';

// @Injectable()
// export class JwtAuthGuardService {}

// import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
