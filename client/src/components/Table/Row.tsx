import IDeal from '../../utils/interfaces';
import TableCell from '@mui/material/TableCell';
import { Avatar,Box,Chip,TableRow } from '@mui/material';
import React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import css from "./table.module.css";
import { stringAvatar } from './utils';
import MdPhone from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function Row(props: { row: IDeal; })
{
	const { row } = props;
	const [open,setOpen] = React.useState(false);

	const handleOpen = () => setOpen(!open);
	return (
		<React.Fragment>
			<TableRow
				onClick={handleOpen}
				className={css.row}
				sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={handleOpen}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell align="center" component="th" scope="row">
					{row.nameDeal}
				</TableCell>
				<TableCell align="center">{row.priceDeal}</TableCell>
				<TableCell align="center">
					<div style={{ backgroundColor: `${row.colorDeal}` }} className={css.wrapper_status}>
						{row.statusDeal}
					</div>
				</TableCell>
				<TableCell align="center">
					<div className={css.wrapper_manager}>
						<Avatar className={css.avatar_manager} {...stringAvatar(row.userName)} />
						<p>{row.userName}</p>
					</div>
				</TableCell>
				<TableCell align="center">{new Date(row.dateCreated).toLocaleString()}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0,paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							{
								!row.contactName && <TableCell>Контактов нет</TableCell>
							}
							{
								row.contactName &&
								<div className={css.wrapper_contact}>
									<TableCell><Avatar className={css.avatar_manager} >{row.contactName[0]}</Avatar></TableCell>
									{
										<TableCell>{row.contactName}</TableCell>
									}
									<ul className={css.wrapper_contacts}>
										{
											row.contacts && row.contacts.map((elem,index) =>
											{
												return (
													<li key={index}>
														{
															elem.code === "EMAIL"
																?
																<a href={`mailto:${elem.value}`}>
																	<MailOutlineIcon className={css.contact} />
																</a>
																:
																<a href={`tel:${elem.value}`}>
																	<MdPhone className={css.contact} />
																</a>
														}

													</li>
												);
											})
										}
									</ul>
								</div>
							}
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

export default Row;
