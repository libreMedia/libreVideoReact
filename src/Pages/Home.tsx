import React, { useState, useEffect, Suspense } from "react";
import { Jumbotron, Button, Container, NavLink, Row, Col} from 'reactstrap';
import { useHistory } from "react-router-dom";

import ReactPlayer from 'react-player/lazy'

import globURLTest from "../Utils/urlSwitcher";
import fetchy from "../Utils/fetcher";

const Home = () => {

    const history = useHistory();
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

  const setLinkInStorage = (e:any)=>{
    let okay = e.target.id
    localStorage.setItem('fileChosen', okay);
    history.push("/mainVid");
  }

  return (
        <Container>
      <Jumbotron>
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-2" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <p className="lead">
          <Button color="primary">Learn More</Button>
        </p>
      </Jumbotron>

      <Row>
  {allRoutes.map(file => (
          <Col key={file} id={file} onClick={setLinkInStorage}>
    {globURLTest+'static/'+file}
</Col>

  ))}
</Row>
      </Container>
  );
};

export default Home;