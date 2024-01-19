import { injectable } from 'inversify';
import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import BaseError from '../../utils/BaseError';
import { HttpStatusCode } from '../../utils/ErrorStatusCode';
import { HashPassword } from '../employees/HashPassword.service';
const hashPassWord = new HashPassword();
const jwt = require('jsonwebtoken');

@injectable()
export class AuthenticationService  {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    async getAccount(id: number): Promise<any> {
        try {
            const account = await this.prisma.account.findFirstOrThrow({
                where: {
                    id: id,
                },
            });
            return {"status" : "success", "id": account.id, "username": account.username, "role": account.role};
        } catch (error) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                {"status" : "failed", "message": "Invalid account"},
            );
        }
    }
    async login(username: string, password: string): Promise<any> {
        try {
            const result: any = await this.prisma.account.findFirstOrThrow({
                where: {
                    username: username,
                },
            });            
            const match: any = await hashPassWord.compare(
                password,
                result.password,
            );
            if (match) {
                const token = jwt.sign(
                    { username: username, password: password, accountId: result.id },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRES_IN },
                );
                console.log(token);
                return {"token": "Bearer " + token};
            } else {
                throw new BaseError(
                    HttpStatusCode.UNAUTHORIZED,
                    'fail',
                    'Login failed',
                );
            }
        } catch (error: any) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                error.message,
            );
        }
    }
}
