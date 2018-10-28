import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Pattern } from './pattern.entity';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Pattern])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {
  }
}
