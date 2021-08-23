import React, { useState, useEffect, Suspense } from "react";
import Nav from "./Components/Nav";
import './App.css';

function App() {
  
  const [allRoutes, setAllRoutes] = useState<string[]>([]);

useEffect(() => {

},[]);


return (
    <div className="App">
<Nav />
    </div>
  );
}

export default App;
