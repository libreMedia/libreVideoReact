import React, { useState, useEffect, Suspense } from "react";

import ReactPlayer from 'react-player/lazy'
import fetchy from "../Utils/fetcher";
import getRandomItem from "../Utils/getRandom";
import globURLTest from "../Utils/urlSwitcher";

function RandoVid() {
  
  const [allRoutes, setAllRoutes] = useState<string[]>([]);
  
  let ok = [] as any
  const data = async () => {
    fetchy(globURLTest+'dirList').then(async (data) => {
      // console.log(data.userTrunk);
      let derta = await data
      console.log(derta)
      derta.forEach((el: string) => {
        ok.push(el)
      });
      setAllRoutes(ok)
    });
  };



useEffect(() => {
data()
},[]);

let benix = getRandomItem(allRoutes)

return (
    <div className="Rando">
      <ReactPlayer url={globURLTest+'static/'+benix} loop={true} controls={true} />
      <p>

{benix}
      </p>
    </div>
  );
}

export default RandoVid;