import React, { useCallback, useMemo, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { DateTime } from 'luxon';
import classNames from 'classnames';
import styles from './SchedulerLayer.module.scss';
import range from 'lodash/range';
import { AppointmentInfo } from 'types';
interface PropsInterface {
  currentDate: Date;
  appointments: Array<AppointmentInfo>;
  onAddAppointment: (from: number, to: number) => any;
}
const items = range(0, 4 * 24);
const SchedulerLayer = (props: PropsInterface): JSX.Element => {
  const { currentDate, appointments, onAddAppointment } = props;
  const [selected, setSelected] = useState<number | null>(null);
  const [overSelected, setOverSelected] = useState<number | null>(null);
  const getTime = useCallback(
    (i: number) =>
      DateTime.fromJSDate(currentDate)
        .startOf('day')
        .plus({ minute: i * 15 })
        .toLocaleString(DateTime.TIME_24_SIMPLE),
    [currentDate]
  );
  const hasSelected = useCallback(
    (i: number) =>
      selected !== null &&
      overSelected !== null &&
      range(selected, overSelected >= selected ? overSelected + 1 : overSelected - 1).indexOf(i) > -1,
    [selected, overSelected]
  );
  const hasUsed = useCallback(
    (i: number) => appointments.some(({ from, to }) => range(from, to + 1).indexOf(i) > -1),
    [appointments]
  );
  const hasUsedOver = useMemo(() => {
    if (selected === null || overSelected === null) {
      return false;
    }
    const _range = range(selected, overSelected >= selected ? overSelected + 1 : overSelected - 1);
    return appointments.some(({ from, to }) => _range.indexOf(from) > -1 || _range.indexOf(to) > -1);
  }, [appointments, overSelected, selected]);
  const handleSelect = useCallback(
    (i: number) => {
      if (hasUsed(i) || hasUsedOver) {
        setSelected(null);
        setOverSelected(null);
        return;
      }
      !selected && setSelected(i);
      if (selected) {
        onAddAppointment(selected >= i ? i : selected, selected >= i ? selected : i);
        setSelected(null);
        setOverSelected(null);
      }
    },
    [hasUsed, hasUsedOver, onAddAppointment, selected]
  );
  const handleOverSelect = useCallback(
    (i: number) => {
      selected !== null && setOverSelected(i);
    },
    [selected]
  );
  const handleOutSelect = useCallback(() => {
    selected !== null && setOverSelected(null);
  }, [selected]);
  return (
    <>
      <Box className={styles.SchedulerLayer} component={(props) => <Paper {...props} />}>
        {items.map((time, i) => (
          <Box
            key={i}
            className={classNames(
              styles.SchedulerLayer_item,
              (i === selected || hasSelected(i)) && !hasUsedOver && styles.SchedulerLayer_item_selected,
              (i === selected || hasSelected(i)) && hasUsedOver && styles.SchedulerLayer_item_selected_used,
              hasUsed(i) && styles.SchedulerLayer_item_used
            )}
            onMouseOver={() => handleOverSelect(i)}
            onMouseOut={handleOutSelect}
            onClick={() => handleSelect(i)}
          >
            <Box className={styles.SchedulerLayer_item_time}>{getTime(i)}</Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default SchedulerLayer;
