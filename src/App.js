import logo from './logo.svg';
import './App.css';


import './styles.css'
import React, {Component} from 'react';

import {InputComponent} from './components/input.component.jsx'





class App extends Component {
 
  constructor(props){
    super(props);
    this.state = {
 
      items: [],
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      superviser: ""

    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhonenumberChange = this.handlePhonenumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectorChange = this.handleSelectorChange.bind(this);
  }



  handleFirstNameChange(event) {
    this.setState({firstname: event.target.value});
  }
  handleLastNameChange(event) {
    this.setState({lastname: event.target.value});
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }
  handlePhonenumberChange(event) {
    this.setState({phonenumber: event.target.value});
  }

  handleSelectorChange(event) {
    this.setState({phonenumber: event.target.value});
  }

  handleSelectorChange(event) {
    this.setState({superviser: event.target.value});
  }

  


  componentDidMount() {
    fetch('/api/supervisors')
        .then(response => response.json())
        .then(data => this.setState({items:data}));
  }

  handleSubmit(event) {
    alert('Success');
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({ 
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        email: this.state.email,
        phonenumber: this.state.phonenumber,
        superviser: this.state.superviser
      })
    };

    fetch('/api/submit', requestOptions)
      .then(response => console.log(response.json()));

  }



  render(){

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>

          <h1>Notification form</h1>
          <label>First Name</label>
          <br/>
        
          <input type="text" firstname={this.state.firstname} onChange={this.handleFirstNameChange} required/>
          <br/>
          <br/>
          <label>Last Name</label>
          <br/>
          
          <input type="text" lastname={this.state.lastname} onChange={this.handleLastNameChange} required/>
          <br/>
          <br/>
          <label>Email</label>
          
          <br/>
          <input type="email" email={this.state.email} onChange={this.handleEmailChange} />
          <br/>
          <br/>


          <label>Phone Number</label>
          <br/>
          <input type="tel" name="phone" placeholder="123-345-6789" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
            phonenumber={this.state.phonenumber} onChange={this.handlePhonenumberChange} required/>
          <br/>
          <br/>

          <label> Select superviser </label>  
          <br/>
          <select value={this.state.superviser} onChange={this.handleSelectorChange}>  

            {this.state.items.map(item => (
              <option key={item} value={item}>{item}</option>
              
            ))}

          </select>  
          <br/>
          
          <input type="submit" value="Submit" />


        </form>
      </div>



    );


  }


}

export default App;
