import getDataFetch from "../http/fetchRequest";
import { BASE_URL } from "./consts";
import IDeal from "./interfaces";
import { testData } from "./test.data";

export const getDeals = async (query?: string): Promise<IDeal[]> =>
{
	try 
	{
		return await getDataFetch<IDeal[]>(`${BASE_URL}/leads${query ? "?query=" + query : ""}`);
	} catch (error) 
	{
		console.log(error);
		return [];
	}
};
