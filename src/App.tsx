import React, { useCallback, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { hot } from 'react-hot-loader';
import { getAppointments, isDevelopmentMode, storeAppointments } from './helpers';
import AppToolbar from './components/AppToolbar/AppToolbar';
import SchedulerLayer from './components/SchedulerLayer/SchedulerLayer';
import { DateTime } from 'luxon';
import { AppointmentInfo } from './types';
const App = (): JSX.Element => {
  const [currentDate, setCurrentDate] = useState(DateTime.fromJSDate(new Date()).startOf('day').toJSDate());
  const [appointments, setAppointments] = useState<Array<AppointmentInfo>>(getAppointments());
  const onChangeDate = useCallback(
    (data: Date) => {
      setCurrentDate(data);
    },
    [setCurrentDate]
  );
  const onAddAppointment = useCallback(
    (from: number, to: number) => {
      setAppointments((appointments) => {
        appointments = [...appointments, { date: currentDate, from, to }];
        storeAppointments(appointments);
        return appointments;
      });
    },
    [currentDate]
  );
  const listAppointments = useMemo(
    () =>
      appointments.filter(({ date }) =>
        DateTime.fromJSDate(new Date(date)).hasSame(DateTime.fromJSDate(currentDate), 'day')
      ),
    [appointments, currentDate]
  );

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="stretch">
        <AppToolbar currentDate={currentDate} onChangeDate={onChangeDate} />
        <Box display="flex" mt={4} pt={5} flexDirection="column" alignItems="stretch">
          <SchedulerLayer
            currentDate={currentDate}
            onAddAppointment={onAddAppointment}
            appointments={listAppointments}
          />
        </Box>
      </Box>
    </>
  );
};

export default isDevelopmentMode ? hot(module)(App) : App;
