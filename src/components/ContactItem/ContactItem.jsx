import css from './ContactItem.module.css';

const { Component } = require('react');

class ContactItem extends Component {
  constructor({ name, number, handleClick }) {
    super();
    this.state = {
      name,
      number,
      handleClick,
    };
  }

  render() {
    return (
      <li className={css.contact_item}>
        <p>
          {this.state.name} {this.state.number}
        </p>
        <button
          onClick={this.state.handleClick}
          id={this.state.name}
          type="button"
        >
          Delete
        </button>
      </li>
    );
  }
}

export default ContactItem;
