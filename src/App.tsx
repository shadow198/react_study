import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Hello from "Hello";
import MouseTractker from './MouseTractker'
import useMouseTracker from './hooks/useMouseTracker'
import useURLLoader from 'hooks/useURLLoader'

interface IThemeProps {
  [key: string]: { background: string, color: string}
}

const themes: IThemeProps = {
  'light': {
    color: '#000',
    background: '#f5a623'
  },
  'dark': {
    color: '#9cbc32',
    background: '#000'
  }
}

interface IShowResult {
  message: string,
  status: string 
}



export const AppCtx = React.createContext(themes.light);


function App() {
  const position = useMouseTracker()
  const [show, setshow] = useState(false)
  const [loading, data] = useURLLoader('https://dog.ceo/api/breeds/image/random', [show])
  const [theme, settheme] = useState(themes.light)
  const  dogResult = data as IShowResult;
  const changeTheme = () => {
    if (theme.color == '#000') {
      settheme(themes.dark)
    } else {
      settheme(themes.light)
    }
  }
  return (
    <div className="App">
       <AppCtx.Provider value={theme}>
        <header className="App-header">

          <p>
            x: {position.x}, y: {position.y}
          </p>
          <button onClick={ ()=>{  setshow(!show)} }>点击刷新狗狗</button>
          { loading ? <p>狗狗读取中</p>
          : <img style={{width: '300px', objectFit: 'contain'}} src={dogResult && dogResult.message} />}
          {/* <MouseTractker/>   */}
          <button onClick={()=>{ changeTheme() }}>switch theme</button>
          <Hello></Hello>
        </header>
       
       </AppCtx.Provider>
    </div>
  );
}

export default App;
