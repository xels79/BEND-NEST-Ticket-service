import { Strategy } from 'passport-local';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { PassportStrategy } from '@nestjs/passport';


@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
    constructor(
        private usersService: UsersService,
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
        }else{
        }
        console.log('AuthService', 'ok');
        return true;
      }
}
