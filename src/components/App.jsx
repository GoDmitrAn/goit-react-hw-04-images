import { Searchbar } from './Searchbar/Searchbar';
import axios from 'axios';
import { Component } from 'react';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;
export class App extends Component {
  state = {
    search: '',
  };
  formSubmitHandler = data => {
    this.setState({ search: data });
    console.log(`'app-data'`, data);
  };
  render() {
    return (
      <div>
        <Searchbar onSubmitForm={this.formSubmitHandler} />
      </div>
    );
  }
}
