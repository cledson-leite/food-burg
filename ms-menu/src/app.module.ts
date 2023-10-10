import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ListProductsModule } from './adapter/input/list-products/list-products.module';

@Module({
  imports: [DatabaseModule, ListProductsModule],
})
export class AppModule {}
