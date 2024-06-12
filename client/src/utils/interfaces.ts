interface IDeal
{
	idDeal: number;
	idUser: number;
	idStatus: number;
	idPipeline: number;
	dateCreated: number;
	nameDeal: string;
	priceDeal: number;
	statusDeal: string;
	userName: string;
	colorDeal: string;
	contactName?: string;
	contacts?:
	{
		code: string;
		value: string;
	}[];
}
export default IDeal;
