import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import * as process from 'node:process';

const pg = new URL('postgresql://postgres:root@localhost:5432/hh_test?sslmode=disable');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: pg.hostname,
      port: parseInt(pg.port),
      username: pg.username,
      password: pg.password,
      database: pg.pathname.slice(1),
      ssl: pg.searchParams.get('sslmode') !== 'disable',
      autoLoadEntities: true,
      // it is unsafe to use synchronize: true for schema synchronization on production
      synchronize: false, // process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
      useUTC: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
