import React, { useState } from "react";
import axios from "axios";
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

  }

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

        <Button variant="outlined">Фильтровать</Button>
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
