import { HttpStatus,Injectable } from '@nestjs/common';
import { LeadsDto } from './dto/leads.dto';
import { BadRequestDto,ErrorDto } from './dto/error.dto';
import { amoConfig } from 'src/data-source';
import { UserDto } from './dto/user.dto';
import { DealDto } from './dto/deal.dto';
import { Pipeline,PipelinesEmbedded } from './dto/pipeline.dto';
import { ContactDto } from './dto/contact.dto';


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

	private async getContact(lead_contacts: { id: number; }[]): Promise<ContactDto | undefined>
	{
		if (lead_contacts.length === 0)
			return undefined;
		return await (await this.requestFetch(`${amoConfig.href}api/v4/contacts/${lead_contacts[0].id}`)).json();
	}

	async getLeads(query?: string | number): Promise<DealDto[] | ErrorDto | BadRequestDto>
	{
		console.log("Work service");
		try 
		{
			const url = query ? `${amoConfig.href}api/v4/leads?with=contacts&query=${query}` : `${amoConfig.href}api/v4/leads?with=contacts`;
			const request = await (await this.requestFetch(url));
			if (request.body === null)
				return [];

			const result = await request.json() as LeadsDto | BadRequestDto;

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
				const contact = await this.getContact(lead._embedded.contacts);
				let contacts = [];
				if (contact && contact.custom_fields_values)
					contacts = contact.custom_fields_values.map((elem) => 
					{
						return { code: elem.field_code,value: elem.values[0].value };
					});
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
					contactName: contact?.name ?? undefined,
					contact: contacts.length === 0 ? undefined : contacts
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
