import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

//App
function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    getLocalStorage();
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    setLocalStorage();
  }, [contacts]);

  const getLocalStorage = () => {
    const contactsArr = JSON.parse(localStorage.getItem('contacts'));

    if (!contactsArr) return;

    setContacts(contactsArr);
  };

  const setLocalStorage = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  const addContact = e => {
    e.preventDefault();

    const name = e.target.elements.name;
    const number = e.target.elements.number;

    // check if the user exists
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.value.toLowerCase()
      )
    )
      return alert(`${name.value.trim()} jest juz w liscie kontaktow!`);

    // init user

    const user = {
      id: nanoid(9),
      name: name.value.trim(),
      number: number.value.trim(),
    };

    // check if the user patterns are valid
    if (!validatePattern(name) || !validatePattern(number))
      return alert('Twoj numer lub imie maja zly format. Sprobuj ponownie!');

    // set contacts
    setContacts(prevContacts => [...prevContacts, user]);

    e.target.reset();
  };

  const validatePattern = htmlInput => {
    const pattern = new RegExp(htmlInput.pattern);
    return pattern.test(htmlInput.value);
  };

  const handleFilterChange = e => {
    setFilter(e.target.value.trim().toLowerCase());
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().startsWith(filter)
    );
  };

  const deleteContact = e => {
    const toDelete = contacts.find(contact => contact.name === e.target.id);

    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== toDelete.id)
    );
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        flexDirection: 'column',
      }}
    >
      <h1>PhoneBook</h1>
      <ContactForm handleSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter handleChange={handleFilterChange} />
      <ContactList
        contacts={getFilteredContacts()}
        handleClick={deleteContact}
      />
    </div>
  );
}

export default App;
