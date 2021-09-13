import {Input, Select, MenuItem, InputLabel, Button} from '@material-ui/core'

const FiltersRow = ({handleSearchChange, searchText, handleSortChange, handleRatingSortChange, ratingSortValue, sortValue, handleResetFilters}) => {
  return (
    <div className="filter-container">
      <Input value={searchText} onChange={(event) => handleSearchChange(event.target.value)} placeholder="Search"/>
      <div>
        <InputLabel id="selectLabel">Sort by rating</InputLabel>
        <Select fullWidth="true" labelId="selectLabel" onChange={(event) => handleSortChange(event.target.value)} value={sortValue} >
          <MenuItem value="ASC">Ratings from worst to best</MenuItem>
          <MenuItem value="DESC">Ratings from best to worst</MenuItem>
        </Select>
      </div>
      <div>
        <InputLabel id="ratingsLabel">Filter by rating</InputLabel>
        <Select fullWidth="true" labelId="ratingsLabel" onChange={(event) => handleRatingSortChange(event.target.value)} value={ratingSortValue} >
          <MenuItem value={1}>Ratings between 0-1</MenuItem>
          <MenuItem value={2}>Ratings between 1-2</MenuItem>
          <MenuItem value={3}>Ratings between 2-3</MenuItem>
          <MenuItem value={4}>Ratings between 3-4</MenuItem>
          <MenuItem value={5}>Ratings between 4-5</MenuItem>
        </Select>
      </div>
      <div>
        <Button onClick={handleResetFilters}>Reset Filters</Button>
      </div>
    </div>
  )
}

export default FiltersRow;