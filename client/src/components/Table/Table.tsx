import IDeal from '../../utils/interfaces';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import { styled,TableBody,TableContainer,TableHead,TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { FC,memo } from 'react';
import Row from './Row';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#f0f2f5',
		color: theme.palette.common.black,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

interface ITable
{
	data: IDeal[];
	ths: string[];
}
const MyTable: FC<ITable> = ({ data,ths }) => 
{
	return (
		<TableContainer
			component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<StyledTableCell />
						{
							ths.map((th,index) =>
							{
								return (
									<StyledTableCell key={index} align="center">{th}</StyledTableCell>
								);
							})
						}
					</TableRow>
				</TableHead>
				<TableBody>
					{
						data.length > 0
						&&
						data.map((elem) =>
						{
							return (
								<Row key={elem.idDeal} row={elem} />
							);
						})
					}
				</TableBody>
			</Table>


		</TableContainer>
	);
};

export default memo(MyTable);
