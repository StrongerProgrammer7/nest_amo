import { ApiProperty } from "@nestjs/swagger";

export class UserDto
{
	@ApiProperty({ example: 142 })
	id: number;
	@ApiProperty({ example: 'Алексей Поимцев' })
	name: string;
	@ApiProperty({ example: "example@gmail.com" })
	email: string;
	@ApiProperty({ example: "en" })
	lang: string;
}
