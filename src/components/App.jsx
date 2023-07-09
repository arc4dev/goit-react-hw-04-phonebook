import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

//App
class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  getLocalStorage = () => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (!contacts) return;

    this.setState({ contacts });
  };

  setLocalStorage = state => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  };

  componentDidMount() {
    this.getLocalStorage();
  }

  componentDidUpdate() {
    this.setLocalStorage(this.state);
  }

  addContact = e => {
    e.preventDefault();

    const name = e.target.elements.name;
    const number = e.target.elements.number;

    // check if the user exists
    if (
      this.state.contacts.some(
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
    if (!this.validatePattern(name) || !this.validatePattern(number))
      return alert('Twoj numer lub imie maja zly format. Sprobuj ponownie!');

    // set state
    this.setState(state => ({
      contacts: [...state.contacts, user],
    }));

    e.target.reset();
  };

  validatePattern = htmlInput => {
    const pattern = new RegExp(htmlInput.pattern);
    return pattern.test(htmlInput.value);
  };

  handleFilterChange = e => {
    this.setState({
      filter: e.target.value.trim().toLowerCase(),
    });
  };

  getFilteredContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().startsWith(this.state.filter)
    );
  };

  deleteContact = e => {
    // find idd
    const index = this.state.contacts.findIndex(
      contact => contact.name === e.target.id
    );

    // delete contact
    this.setState(state => ({
      contacts: state.contacts
        .slice(0, index)
        .concat(state.contacts.slice(index + 1)),
    }));
  };

  render() {
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
        <ContactForm handleSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter handleChange={this.handleFilterChange} />
        <ContactList
          contacts={this.getFilteredContacts()}
          handleClick={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
