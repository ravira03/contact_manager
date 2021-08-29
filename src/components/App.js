import React,{useState,useEffect} from "react";
import { uuid } from "uuidv4";
import './App.css';

//Components
import Header  from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";


function App() {
  const LOCAL_STORAGE = "contacts";
  const [contacts,setContact] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact);
    setContact([...contacts,{id: uuid(),...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContact(newContactList);
  }

  useEffect(() => {
    const retriveData = JSON.parse(localStorage.getItem(LOCAL_STORAGE));
    if(retriveData) setContact(retriveData);
  },[]);
  
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE,JSON.stringify(contacts));
  },[contacts]);


  return (
    <div className="ui container">
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId = {removeContactHandler} />
    </div>
  );
}

export default App;
