import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import AdminBookingTable from "../AdminBookingTable";

const AdminBooking = () => {

    const [value, setValue] = React.useState('one');
    // const [bookingList, setBookingList] = useState(false);
    // const [bookingPayment, setBookingPayment] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{
            padding: 3, width: '100%'
        }}>
            <Box sx={{
                background: 'white',
                borderRadius: '1rem',
                padding: 3
            }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab value="one" label="Lịch đặt sân" />
                    <Tab value="two" label="Thanh toán" />
                </Tabs>
                <Box sx={{ marginTop: 3 }}>
                    {
                        value === 'one' ? (
                            <AdminBookingTable />
                        ) : (<>Huhu</>)
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default AdminBooking;