import { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import ContactsData from './contactList.json';
import styles from './App.module.css';

function App() {
  const [contacts, setContacts] = useState(() => {    
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    return savedContacts && savedContacts.length > 0 ? savedContacts : ContactsData;
  });  
  const [filter, setFilter] = useState('');  

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    const duplicate = contacts.find(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (duplicate) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    setContacts([...contacts, newContact]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox filter={filter} onFilterChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  )
}

export default App
