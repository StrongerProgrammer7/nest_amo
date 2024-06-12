export function stringToColor(string: string): string
{
	let hash = 0;

	// Генерация хеша на основе входной строки
	for (let i = 0; i < string.length; i++)
	{
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (let i = 0; i < 3; i++)
	{
		let value = (hash >> (i * 8)) & 0xff;

		const randomChange = Math.floor(Math.random() * 31) - 15; //120) - 100;
		value = (value + randomChange) & 0xff;

		color += `00${value.toString(16)}`.slice(-2);
	}

	return color;
}
export function stringAvatar(name: string)
{
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split('')[0]}${name.split('')[1]}`,
	};
}
