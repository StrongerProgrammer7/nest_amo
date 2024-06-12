import { ApiProperty } from "@nestjs/swagger";

export class LeadDto
{
	@ApiProperty({ example: 1742355 })
	readonly "id": number;
	@ApiProperty({ example: 'name' })
	readonly "name": string;
	@ApiProperty({ example: 1742355 })
	readonly "price": number;
	@ApiProperty({ example: 1742355 })
	readonly "responsible_user_id": number;
	readonly "group_id": number;
	@ApiProperty({ example: 1742355 })
	readonly "status_id": number;
	@ApiProperty({ example: 1742355 })
	readonly "pipeline_id": number;
	@ApiProperty({ example: 1742355 })
	readonly "loss_reason_id"?: number;
	@ApiProperty({ example: 1742355 })
	readonly "created_by": number;
	@ApiProperty({ example: 1742355 })
	readonly "updated_by": number;
	@ApiProperty({ example: 1742355 })
	readonly "created_at": number;
	@ApiProperty({ example: 1742355 })
	readonly "updated_at": number;
	@ApiProperty({ example: 1742355 })
	readonly "closed_at"?: number;
	@ApiProperty({ example: 1742355 })
	readonly "closest_task_at"?: number;
	@ApiProperty({ example: true })
	readonly "is_deleted": boolean;
	@ApiProperty({ example: 1742355 })
	readonly "custom_fields_values"?: number;
	@ApiProperty({ example: 1742355 })
	readonly "score"?: number;
	@ApiProperty({ example: 1742355 })
	readonly "account_id": number;
	@ApiProperty({ example: 1742355 })
	readonly "labor_cost"?: number;
	readonly "_embedded"?: unknown;
}

const embeddedExample: { leads: LeadDto[]; } =
{
	leads:
		[
			{
				"id": 1742355,
				"name": "Разработка интернет-магазина",
				"price": 10000,
				"responsible_user_id": 11150934,
				"group_id": 0,
				"status_id": 67492930,
				"pipeline_id": 8271534,
				"loss_reason_id": null,
				"created_by": 11150934,
				"updated_by": 11150934,
				"created_at": 1718187351,
				"updated_at": 1718187356,
				"closed_at": null,
				"closest_task_at": null,
				"is_deleted": false,
				"custom_fields_values": null,
				"score": null,
				"account_id": 31796714,
				"labor_cost": null
			}
		]
};

export class LeadsDto
{
	@ApiProperty()
	readonly _page: string;
	@ApiProperty({ example: embeddedExample })
	readonly _embedded: { leads: LeadDto[]; };
}
