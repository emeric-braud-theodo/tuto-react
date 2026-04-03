import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { verifyToken } from '@clerk/backend';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing bearer token');
        }

        const token = authHeader.replace('Bearer ', '');

        try {
            const jwtKey = process.env.CLERK_JWT_KEY?.replace(/\\n/g, '\n');
            const payload = await verifyToken(token, {
                jwtKey: jwtKey,
                authorizedParties: [`${process.env.FRONT_URL}`],
            });

            request.auth = payload;
            return true;
        } catch {
            throw new UnauthorizedException('Invalid Clerk token');
        }
    }
}