import React, {useState , useEffect} from 'react';
import Photo from './Photo';
import { FaSearch } from 'react-icons/fa';

import './App.css'
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`




const App=()=> {
  const [loading , setLoading] =useState(false)
  const [photos, setPhotos] =useState([])
  const [page, setPage] = useState(0)
  const [query , setQuery] =useState('')

  const fetchData = async()=>{
    setLoading(true)
        let url;
        /*we need to mention pageat the end of url, because when we recive to the button of page next page will be loading*/
        const urlPage = `&page=${page}`
        const urlQury = `&query=${query}`


        if(query){
           url=`${searchUrl}?client_id=Rm2b8WPQ76E1EflHrg7uLO5CFjMbtyr1k2ICA6V1fB8${urlPage}${urlQury}`
        }else{
          url= `${mainUrl}?client_id=Rm2b8WPQ76E1EflHrg7uLO5CFjMbtyr1k2ICA6V1fB8${urlPage}`
        }
        

  
    const response =await fetch(url)
    const data= await response.json()
    ///console.log(data)
    setPhotos((oldPhotos)=>{
        if(query && page ===1 ){
          return data.results
         }
     else if(query){
        return [...oldPhotos , ...data.results]
      }else{
        return [...oldPhotos , ...data]
      }
      
    })
    setLoading(false)
  }

useEffect(()=>{
  fetchData()
}, [page])

/*--------------logic to fetch more image by scroll-----*/
/* we need to just fetch data when the loading false ast+ meane that loading ended and first page is visisbel and then try to laod more page*/
useEffect(()=>{
  const event=window.addEventListener('scroll', ()=>{

    if((!loading && window.innerHeight + window.scrollY) >= document.body.scrollHeight-2){
     setPage((oldPage)=>{
       return oldPage+1
     })
    }
  })
  return ()=> window.removeEventListener('scroll', event)
}, [])

const handelSubmit=(e)=>{
e.preventDefault()
setPage(1)
}
  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input type="text" placeholder='search...' className='form-input' value={query} onChange={(e)=>setQuery (e.target.value)}/> 
          <button type='submit' onClick={handelSubmit} className='submit-btn '> <FaSearch /></button>
        </form>
      </section>
     <section className='photos'>
        <div className='photos-center'>
          {photos.map((image, index) => {
            return <Photo key={index} {...image} />;
          })}
        </div>
      </section>
     {loading && <h2 className='loading'>Loading...</h2> }
    </main>
  );
}

export default App;
