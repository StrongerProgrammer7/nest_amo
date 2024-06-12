import { config } from "dotenv";
config();

export const amoConfig =
{
	href: process.env.HREF,
	auth:
	{
		client_id: process.env.ID_INTEGRATION,
		client_secret: process.env.SECRET_KEY_AMO,
		token: process.env.TOKEN_AMO,
		code: process.env.AUTH_CODE,
		redirect_uri: process.env.REDIRECT_URI

	}
}; 
