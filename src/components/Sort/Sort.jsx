import React, { useState } from "react";
import axios from "axios";
import { TextField, Autocomplete } from "@mui/material";
import "./Sort.scss";

const Sort = ({ newRecord, setNewRecord }) => {
  const [sortParams, setSortParams] = useState({
    field: "None",
    direction: "increase",
  });

  const { field, direction } = sortParams;

  const getAllTask = () => {
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

  const optionsSort = [
    {
      label: "Имя",
      value: "name",
    },
    {
      label: "Врач",
      value: "doctor",
    },
    {
      label: "Дата",
      value: "date",
    },
    {
      label: "None",
      value: "None",
    },
  ];

  const optionsDirection = [
    {
      label: "По возрастанию",
      value: "increase",
    },
    {
      label: "По убыванию",
      value: "decrease",
    },
  ];

  const handleChangeSort = (lable, value) => {
    setSortParams({ ...sortParams, field: value });
    sortRecords(value, direction);
  };

  const handleChangeDirection = (lable, value) => {
    setSortParams({ ...sortParams, direction: value });
    sortRecords(field, value);
  };

  const reverseDate = (newRecord) =>
    newRecord.map(
      (item) => (item.date = item.date.split(".").reverse().join("."))
    );

  const reverseDateBack = (newRecord) =>
    newRecord.map(
      (item) => (item.date = item.date.split(".").reverse().join("."))
    );

  const sortRecords = (dataForSort, directionForSort) => {
    if (dataForSort === "date") reverseDate(newRecord);

    if (dataForSort === "None") {
      getAllTask();
    }

    newRecord.sort((a, b) =>
      a[dataForSort] > b[dataForSort]
        ? 1
        : a[dataForSort] < b[dataForSort]
        ? -1
        : 0
    );

    if (dataForSort === "date") reverseDateBack(newRecord);

    if (directionForSort === "decrease") newRecord.reverse();

    setNewRecord([...newRecord]);
  };

  return (
    <>
      <div className="wrapper-sort">
        <div className="sort-typography">Сортировать по:</div>
        <Autocomplete
          className="sort-name"
          name="sort-by"
          id="combo-box-demo"
          disablePortal
          options={optionsSort}
          onChange={(event, value) =>
            handleChangeSort(value.label, value.value)
          }
          renderInput={(params) => <TextField {...params} />}
        />
        {field !== "None" && (
          <>
            <div className="sort-typography">Направление:</div>
            <Autocomplete
              className="sort-name"
              name="sort-by"
              id="combo-box-demo"
              onChange={(event, value) =>
                handleChangeDirection(value.label, value.value)
              }
              disablePortal
              options={optionsDirection}
              renderInput={(params) => <TextField {...params} />}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Sort;
