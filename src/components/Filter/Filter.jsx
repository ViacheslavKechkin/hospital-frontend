import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Button, TextField, Typography } from "@mui/material";
import trash from "./img/trash.png";
import "./Filter.scss";

const Filter = ({ openOrCloseFilter, newRecord, setNewRecord }) => {
  const [dateForFilter, setDateForFilter] = useState({
    firstDateForStart: "",
    secondDateForEnd: "",
  });

  const { firstDateForStart, secondDateForEnd } = dateForFilter;

  const handleChange = (e, inputName) => {
    setDateForFilter({ ...dateForFilter, [inputName]: e });
  };

  const allRecord = () => {
    axios
      .get("http://localhost:9000/allRecords", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setNewRecord(res.data.data);
      });
  };

  const filterRecords = () => {
    const newStartDate = moment(firstDateForStart)
      .format("yyyy-MM-DD")
      .split("-")
      .join(".");

    const newEndDate = moment(secondDateForEnd)
      .format("yyyy-MM-DD")
      .split("-")
      .join(".");

    const start = firstDateForStart ? newStartDate : "";

    const end = secondDateForEnd ? newEndDate : "";

    if (!start && !end) return setNewRecord([...newRecord]);

    newRecord = newRecord.filter((item) => {
      const temp = item.date.split(".").reverse().join(".");
      if (start && !end) return temp >= start;
      if (!start && end) return temp <= end;
      else return temp >= start && temp <= end;
    });
    return setNewRecord([...newRecord]);
  };

  return (
    <>
      <div className="wrapper-actions">
        <Typography gutterBottom>с:</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat={"dd/MM/yyyy"}
            name="firstDateForStart"
            value={firstDateForStart}
            onChange={(e) => handleChange(e, "firstDateForStart")}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Typography gutterBottom>по:</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat={"dd/MM/yyyy"}
            name="secondDateForEnd"
            value={secondDateForEnd}
            onChange={(e) => handleChange(e, "secondDateForEnd")}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button onClick={() => filterRecords()} variant="outlined">
          Фильтровать
        </Button>
        <img
          src={trash}
          alt="trash"
          onClick={() => (openOrCloseFilter(false), allRecord())}
        ></img>
      </div>
    </>
  );
};

export default Filter;
