import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGallery from './components/ImageGallery';
import './App.css';
import Searchbar from './components/Searchbar';
import TextButton from './components/TextButton';
import Loader from './components/Loader';
import Modal from './components/Modal';

class App extends Component {
  state = {
    inputValue: '',
    pictures: [],
    page: 1,
    isPending: false,
    error: null,
    isModalOpen: false,
    modalImg: '',
  };

  componentDidUpdate() {
    if (this.state.isPending) {
      fetch(
        `https://pixabay.com/api/?q=${this.state.inputValue}&page=${this.state.page}&key=24782387-235d5961f89ca8adc0055c0c3&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('no such pictures found'));
        })
        .then(pictures => {
          if (pictures.totalHits === 0) {
            toast.error('no pictures found');
          }
          this.setState(prevState => ({
            pictures:
              this.state.page > 1
                ? [...prevState.pictures, ...pictures.hits]
                : pictures.hits,
            isPending: false,
          }));
        })
        .catch(error => this.setState({ error: error, isPending: false }));
    }
  }

  handleSetQuery = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onLoadMorePages() {
    this.setState(prevState => ({
      isPending: true,
      page: prevState.page + 1,
    }));
  }

  handleFormSubmit = event => {
    event.preventDefault();

    this.setState({ isPending: true, page: 1, pictures: [] });
  };

  handleModalToggle = image => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
      modalImg: image,
    }));
  };

  render() {
    const { error, pictures } = this.state;

    return (
      <div>
        <ToastContainer position="top-center" autoClose={3000} />
        {error && <h1>{error.message}</h1>}
        <Searchbar
          handleFormSubmit={this.handleFormSubmit}
          handleSetQuery={this.handleSetQuery}
          inputValue={this.state.inputValue}
        />

        {this.state.isPending && this.state.page === 1 ? (
          <Loader />
        ) : pictures.length > 0 ? (
          <ImageGallery
            pictures={pictures}
            handleModalToggle={this.handleModalToggle}
          />
        ) : null}

        {!(pictures.length > 0) ? null : !this.state.isPending ? (
          <TextButton
            onClick={() => {
              this.onLoadMorePages(this);
            }}
          >
            Load more
          </TextButton>
        ) : (
          <Loader />
        )}
        {this.state.isModalOpen && (
          <Modal
            handleModalToggle={this.handleModalToggle}
            image={this.state.modalImg}
          />
        )}
      </div>
    );
  }
}

export default App;
