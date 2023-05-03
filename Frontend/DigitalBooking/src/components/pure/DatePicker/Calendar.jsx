import {useContext} from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import styles from './/calendar.module.css'
import { BookingContex } from '../../../context/BookingContex';

export default function Calendar({ clase, clase2, handleBookingDate, disableDates }) {

     
        
    const shouldDisableDate = (date) => {
        const dateString = date.toISOString().slice(0, 10).replace(/-/g, "/");

        // Comprueba si la fecha está deshabilitada
        for (let i = 0; i < disableDates?.length; i++) {
            const [start, end] = disableDates[i];
            if (dateString >= start && dateString <= end) {
                return true;
            }
        }

        return false;

    }


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangeCalendar', 'DateRangeCalendar']}>
                <DemoItem>
                    <div className={styles[clase]}>
                        <DateRangeCalendar disablePast={true} calendars={1} onChange={(e) => handleBookingDate(e)} shouldDisableDate={shouldDisableDate} />
                    </div>
                </DemoItem>
                <DemoItem>
                    <div className={styles[clase2]}>
                        <DateRangeCalendar disablePast={true} calendars={2} onChange={(e) => handleBookingDate(e)} shouldDisableDate={shouldDisableDate} />
                    </div>
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}
