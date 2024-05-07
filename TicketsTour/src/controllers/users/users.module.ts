import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from 'src/services/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user';
import { AuthService } from 'src/services/Authentication/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/static/private/constants';
import { JwtStrategyService } from 'src/services/Authentication/jwt-strategy/jwt-strategy.service';
//import { JwtAuthGuard } from 'src/services/Authentication/jwt-auth.guard/jwt-auth.guard';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '30s' }
        })
    ],
    controllers: [UsersController],
    providers: [
        UsersService,   
        AuthService,
        JwtStrategyService
        // JwtAuthGuard
    ],
    exports:[AuthService]
})
export class UsersModule { }
