import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Box,
    Typography,
    IconButton,
    Paper,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import DeleteIcon from '@mui/icons-material/Delete';

// Custom styles
const useStyles = makeStyles((theme) => ({
    tableContainer: {
        maxHeight: "400px",
        overflowY: "auto",
    },
    tableCell: {
        maxWidth: '250px',
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    nameBox: {
        display: "flex",
        alignItems: "center",
    },
    avatar: {
        width: "40px",
        height: "40px",
    },
}));

const Wishlist = () => {
    const classes = useStyles();

    const rows = [
        {
            id: 1,
            name: "Sân bóng A",
            address: "123 Đường ABC, Thành phố XYZ 123 Đường ABC, Thành phố XYZ 123 Đường ABC, Thành phố XYZ 123 Đường ABC, Thành phố XYZ 123 Đường ABC, Thành phố XYZ",
            price: "200,000 VND",
            pricePeak: "300,000 VND",
        },
        {
            id: 2,
            name: "Sân bóng B",
            address: "456 Đường DEF, Thành phố UVW",
            price: "250,000 VND",
            pricePeak: "350,000 VND",
        },
    ];

    return (
        <Box sx={{ paddingY: 2, paddingX: 6 }}>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên sân</TableCell>
                            <TableCell>Địa chỉ</TableCell>
                            <TableCell>Giá sân</TableCell>
                            <TableCell>Giá giờ vàng</TableCell>
                            <TableCell>Tùy chọn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell className={classes.tableCell}>
                                    <Box className={classes.nameBox}>
                                        <Avatar
                                            alt={row.name}
                                            src="/static/images/avatar/1.jpg"
                                            className={classes.avatar}
                                        />
                                        <Typography sx={{ marginLeft: 2 }} variant="body1">{row.name}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell className={classes.tableCell}>{row.address}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell>{row.pricePeak}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => {
                                        alert(row.id);
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Wishlist;
