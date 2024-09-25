import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';

function App() {
  
  let [movieData,setmovieData] = useState([]);

  let [title,setTitle] = useState('')

  let getMovieList=() =>{

    
    let apiUrl;
    if(title!==''){
      apiUrl=`https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${title}`
    }else{
      apiUrl=`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`
    }

    axios.get(apiUrl)
    .then((response) => {
      return response.data
    })
    .then((finalres)=>{
      setmovieData(finalres.results)
    })
  }

  let getValue= (event)=>{
    setTitle(event.target.value)
  }

  useEffect(() => {
    getMovieList();
  },[title])
   

  return ( 
    <>
     <h1 className='text-[40px] font-bold text-center my-[50px]'>Movie Api</h1>
     <div className='max-w-[1320px] mx-auto'>
        <input value={title} onChange={getValue} type="text" className='w-[100%] mb-[30px] p-3 h-14 text-[30px] border-2 border-black rounded-[20px] ' placeholder='Searce By Title' />
     </div>
     <div className="max-w-[1320px] mx-auto grid grid-cols-4 gap-4">
      {
        movieData.length>=1 ?

        movieData.map((items)=>{
          return(
            <MovieTypez items={items}/>
          )
        })
        :
        <div>No Data Found</div>
      }
      
      

     </div>
    </>
  )
}

function MovieTypez({items}) {

  let imgPath= `https://image.tmdb.org/t/p/w1280/`
  return(
    <div className="shadow-lg">
    <img className='w-full' src={imgPath+ items.poster_path} alt="" />
    <div className='p-3'>
      <h3 className='text-[30px] '>{items.title}</h3>
      <h3>{items.release_date}</h3>
    </div>
  </div>
  )
}

export default App
