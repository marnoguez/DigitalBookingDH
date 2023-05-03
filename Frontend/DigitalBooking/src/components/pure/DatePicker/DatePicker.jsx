import React,{useState, useEffect}from 'react'
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-rtl.css'
import ".//date.css"

const { allowedMaxDays, allowedDays, allowedRange, beforeToday, afterToday, combine } =  DateRangePicker;
const predefinedRanges = [  
  {
   
  }
 
];

const DatePicker = ({range}) => {

  const [width, setWidth] = useState(window.innerWidth);  

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);   
  }; 

  



  return (
    <div>
        <DateRangePicker  className="datePicker" format="yyyy-MM-dd" disabledDate={beforeToday()} ranges={predefinedRanges} size='lg' placeholder="Check in - Check Out"   showOneCalendar={width < 600 ? true : false} onChange={range}   ></DateRangePicker>
    </div>
  )
}

export default DatePicker

