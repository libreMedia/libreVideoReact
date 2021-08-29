import React, { useState, useEffect, Suspense } from "react";
import { Jumbotron, Button, Container, Row, Col,  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,  } from 'reactstrap';
import { useHistory } from "react-router-dom";

import globURL from "../Utils/urlSwitcher";
import fetchy from "../Utils/fetcher";

const Home = () => {

  const history = useHistory();
  const [allRoutes, setAllRoutes] = useState([]);

  let ok = [] as any
  const data = async () => {
    fetchy(globURL + 'dirList').then(async (data) => {
      // console.log(data.userTrunk);
      let derta = await data
      // console.log(derta)
      derta.forEach((el: string) => {
        ok.push(el)
      });
      setAllRoutes(ok)
    });
  };



  useEffect(() => {
    data()

  }, []);

  let ninja = (e:any)=>{
    let okay = e.target.nextElementSibling.classList 
    okay.remove("ninjaVanish")
    okay.add("ninja")
  }
  let ninjaVanish = (e:any)=>{
    console.log('benixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    let okay = e.target.nextElementSibling.classList 
    okay.remove("ninja")
    okay.add("ninjaVanish")
  }
  let ninjaD = (e:any)=>{
    let okay = e.target.classList 
    okay.remove("ninjaVanish")
    okay.add("ninja")
  }
  let ninjaVanishD = (e:any)=>{
    console.log('benixxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    let okay = e.target.classList 
    okay.remove("ninja")
    okay.add("ninjaVanish")
  }

  const setRando = (e: any) => {
    console.log(allRoutes)
    let RandoNumInArr = Math.ceil(Math.random() * allRoutes.length)
    let  rando = allRoutes[RandoNumInArr];
    localStorage.setItem('fileChosen', rando['VidRoute']);
    history.push("/rando");
  }
  const setLinkInStorage = (e: any) => {
    let okay = e.target.id
    console.log(okay)
    localStorage.setItem('fileChosen', okay);
    history.push("/mainVid");
  }


  let gu = globURL.slice(0, -1)
  return (
    <Container className='pt-5'>
      <Jumbotron className='jumboTron' fluid>
        <h1 className="display-3 jumboTitle">Libre Video</h1>
        <p className="lead">Enjoy the freedom of your own videos</p>
        <hr className="my-2" />
        <p>Don't tread on me </p>
        <p>RareHoss.jpg</p>
      </Jumbotron>
        <p className="lead">
          <Button color="prim" className='randoButt mt-5' onClick={setRando}>Play Rando Vid</Button>
        </p>
        <hr className="my-2" />
        <Container fluid>
      <Row className='align-items-center'>
      {allRoutes.map(vid => (
            <Col lg={{ size:6}} sm="12" className='pt-3 pb-3'>
        <Card  className="shad">
            <CardImg top height="300px" id={`${vid['VidRoute']}`} className='card-img' src={`${gu}${vid['ScreenShotRoute']}`} onClick={setLinkInStorage} onMouseEnter={ninja} onMouseLeave={ninjaVanish} alt="Card image cap" />
            <CardBody className="vidCardBod  ninjaVanish" onMouseEnter={ninjaD} onMouseLeave={ninjaVanishD}>
              <CardTitle tag="h5">{vid['VidName']}</CardTitle>
              {{/*TODO
              parse/regex the titles and remove odd chard between () or [] and replace . with whitespace
              */}},
              <a href={`${gu}${vid['ScreenShotRoute']}`}><CardSubtitle tag="h6" className="mb-2 text-muted">screen-shot link</CardSubtitle></a>
              <CardText>Watch the show already...</CardText>
              <Button className='watchButt' color='sec' id={`${vid['VidRoute']}`} onClick={setLinkInStorage}>Watch</Button> 
            </CardBody>
          </Card>
        </Col>
        ))}
      </Row>
      </Container>
    </Container>
  );
};

export default Home;