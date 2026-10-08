"use client";

import CalendarComponent from "@/app/components/CalendarComponent";
import UserNavigation from "@/app/components/UserNavigation";
import { bookingAction } from "@/app/serverActions/bookingAction";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

const DynamicProduct = () => {
  const [record, setRecord] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState(null);

  const { id } = useParams();
  console.log("dynamic productId in client component:", id);

  const dynamicProductHandler = async () => {
    try {
      const response = await fetch(`/api/admin/product/${id}`);
      const newData = await response.json();
      console.log("dynamic product data:", newData);
      setRecord(newData.product);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dynamicProductHandler();
  }, []);

  const bookingHandler = async () => {
    if (!selectedDates) {
      alert("Please select booking dates");
      return;
    }

    console.log("record:", record);

    const bookingDetails = { record, selectedDates };

    try {
      const response = await bookingAction(bookingDetails);
      if (response.success) {
        alert("Booking Successful");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
    console.log("dates coming from CalendarComponent:", dates);
  };

  return (
    <div>
      <UserNavigation />
      <Link href="/">
        <p align="center">Go Back</p>
      </Link>

      <CalendarComponent onDatesSelect={handleDateSelect} />

      {!loading ? (
        <div className="">
          <div className="singleSection">
            <div className="singleLeft">
              <div className="">
                <h2>{record.title}</h2>
              </div>
              <img
                src={`/uploads/${record.image}`}
                alt={record.title}
                className="singleImage"
              />
            </div>
            <div className="singleCenter">
              <div className="singlePrice">Rs.{record.price}</div>
              <p className="singleDesc">{record.desc}</p>
              <div className="">
                {record.amen?.map((item, i) => {
                  return (
                    <div className="singleAmen" key={i}>
                      <span>*</span> {item}
                    </div>
                  );
                })}
              </div>
              <div className="offer">
                <span>*</span>
                <button> Discount {record.offer}</button>
              </div>
              <div className="singleBtn">
                <button className="" onClick={bookingHandler}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 style={{ position: "absolute", top: "50%", left: "50%" }}>
          <span>Loading...</span>
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </h1>
      )}
    </div>
  );
};

export default DynamicProduct;
