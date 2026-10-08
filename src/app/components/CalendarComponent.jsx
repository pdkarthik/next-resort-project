import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CalendarComponent = ({ onDatesSelect }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      // endDate: new Date().setDate(new Date().getDate() + 1),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [selectedDates, setSelectedDates] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSelectDates = () => {
    const startDate = date[0].startDate.toLocaleDateString();
    const endDate = date[0].endDate.toLocaleDateString();
    const selection = `${startDate} - ${endDate}`;
    setSelectedDates(selection);
    setShowCalendar(false);

    if (onDatesSelect) {
      const bookingDates = { startDate, endDate };
      onDatesSelect(bookingDates);
    }
    console.log(selection);
  };

  const currentDate = new Date().toDateString();
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  const formattedDate = nextDate.toDateString();

  return (
    <div className="calenderSection">
      <div
        className="currentDate"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        {isMounted ? (
          selectedDates ? (
            <div style={{ color: "red" }}>Selected Dates: {selectedDates}</div>
          ) : (
            `${currentDate} - ${formattedDate}`
          )
        ) : null}
      </div>

      {showCalendar && (
        <>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className="dateRange"
          />
          <button onClick={handleSelectDates} className="calenderButton">
            Select Dates
          </button>
        </>
      )}
    </div>
  );
};

export default CalendarComponent;
