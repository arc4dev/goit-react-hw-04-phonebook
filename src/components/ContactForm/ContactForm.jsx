import './contactForm.css';

export const ContactForm = ({ handleSubmit }) => {
  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Z]+(([' \u2013][a-zA-Z])?[a-zA-Z]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor="number">Number</label>
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button type="submit">Add Contact</button>
    </form>
  );
};
