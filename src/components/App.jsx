import { useState} from "react";
import { nanoid } from 'nanoid';
import useLocalStorage from "hooks/useLocalStorage";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import IconButton from "./IconButton";
import {ReactComponent as AddIcon} from '../icons/add.svg';
import Modal from "./Modal";

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  const visibleContacts = getVisibleContacts();

  const duplicateContact = name => {
    return contacts.find(contact => 
      contact.name === name);
  };

  const changeFilter = evt => setFilter(evt.currentTarget.value);

  const formSubmitHandler = (name, number) => {
    if(duplicateContact(name)){
      return alert(`${name} is already in contacts`);
    }

        const contact = {
          id: nanoid(),
          name,
          number,
        };
    
        setContacts(prev => [...prev, contact]);
        toggleModal();
  };

  function getVisibleContacts() {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({name}) => 
      name.toLowerCase().includes(normalizedFilter));
  };

  const deleteContact = contactId => setContacts(prevContacts => 
    prevContacts.filter(contact => contact.id !== contactId));
  

  function toggleModal() {
    setShowModal(prev => !prev);
  };
  
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '40px',
        fontSize: 40,
        color: '#ffffff'
      }}
    >
      <h1 style={{
        fontSize: '40px',
        textShadow: '4px 4px 2px rgba(0,0,0,0.6)'}}
      >Phonebook</h1>

      <IconButton onClick={toggleModal} aria-label="Добавить contact">
        <AddIcon width="40" height="40" fill="#fff"/>
      </IconButton>

      {showModal && (
        <Modal onClose={toggleModal}>
          <ContactForm onSubmit={formSubmitHandler}/>
        </Modal>
      )}

      <h2 style={{
        fontSize: '40px',
        textShadow: '4px 4px 2px rgba(0,0,0,0.6)'}}
      >Contacts</h2>

      <Filter value={filter} onChange={changeFilter}/>
      <ContactList options={visibleContacts} onDeleteContact={deleteContact}/>    
    </div>
  );
}

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//     showModal: false,
//   }

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if(parsedContacts) {
//       this.setState({
//         contacts: parsedContacts,
//       })
//     }
//   }

//   componentDidUpdate (prevProps, prevState) {
//     const nextContacts = this.state.contacts;
//     const prevContacts = prevState.contacts;

//     if(prevContacts !== nextContacts) {
//       localStorage.setItem('contacts', JSON.stringify(nextContacts));
//     }
//   }

//   // formSubmitHandler = (name, number) => {
//   //   if(this.duplicateContact(name)){
//   //     return alert(`${name} is already in contacts`);
//   //   }

//   //       const contact = {
//   //         id: nanoid(),
//   //         name: name,
//   //         number: number,
//   //       };
    
//   //       this.setState(prevState => ({
//   //         contacts: [contact, ...prevState.contacts],
//   //       }));

//   //       this.toggleModal();
//   // };

//   // duplicateContact = (name) => {
//   //   return this.state.contacts.find(contact => 
//   //     contact.name === name);
//   // };

//   // changeFilter = evt => {
//   //   this.setState({
//   //     filter: evt.currentTarget.value,
//   //   })
//   // }

//   // getVisibleContacts = () => {
//   //   const {filter, contacts} = this.state;
//   //   const normalizedFilter = filter.toLowerCase();

//   //   return contacts.filter(({name}) => 
//   //     name.toLowerCase().includes(normalizedFilter));
//   // };

//   // deleteContact = contactId => {
//   //   this.setState(({contacts}) => ({
//   //     contacts: contacts.filter(contact => contact.id !== contactId)
//   //   }));
//   // }

//   // toggleModal = () => {
//   //   this.setState(({showModal}) => ({
//   //     showModal: !showModal,
//   //   }))
//   // }

//   render () {
//     // const {filter, showModal} = this.state;
//     // const visibleContacts = this.getVisibleContacts();

//     return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//         gap: '40px',
//         fontSize: 40,
//         color: '#ffffff'
//       }}
//     >
//       <h1 style={{
//         fontSize: '40px',
//         textShadow: '4px 4px 2px rgba(0,0,0,0.6)'}}
//       >Phonebook</h1>

//       <IconButton onClick={this.toggleModal} aria-label="Добавить contact">
//         <AddIcon width="40" height="40" fill="#fff"/>
//       </IconButton>

//       {showModal && (
//         <Modal onClose={this.toggleModal}>
//           <ContactForm onSubmit={this.formSubmitHandler}/>
//         </Modal>
//       )}

//       <h2 style={{
//         fontSize: '40px',
//         textShadow: '4px 4px 2px rgba(0,0,0,0.6)'}}
//       >Contacts</h2>

//       <Filter value={filter} onChange={this.changeFilter}/>
//       <ContactList options={visibleContacts} onDeleteContact={this.deleteContact}/>    
//     </div>
//   );
//   }
// };

// export default App;