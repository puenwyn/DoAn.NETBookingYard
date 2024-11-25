import React, { useState } from 'react';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box } from '@mui/material';

const MyDatePicker = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar
          date={date}
          onChange={(newDate) => setDate(newDate)}
          sx={{ border: '1px solid #ccc', borderRadius: '8px' }} // Tùy chỉnh nếu cần
        />
      </LocalizationProvider>
    </Box>
  );
};

export default MyDatePicker;