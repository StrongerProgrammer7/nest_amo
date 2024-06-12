import { ApiProperty } from "@nestjs/swagger";

export class DealDto
{
	@ApiProperty({ example: 142 })
	idDeal: number;
	@ApiProperty({ example: 142 })
	idUser: number;
	@ApiProperty({ example: 142 })
	idStatus: number;
	@ApiProperty({ example: 142 })
	idPipeline: number;
	@ApiProperty({ example: 142 })
	dateCreated: number;
	@ApiProperty({ example: 'name' })
	nameDeal: string;
	@ApiProperty({ example: 142 })
	priceDeal: number;
	@ApiProperty({ example: 'status' })
	statusDeal: string;
	@ApiProperty({ example: 'userName' })
	userName: string;
}
