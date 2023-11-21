import { useState, useEffect } from "react";
import './App.css'

function App() {
  const [patron, setPatron] = useState([])
  const [contador, setContador] = useState([])
  const [iluminado, setIluminado] = useState(null)
  const [game, setGame] = useState(true)
  const colores = ["yellow", "blue", "green", "red"]

  function agregarPatron(){
    setPatron([...patron, Math.floor(Math.random() * 4)])
  }

  useEffect(() => {
    function comprobar(){
      if(contador.length > 0 && contador.length <= patron.length){
        if(patron[contador.length - 1] !== contador[contador.length - 1]){
          setPatron([])
          setGame(false)
          console.log("Perdiste")
          return;
        }
      if(patron.length === contador.length){
        console.log("buena")
        setContador([])
        agregarPatron()
      }
      }
      
    }
    comprobar()
  }, [contador, patron])

  function animacion(){
    let indice = 0;
    let intervalo;
    function luz(){
      if(indice < patron.length){
        setIluminado(patron[indice])
        console.log(patron[indice])
        indice++
      } else {
        setIluminado(null)
        clearInterval(intervalo)
      }
    }
    setIluminado(null)
    //luz()
    intervalo = setInterval(() => {
      setIluminado(null);
      setTimeout(() => {
        luz();
      }, 500);
    }, 1000);
  }

  useEffect(() => {
    if (patron.length > 0) {
      animacion();
    }
  }, [patron]);


  return (
    <>
    <h1>JUEGO DE LA MEMORIA</h1>
    <h2>Aprieta jugar y repite los colores</h2>
    <div className="board">
      {colores.map((color, index) => (
        <button onClick={() => setContador([...contador, index])} disabled={patron.length === 0 || iluminado !== null ? true : false} className="boton" id={color} style={{backgroundColor: color, filter: iluminado === index ? 'brightness(1)' : ''}}/>
      ))}
      <div className="count"> 
        <>
        {game === true && patron.length === 0 ? <button onClick={() => agregarPatron()}>JUGAR</button> : <h2>{patron.length}</h2>}
        {game === false ? ( <div> <p>Perdiste</p> <button onClick={() => (setContador([]), setGame(true))}>Jugar de nuevo</button> </div> ) : ""}
        </>
      </div>
    </div>
    </>
  );
}

export default App;
