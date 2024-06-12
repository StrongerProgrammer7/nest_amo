import { ApiProperty } from "@nestjs/swagger";

const exampleContact =
{
	field_id: 561445,
	field_name: 'Телефон',
	field_code: 'PHONE',
	values: [
		{
			value: 'value'
		}
	]
};

class CustomFieldContact
{
	@ApiProperty({ example: 561445 })
	readonly field_id: number;
	@ApiProperty({ example: 'Телефон' })
	readonly field_name: string;
	@ApiProperty({ example: 'PHONE' })
	readonly field_code: string;
	@ApiProperty({ example: [{ value: 'value' }] })
	readonly values:
		[
			{
				readonly value: string;
			}
		];
}

export class BriefContactDto
{
	readonly name: string;
	readonly contacts?:
		{
			code: string;
			value: string;
		}[];
}

export class ContactDto
{
	@ApiProperty({ example: 2580719 })
	readonly id: number;
	@ApiProperty({ example: 'name' })
	readonly name: string;
	@ApiProperty({ example: 'first_name' })
	readonly first_name: string;
	@ApiProperty({ example: 'last_name' })
	readonly last_name: string;
	@ApiProperty({ example: exampleContact })
	readonly custom_fields_values?: CustomFieldContact[];
}
