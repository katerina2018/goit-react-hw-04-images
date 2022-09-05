import  { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageGallery from './components/ImageGallery';
import './App.css';
import Searchbar from './components/Searchbar';
import TextButton from './components/TextButton';
import Loader from './components/Loader';
import Modal from './components/Modal';

function App () {
  const [inputValue, setInputValue] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  

  useEffect(() => {
     if (isPending) {
      fetch(
        `https://pixabay.com/api/?q=${inputValue}&page=${page}&key=24782387-235d5961f89ca8adc0055c0c3&image_type=photo&orientation=horizontal&per_page=12`,
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
          else if( page > 1) {setPictures(prevState=>[...prevState, ...pictures.hits])}
           else{setPictures(pictures.hits)} 
          
          setIsPending(false)


        })
        .catch(error => 
          {setError(error)
          setIsPending(false)}
          );
    }
  }, [inputValue, isPending, page]);

  

  const handleSetQuery = event => {
    setInputValue(event.target.value)
   
  };

  const onLoadMorePages=()=> {
    setIsPending(true)
    setPage(prevState=> prevState + 1)
    
  }

  const handleFormSubmit = event => {
    event.preventDefault();
    setIsPending(true);
    setPage(1);
    setPictures([]);
   
  };

  const handleModalToggle = image => {
    setIsModalOpen(state=>!state)
    setModalImg(image)
    
  };

 

    return (
      <div>
        <ToastContainer position="top-center" autoClose={3000} />
        {error && <h1>{error.message}</h1>}
        <Searchbar
          handleFormSubmit={handleFormSubmit}
          handleSetQuery={handleSetQuery}
          inputValue={inputValue}
        />

        {isPending && page === 1 ? (
          <Loader />
        ) : pictures.length > 0 ? (
          <ImageGallery
            pictures={pictures}
            handleModalToggle={handleModalToggle}
          />
        ) : null}

        {!(pictures.length > 0) ? null : !isPending ? (
          <TextButton
            onClick={() => {
              onLoadMorePages();

             
            }}
          >
            Load more
          </TextButton>
        ) : (
          <Loader />
        )}
        {isModalOpen && (
          <Modal
            handleModalToggle={handleModalToggle}
            image={modalImg}
          />
        )}
      </div>
    );
  }

export default App;
