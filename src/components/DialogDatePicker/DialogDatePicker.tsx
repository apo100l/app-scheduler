import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Dialog, TextField } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
interface PropsInterface {
  open: boolean;
  onClose: () => any;
  onApply: (data: Date) => any;
  value: Date;
}
const DialogDatePicker = (props: PropsInterface): JSX.Element => {
  const { onClose, value, open, onApply } = props;
  const [currentDate, setCurrentDate] = useState(value);
  useEffect(() => {
    setCurrentDate(value);
  }, [value]);
  const handleChange = useCallback(
    (date: DateTime | null) => {
      date && setCurrentDate(date.startOf('day').toJSDate());
    },
    [setCurrentDate]
  );
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);
  const handleApply = useCallback(() => {
    onApply(currentDate);
    onClose();
  }, [onApply, onClose, currentDate]);
  useEffect(() => {
    !open && setCurrentDate(value);
  }, [setCurrentDate, open, value]);
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <Box>
          <StaticDatePicker<DateTime>
            open={open}
            orientation="portrait"
            openTo="day"
            value={currentDate}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <Box p={2} mt={2} display="flex" alignItems="stretch">
            <Button variant="contained" onClick={handleApply} fullWidth sx={{ mr: 1 }}>
              Apply
            </Button>
            <Button variant="outlined" onClick={handleClose} fullWidth>
              Close
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default DialogDatePicker;
