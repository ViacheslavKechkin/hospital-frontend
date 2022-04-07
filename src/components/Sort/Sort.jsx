import {
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
import './Sort.scss'

const optionsSort = [
  {
    label: "Имя",
    text: "Имя"
  },
  {
    label: "Врач",
    text: "Врач"
  },
  {
    label: "Дата",
    text: "Дата"
  },
  {
    label: "None",
    text: "None"
  },
]

const optionsDirection = [
  {
    label: "По возврастанию",
    text: "По возврастанию"
  },
  {
    label: "По убыванию",
    text: "По убыванию"
  }
]

const Sort = () => {
  return (
    <>
      <div className='wrapper-sort'>
        <div className='sort-typography'>
          Сортировать по:
        </div>
        <Autocomplete
          className='sort-name'
          name="sort-by"
          id="combo-box-demo"
          disablePortal
          options={optionsSort}
          renderInput={(params) => <TextField {...params} />}
        />
        <div className='sort-typography'>
          Направление:
        </div>
        <Autocomplete
          className='sort-name'
          name="sort-by"
          id="combo-box-demo"
          disablePortal
          options={optionsDirection}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </>
  )

}

export default Sort;