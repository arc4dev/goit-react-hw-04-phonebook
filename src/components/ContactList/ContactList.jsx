import ContactItem from '../ContactItem/ContactItem';

export const ContactList = ({ contacts, handleClick }) => {
  return (
    <ul>
      {contacts.length > 0 ? (
        contacts.map(contact => (
          <ContactItem
            key={contact.name}
            name={contact.name}
            number={contact.number}
            handleClick={handleClick}
          />
        ))
      ) : (
        <p>Nie posiadasz zadnych kontaktow!</p>
      )}
    </ul>
  );
};
