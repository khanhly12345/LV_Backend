import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
	 config: ConfigService
  ) {
	console.log(`${config.get('JWT_SECRET')}`);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'), // Replace with your actual secret key
    });
  }

  async validate(payload: any) {
	try {
	  // Your validation logic here
	  console.log(payload);
	  return payload.sub;
	} catch (error) {
	  throw new UnauthorizedException('Invalid token', error.message);
	}
  }
}