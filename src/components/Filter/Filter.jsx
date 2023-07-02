import './filter.css';

export const Filter = ({ handleChange }) => {
  return (
    <div className="filter">
      <label htmlFor="name">Find contacts by name</label>
      <input onChange={handleChange} type="text" name="name" />
    </div>
  );
};
