import React, { useCallback, useMemo, useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DateTime } from 'luxon';
import DialogDatePicker from '../DialogDatePicker/DialogDatePicker';
interface PropsInterface {
  currentDate: Date;
  onChangeDate: (date: Date) => any;
}
const AppToolbar = (props: PropsInterface): JSX.Element => {
  const { currentDate, onChangeDate } = props;
  const [open, setOpen] = useState(false);
  const handleChange = useCallback(
    (date: Date) => {
      onChangeDate(date);
    },
    [onChangeDate]
  );
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const handlePrev = useCallback(() => {
    onChangeDate(DateTime.fromJSDate(currentDate).minus({ days: 1 }).startOf('day').toJSDate());
  }, [currentDate, onChangeDate]);
  const handleNext = useCallback(() => {
    onChangeDate(DateTime.fromJSDate(currentDate).plus({ days: 1 }).startOf('day').toJSDate());
  }, [currentDate, onChangeDate]);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);
  const dateFormat = useMemo(() => DateTime.fromJSDate(currentDate).toLocaleString(DateTime.DATE_SHORT), [currentDate]);
  return (
    <>
      <Box>
        <AppBar position="fixed">
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <IconButton sx={{ mr: 2 }} color="inherit" onClick={handlePrev}>
                <ChevronLeftIcon />
              </IconButton>
              <Typography variant="h6" component="div">
                {dateFormat}
              </Typography>
              <IconButton sx={{ ml: 2 }} color="inherit" onClick={handleNext}>
                <ChevronRightIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton color="inherit" onClick={handleOpen}>
                <EventRepeatIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <DialogDatePicker value={currentDate} open={open} onClose={handleClose} onApply={handleChange} />
    </>
  );
};

export default AppToolbar;
