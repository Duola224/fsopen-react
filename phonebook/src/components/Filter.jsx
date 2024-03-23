const Filter = ({ search, handleSearch }) => <>
  <label htmlFor="search">Filter shown with: </label><input type="text" value={search} onChange={handleSearch} />
</>

export default Filter