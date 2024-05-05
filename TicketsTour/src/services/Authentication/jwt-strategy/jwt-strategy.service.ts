import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../../../static/private/constants';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    constructor() {
        console.log('JwtStrategyService: init');
        console.log('JwtStrategyService secret: ' + jwtConstants.secret);
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
            
        });
    }

    async validate(payload: any): Promise<any> {
        //return { password: payload.pswd, username: payload.username };
        console.log("validate:");
        console.log('payload:\n',payload);
        return { userId: payload.sub, username: payload.username };
    }
}
