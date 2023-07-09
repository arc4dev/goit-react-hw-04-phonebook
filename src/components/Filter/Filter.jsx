import css from './Filter.module.css';

export const Filter = ({ handleChange }) => {
  return (
    <div className={css.filter}>
      <label htmlFor="name">Find contacts by name</label>
      <input onChange={handleChange} type="text" name="name" />
    </div>
  );
};
