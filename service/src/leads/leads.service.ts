import { Injectable } from '@nestjs/common';
import { LeadsDto } from './dto/leads.dto';
import { BadRequestDto,ErrorDto } from './dto/error.dto';
import { amoConfig } from 'src/data-source';
import { UserDto } from './dto/user.dto';
import { DealDto } from './dto/deal.dto';
import { Pipeline,PipelinesEmbedded } from './dto/pipeline.dto';


@Injectable()
export class LeadsService 
{
	constructor() { }

	private async requestFetch(url: string): Promise<Response>
	{
		try 
		{
			return await fetch(url,
				{
					method: "GET",
					mode: "no-cors",
					cache: "no-cache",
					credentials: "same-origin",
					headers:
					{
						"Accept": "application/json",

						"Authorization": `Bearer ${amoConfig.auth.token}`
					},
					redirect: "follow",
					referrerPolicy: "no-referrer"
				});
		} catch (error) 
		{
			console.log(error);
			throw error;
		}
	}
	async getLeads(query?: string | number): Promise<DealDto[] | ErrorDto | BadRequestDto>
	{
		console.log("Work service");
		try 
		{
			const url = query ? `${amoConfig.href}api/v4/leads/?query=${query}` : `${amoConfig.href}api/v4/leads`;
			const result = await (await this.requestFetch(url)).json() as LeadsDto | BadRequestDto;
			if ("status" in result)
				return result as BadRequestDto;

			const leads = result._embedded.leads;
			const deals: DealDto[] = [];
			const pipelines: Pipeline[] = (await (await this.requestFetch(`${amoConfig.href}api/v4/leads/pipelines`)).json() as { _embedded: PipelinesEmbedded; })._embedded.pipelines;

			for (let i = 0; i < leads.length; i++)
			{
				const lead = leads[i];
				const pipeline = pipelines.find((pipeline) => pipeline.id === lead.pipeline_id);
				const status = pipeline._embedded.statuses.find((status) => status.id === lead.status_id);
				const user: UserDto = await (await this.requestFetch(`${amoConfig.href}api/v4/users/${lead.responsible_user_id}`)).json();

				deals.push({
					dateCreated: lead.created_at,
					idDeal: lead.id,
					idPipeline: lead.pipeline_id,
					idStatus: lead.status_id,
					idUser: lead.responsible_user_id,
					nameDeal: lead.name,
					priceDeal: lead.price,
					statusDeal: status.name,
					userName: user.name
				});

			}

			return deals;
		} catch (error) 
		{
			console.log(error);
			return {
				e: error,
				message: " Error with get data"
			} as ErrorDto;

		}
	}
}
