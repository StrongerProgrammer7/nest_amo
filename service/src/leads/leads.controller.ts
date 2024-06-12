import { BadRequestException,Controller,Get,HttpException,HttpStatus,Query } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { ApiOperation,ApiQuery,ApiResponse } from '@nestjs/swagger';
import { BadRequestDto,ErrorDto } from './dto/error.dto';
import { DealDto } from './dto/deal.dto';

@Controller('api')
export class LeadsController 
{
	constructor(private readonly leadsService: LeadsService) { }

	@ApiOperation({ summary: "Get all leads" })
	@ApiResponse({ status: 200,type: [DealDto] })
	@ApiResponse({ status: 500,type: ErrorDto })
	@ApiResponse({ status: 400,type: BadRequestDto })
	@ApiResponse({ status: 400,type: BadRequestException })
	@ApiQuery({ name: 'query',required: false,type: String,description: 'Query to filter leads: string | integer' })
	@Get('leads')
	async getLeads(@Query('query') query?: string | number): Promise<DealDto[] | BadRequestDto | ErrorDto>
	{
		if (query && query.toString().length < 3)
			throw new BadRequestException('Query parameter must be at least 3 characters long');

		const result = await this.leadsService.getLeads(query);
		if ("e" in result)
			throw new HttpException(result,HttpStatus.INTERNAL_SERVER_ERROR);
		if ("status" in result)
			throw new HttpException(result,HttpStatus.BAD_REQUEST);
		return result;
	}
}
