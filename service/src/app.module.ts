import { Module } from '@nestjs/common';
import { LeadsService } from './leads/leads.service';
import { LeadsModule } from './leads/leads.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' }),LeadsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
