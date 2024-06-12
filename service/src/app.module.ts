import { Module } from '@nestjs/common';

import { LeadsModule } from './leads/leads.module';
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname,'..','client/')
      }
    ),
    LeadsModule],
  controllers: [],
  providers: [],
})

export class AppModule { }
