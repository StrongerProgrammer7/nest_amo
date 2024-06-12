
const getDataFetch = async <T,>(url: string): Promise<T> =>
{
	try 
	{
		return await (await fetch(url,
			{
				method: "GET",
				cache: "no-cache",
				credentials: "same-origin",
				headers:
				{
					"Accept": "application/json",
				},
				redirect: "follow",
				referrerPolicy: "no-referrer"
			}
		)).json();
	} catch (error) 
	{
		console.log(error);
		throw error;
	}
};

export default getDataFetch;
