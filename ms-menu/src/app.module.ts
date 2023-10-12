import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { DatabaseModule } from './database/database.module';
import { ListProductsModule } from './adapter/input/list-products/list-products.module';
import { redisStore } from 'cache-manager-redis-yet';
import { RegisterProductModule } from './adapter/input/register-product/register-product.module';

@Module({
  imports: [
    DatabaseModule,
    ListProductsModule,
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      isGlobal: true,
    }),
    RegisterProductModule,
  ],
})
export class AppModule {}
