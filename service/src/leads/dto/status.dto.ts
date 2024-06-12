import { ApiProperty } from "@nestjs/swagger";

export class StatusDto
{
	@ApiProperty({ example: 142 })
	id: number;
	@ApiProperty({ example: 'Успешно реализовано' })
	name: string;
	@ApiProperty({ example: 10000 })
	sort: number;
	@ApiProperty({ example: false })
	is_editable: boolean;
	@ApiProperty({ example: 8271534 })
	pipeline_id: number;
	@ApiProperty({ example: '#CCFF66' })
	color: string;
	@ApiProperty({ example: 0 })
	type: number;
	@ApiProperty({ example: 31796714 })
	account_id: number;
}
