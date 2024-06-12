import { Injectable } from '@nestjs/common';

@Injectable()
export class LeadsService 
{
	constructor() { }

	async getLeads()
	{
		console.log("Work service");
	}
}
