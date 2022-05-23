import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Gelato from './Gelato.js'
import './menu.css'
function Menu() {

  const url = "https://react--course-api.herokuapp.com/api/v1/data/gelateria";
  const [gelati,setGelati] = useState([]);
  const [gelatiFiltrati,setGelatiFiltrati]=useState([])
  const [categorie,setCategorie] =useState([]);
  const [active, setActive] = useState(0);
  const [isError,setIsError] = useState(false);
  const [isLoading,setIsLoading] =useState(false);

  useEffect(()=>{
    setActive(0)
    setIsLoading(true);
    (async()=>{
      try{
        let response = await axios.get(url);
        setGelati(response.data.data);
        setGelatiFiltrati(response.data.data)
        let categorie = [];
        categorie.push("ALL");
        categorie.push(...new Set(response.data.data.map(el => el.categoria)));
        setCategorie(categorie);
        setIsLoading(false);
      }
      catch(err){
        setIsError(true);
        setIsLoading(false);
        console.log(err);
      }
    })()

  },[])

  const filtraGelati = (categoria,index)=>{
    if(categoria === "ALL"){
      setGelatiFiltrati(gelati);
      setActive(0)
    }else{
      setActive(index)
      setGelatiFiltrati(gelati.filter( el =>{
        return el.categoria === categoria;
      }))
    }
    

  }

  return (
     
    <div className="menu">

      {
      isLoading && !isError ? <h2>sto caricando</h2> 
        :
      isError ? <h2>Errore nella ricerca dei gelati</h2> 
        :
      <>
        <h2 className='intestazione-menu'>Le nostre scelte</h2>
        <div className="categorie">
          {categorie.map((el,index)=>{
            return <span onClick={()=>{filtraGelati(el,index)}} className={`categoria ${active === index ? 'active' : ''}`} key={index} >{el}</span>
          })}
        
        </div>
        <hr className='hr-menu-gelati'/>
        <div className="menu-gelati">
          {gelatiFiltrati.map(el=>{
            return <Gelato key={el.id} {...el}/>
          })}
        </div>
      
      </>
      
      }
     
    </div>

  )
}

export default Menu