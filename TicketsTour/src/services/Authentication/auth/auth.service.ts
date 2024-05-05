import { Strategy } from 'passport-local';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';


@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
    constructor(
        private usersService: UsersService,
        // private jwtService: JwtService
      ) {
        super({ usernameField:"username", passwordField: 'pswd'});
      }

      async validate(
        username: string,
        pswd: string,
      ): Promise<any> {
        const user = await this.usersService.checkAuthUser(username, pswd);
        console.log('AuthService', `"${username}"`, `"${pswd}"`);
        if (!user) {
            const errText = "Неправильный логин или пароль.";
            throw new HttpException(
                [{fieldName:'username', message:errText},{fieldName:'password', message:errText}],
                HttpStatus.UNAUTHORIZED,
            );
        }
        console.log('AuthService', 'ok');
        // if (user?.password !== pass) {
        //   throw new UnauthorizedException();
        // }
        // const payload = { sub: user.userId, username: user.username };
        // return {
        //   access_token: await this.jwtService.signAsync(payload),
        // };
        return true;
      }
}
