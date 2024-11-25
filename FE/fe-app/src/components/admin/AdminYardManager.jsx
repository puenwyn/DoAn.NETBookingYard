import React from "react";
import '../../styles/components/adminYardManager.css';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from "@mui/material";

function createData(id, yard, type, address, des, owner) {
    return { id, yard, type, address, des, owner };
}

function createType(id, name, status) {
    return { id, name, status }
}

const AdminYardManager = () => {
    const headCells = [
        { id: 'yard', numeric: false, label: 'Tên sân', minwidth: 100 },
        { id: 'type', numeric: false, label: 'Loại sân', minwidth: 100 },
        { id: 'address', numeric: false, label: 'Địa chỉ', minwidth: 100 },
        { id: 'des', numeric: false, label: 'Mô tả', minwidth: 100 },
        { id: 'owner', numeric: false, label: 'Chủ sỡ hữu', minwidth: 100 }
    ]

    const typeHeadCells = [
        { id: 'name', numeric: false, label: 'Tên loại sân', minwidth: 100 },
        { id: 'status', numeric: false, label: 'Trạng thái', minwidth: 100 }
    ]

    const rows = [
        { id: 1, yard: 'Snow', type: 'Jon', address: 35, des: 'hi' },
        { id: 2, yard: 'Lannister', type: 'Cersei', address: 42, des: 'hi' },
        { id: 3, yard: 'Lannister', type: 'Jaime', address: 45, des: 'hi' },
        { id: 4, yard: 'Stark', type: 'Arya', address: 16, des: 'hi' },
        { id: 5, yard: 'Targaryen', type: 'Daenerys', address: null, des: 'hi' },
        { id: 6, yard: 'Melisandre', type: null, address: 150, des: 'hi' },
        { id: 7, yard: 'Clifford', type: 'Ferrara', address: 44, des: 'hi' },
        { id: 8, yard: 'Frances', type: 'Rossini', address: 36, des: 'hi' },
        { id: 9, yard: 'Roxie', type: 'Harvey', address: 65, des: 'hi' },
    ];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selectedUser, setSelectedUser] = React.useState(null); // State to hold the selected user

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className='admin-yard custom-datagrid px-1 d-flex flex-column'>
            <div className='header-yard d-flex'>
                <div className='col-8'>
                    <Typography variant="h5" component="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Danh sách sân hiện có
                    </Typography>
                </div>
                <div className='col-4 ps-4'>
                    <Typography variant="h5" component="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Danh sách loại sân
                    </Typography>
                </div>
            </div>
            <div className='d-flex'>
                <div className='col-8'>
                    <Paper elevation={3} sx={{
                        borderRadius: 3,
                        boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.25rem 0rem',
                        marginBottom: 5
                    }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {headCells.map((headCell) => (
                                            <TableCell
                                                style={{ width: headCell.minwidth }}
                                            >
                                                {headCell.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 },
                                            }}
                                        >
                                            <TableCell>
                                                {row.yard}
                                            </TableCell>
                                            <TableCell>
                                                {row.type}
                                            </TableCell>
                                            <TableCell>
                                                {row.address}
                                            </TableCell>
                                            <TableCell>
                                                {row.des}
                                            </TableCell>
                                            <TableCell>
                                                {row.owner}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={headCells.length}> {/* Đảm bảo chiếm hết chiều rộng */}
                                            <TablePagination
                                                width="100%" // Đặt width cho TablePagination
                                                className='custom-page'
                                                rowsPerPageOptions={[5, 10, 25]}
                                                component="div"
                                                count={rows.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center', // Căn chỉnh nội dung theo chiều dọc
                                                    margin: '0', // Đặt margin về 0
                                                    padding: '0', // Đặt padding về 0
                                                    justifyContent: 'flex-end' // Căn chỉnh nội dung nếu cần
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Paper >
                </div>
                <div className='col-4 ps-4'>
                    <div className='yard-type p-3 bg-white'>
                        Hello
                    </div>
                </div>
            </div>
        </div>
    )
}



export default AdminYardManager;

// const columns = [
//     { field: 'yard', headerName: 'Tên sân', width: 200 },
//     { field: 'type', headerName: 'Loại sân', width: 100 },
//     { field: 'address', headerName: 'Địa chỉ', width: 180 },
//     {
//         field: 'des',
//         headerName: 'Mô tả',
//         type: 'number',
//         width: 90,
//     },
//     {
//         field: 'owner',
//         headerName: 'Chủ sỡ hữu',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 100,
//         valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//     },
// ];

{/* <Box sx={{ height: 'auto', width: '100%', borderRadius: '1rem' }}>
    <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        rowHeight={45}
        sx={{
            borderRadius: '1rem',
            '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                color: '#555',
                fontSize: '14px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                '& .MuiDataGrid-columnHeader': {
                    border: 'none',     // Xóa tất cả border cho tiêu đề
                },
            },
            '& .MuiDataGrid-cell': {
                borderBottom: 'none',
                borderTop: 'none'
            },
            '& .MuiDataGrid-row': {
                '&:hover': {
                    backgroundColor: '#f0f0f0',
                },
            },
            '& .MuiDataGrid-footerContainer': {
                justifyContent: 'center',
            },
        }}
    />
</Box> */}
