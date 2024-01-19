import { injectable } from 'inversify';
import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import BaseError from '../../utils/BaseError';
import { HttpStatusCode } from '../../utils/ErrorStatusCode';
import { HashPassword } from '../employees/HashPassword.service';
const hashPassWord = new HashPassword();
const jwt = require('jsonwebtoken');

@injectable()
export class AccountService  {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    async create(username: string, password: string, role: string): Promise<any> {
        try {
            const account = await this.prisma.account.create({
                data: {
                    username: username,
                    password: password,
                    role: role,
                },
            });
            return {"id": account.id, "username": account.username, "role": account.role};
        } catch (error: any) {
            if (error.code == 'P2002'){
                throw new BaseError(
                    HttpStatusCode.INTERNAL_SERVER,
                    'fail',
                    'Username already exists',
                );
            }
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                'Can not create new account. Error: ' + error.message,
            );
        }
    }
}
