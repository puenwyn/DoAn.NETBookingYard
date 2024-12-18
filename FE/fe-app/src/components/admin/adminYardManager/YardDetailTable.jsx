import React from "react";
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { BsThreeDotsVertical } from "react-icons/bs";
import '../../../styles/components/adminYardManager.css';
import { formatNumber } from "../../../utils/FormatNumber";

const useStyles = makeStyles((theme) => ({
    tableheadercus: {
        background: '#F4F6F8',
        borderBottom: 'none'
    },
    tableheaderfont: {
        color: '#6D7C89',
        fontWeight: 600
    },
    tablerowcus: {
        border: 'none',
        '& td, & th': { // Áp dụng cho tất cả các ô
            fontSize: '14px',
            fontFamily: '"Inter", sans-serif',
        },
        borderBottom: '1px solid rgb(229, 234, 239)'
    },
    tableAddressColumn: {
        maxWidth: '250px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    tableDesColumn: {
        maxWidth: '150px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
}));

function Row(props) {
    const { row, onClick } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.tablerowcus} sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <img src={`data:image/png;base64,${row.image}`} style={{ width: '100px', height: '50px', objectFit: 'cover' }} />
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="left">{row.yardType}</TableCell>
                <TableCell align="left" className={classes.tableAddressColumn}>{row.address}</TableCell>
                <TableCell align="left" className={classes.tableDesColumn}>{row.description}</TableCell>
                <TableCell align="left">{row.owner}</TableCell>
                <TableCell align="center"><IconButton key={row.id} onClick={() => onClick(row.id)} sx={{ fontSize: '16px' }}><BsThreeDotsVertical /></IconButton></TableCell>
            </TableRow>
            <TableRow sx={{ width: '100%', background: '#F7F6F7' }}>
                <TableCell sx={{ width: '100%' }} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Chi tiết sân
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead sx={{ background: '#F7F6F7' }}>
                                    <TableRow>
                                        <TableCell>Tên sân</TableCell>
                                        <TableCell>Khu</TableCell>
                                        <TableCell>Mô tả</TableCell>
                                        <TableCell>Sức chứa</TableCell>
                                        <TableCell>Giá</TableCell>
                                        <TableCell>Giá giờ vàng</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.yardDetails.map((detail) => (
                                        <TableRow key={detail.name}>
                                            <TableCell component="th" scope="row">
                                                {detail.name}
                                            </TableCell>
                                            <TableCell>{detail.location}</TableCell>
                                            <TableCell sx={{
                                                minWidth: '300px',
                                                maxWidth: '300px',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden'
                                            }}>{detail.description}</TableCell>
                                            <TableCell align="right">{detail.capacity}</TableCell>
                                            <TableCell align="right">{formatNumber(detail.price)} VNĐ</TableCell>
                                            <TableCell align="right">{formatNumber(detail.pricePeak)} VNĐ</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        yardType: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,
        yardDetails: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                location: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                capacity: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                pricePeak: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

const CollapsibleTable = ({ yards, page, rowsPerPage, totalYard, setPage, setRowsPerPage, onClick }) => {

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const classes = useStyles();

    return (
        <TableContainer>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow className={classes.tableheadercus}>
                        <TableCell />
                        <TableCell className={classes.tableheaderfont}>Hình sân</TableCell>
                        <TableCell className={classes.tableheaderfont}>Tên sân</TableCell>
                        <TableCell className={classes.tableheaderfont}>Loại sân</TableCell>
                        <TableCell className={classes.tableheaderfont}>Địa chỉ</TableCell>
                        <TableCell className={classes.tableheaderfont}>Mô tả</TableCell>
                        <TableCell className={classes.tableheaderfont}>Chủ sở hữu</TableCell>
                        <TableCell className={classes.tableheaderfont}>Xem</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {yards?.map((row) => (
                        <Row key={row.yard} row={row} onClick={onClick} />
                    ))}
                </TableBody>
            </Table>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        className='custom-page'
                        rowsPerPageOptions={[5, 10, 15, 25]}
                        component="div"
                        count={totalYard}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{
                            display: 'flex',
                            alignContent: 'center',
                            margin: '0'
                        }}
                    />
                </TableRow>
            </TableFooter>
        </TableContainer>
    )
};

export default CollapsibleTable;