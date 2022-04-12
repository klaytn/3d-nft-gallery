import React, {useEffect, useState}from "react";
import KaikasPage from "./pages/KaikasPage";
import './App.css';
import Unity, { UnityContext, RegisterExternalListener } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "build/webgl.loader.js",
  dataUrl: "build/webgl.data.unityweb",
  frameworkUrl: "build/webgl.framework.js.unityweb",
  codeUrl: "build/webgl.wasm.unityweb",
});

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cursor, setCursor] = useState("");
  useEffect(function () {
    unityContext.on("loaded", function () {
      setIsLoaded(true);
    });
  }, []);

  useEffect(function (){
    unityContext.on("ReloadNFTJS", function(c){
      setCursor(c)
      if(cursor == c){
        setCursor(null)
        setCursor(c)
      }
      else{
        setCursor(c)
      }
    });
  }, []);

  function handleClick(e) {
    unityContext.setFullscreen(true);
  }

  useEffect(() => {
    window.addEventListener('click', (event) => {
      if(event.target.id == "unity-canvas-1") 
      {
        unityContext.send("GameObject", "updateFocus", 1)
      }
    });
    window.addEventListener('keydown', (event )=>{
      if (event.key == "Escape")
      {
        unityContext.send("GameObject", "updateFocus", 0)
      }
    })
  }, []);
  
  return (
    <div id= "unity" className="wrapper" >
      <div className="unity-footer">
        <div className="unity-webgl-logo"></div>
        <button className="unity-fullscreen-button" onClick={handleClick}></button>
      </div>
      <div className = "unity-focus">
        <p>Click Unity scene to move player. Press ESC key to detach player controller. </p>
      </div>
        
      <Unity style={{
          height: "100%",
          width: "60%",
          border: "2px solid black",
          background: "grey",
      }} unityContext={unityContext} />
      <KaikasPage unityLoaded={isLoaded} unityContext={unityContext} currentCursor={cursor} />
    </div>
  ) 
}

export default App;
