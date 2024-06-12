import { HttpStatus,Injectable } from '@nestjs/common';
import { LeadDto,LeadsDto } from './dto/leads.dto';
import { BadRequestDto,ErrorDto } from './dto/error.dto';
import { amoConfig } from 'src/data-source';
import { UserDto } from './dto/user.dto';
import { DealDto } from './dto/deal.dto';
import { Pipeline,PipelinesEmbedded } from './dto/pipeline.dto';
import { BriefContactDto,ContactDto } from './dto/contact.dto';
import { StatusDto } from './dto/status.dto';


@Injectable()
export class LeadsService 
{
	constructor() { }

	async getLeads(query?: string | number): Promise<DealDto[] | ErrorDto | BadRequestDto>
	{
		console.log("Work service");
		try 
		{
			const url = query ? `${amoConfig.href}api/v4/leads?with=contacts&query=${query}` : `${amoConfig.href}api/v4/leads?with=contacts`;
			const request = await this.requestFetch(url);
			if (request.body === null)
				return [];

			const result = await request.json() as LeadsDto | BadRequestDto;

			if ("status" in result)
				return result as BadRequestDto;

			const leads = result._embedded.leads;
			const deals: DealDto[] = await this.getDeals(leads);

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

	private async getLeadContacts(leadContactId?: number): Promise<BriefContactDto | undefined>
	{
		if (!leadContactId)
			return undefined;
		const contact: ContactDto = await (await this.requestFetch(`${amoConfig.href}api/v4/contacts/${leadContactId}`)).json();
		let contacts = [];
		if (contact.custom_fields_values)
			contacts = contact.custom_fields_values.map((elem) => 
			{
				return { code: elem.field_code,value: elem.values[0].value };
			});
		return {
			name: contact.name,
			contacts
		};
	}

	private getStatus(pipelines: Pipeline[],pipelineLeadId: number,statusLeadId: number): StatusDto
	{
		const pipeline = pipelines.find((pipeline) => pipeline.id === pipelineLeadId);
		return pipeline._embedded.statuses.find((status) => status.id === statusLeadId);
	}

	private async getDeals(leads: LeadDto[]): Promise<DealDto[]>
	{
		try 
		{
			const pipelines: Pipeline[] = (await (await this.requestFetch(`${amoConfig.href}api/v4/leads/pipelines`)).json() as { _embedded: PipelinesEmbedded; })._embedded.pipelines;

			const deals: DealDto[] = [];
			for (let i = 0; i < leads.length; i++)
			{
				const lead = leads[i];
				const status = this.getStatus(pipelines,lead.pipeline_id,lead.status_id);
				const user: UserDto = await (await this.requestFetch(`${amoConfig.href}api/v4/users/${lead.responsible_user_id}`)).json();
				const leadContact = await this.getLeadContacts(lead._embedded?.contacts[0]?.id);
				deals.push({
					dateCreated: lead.created_at * 1000,
					idDeal: lead.id,
					idPipeline: lead.pipeline_id,
					idStatus: lead.status_id,
					idUser: lead.responsible_user_id,
					nameDeal: lead.name,
					priceDeal: lead.price,
					statusDeal: status.name,
					userName: user.name,
					colorDeal: status.color,
					contactName: leadContact?.name ?? undefined,
					contacts: leadContact && leadContact.contacts?.length !== 0 ? leadContact.contacts : undefined
				});

			}
			return deals;
		} catch (error) 
		{
			throw error;
		}
	}
}
