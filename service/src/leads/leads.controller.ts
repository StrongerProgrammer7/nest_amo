import { Controller,Get } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('api')
export class LeadsController 
{
	constructor(private readonly leadsService: LeadsService) { }

	@ApiOperation({ summary: "Get all users" })
	@Get('leads')
	async getLeads()
	{
		return await this.leadsService.getLeads();
	}
}
