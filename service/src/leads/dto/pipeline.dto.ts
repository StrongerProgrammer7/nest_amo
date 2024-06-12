import { StatusDto } from "./status.dto";

export class Pipeline
{
	readonly id: number;
	readonly name: string;
	readonly is_main: boolean;
	readonly _embedded:
		{
			readonly statuses: StatusDto[];
		};
}

export class PipelinesEmbedded
{
	readonly pipelines: Pipeline[];
}
