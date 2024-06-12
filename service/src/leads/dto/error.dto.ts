import { ApiProperty } from "@nestjs/swagger";

export class ErrorDto
{
	@ApiProperty({ example: {} })
	e: unknown;
	@ApiProperty({ example: "Message for you" })
	message: string;

}

export class BadRequestDto
{
	@ApiProperty({ example: "Not Found" })
	"title": string;
	@ApiProperty({ example: "https://httpstatus.es/404" })
	"type": string;
	@ApiProperty({ example: 404 })
	"status": number;
	@ApiProperty({ example: "Cannot GET https://****.amocrm.ru/leads/?query=%22%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD%22!" })
	"detail": string;

}
