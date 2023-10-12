import { Module } from '@nestjs/common';
import { IRegisterService } from '../../../port/output/iregister_service';
import { RegisterProductInfra } from '../../output/register-product/register-product-infra';
import { RegisterProduct } from '../../../core/use-case/register-product/register-product';
import { PrismaClient } from '@prisma/client';
import { DatabaseService } from '../../../database/database.service';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { RegisterProductService } from './register-product.service';
import { IRegisterProduct } from '../../../port/input/iregister-product';
import { RegisterProductController } from './register-product.controller';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 600,
      isGlobal: true,
    }),
  ],
  providers: [
    RegisterProductService,
    {
      provide: 'core',
      useFactory: (output: IRegisterService) => new RegisterProduct(output),
      inject: ['output'],
    },
    {
      provide: RegisterProductService,
      useFactory: (input: IRegisterProduct, cache: any) =>
        new RegisterProductService(input, cache),
      inject: ['core', CACHE_MANAGER],
    },
    {
      provide: 'output',
      useFactory: (prisma: PrismaClient) => new RegisterProductInfra(prisma),
      inject: ['database'],
    },
    {
      provide: 'database',
      useClass: DatabaseService,
    },
  ],
  exports: [RegisterProductService],
  controllers: [RegisterProductController],
})
export class RegisterProductModule {}
