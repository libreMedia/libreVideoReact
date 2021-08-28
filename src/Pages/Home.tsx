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

  const setLinkInStorage = (e: any) => {
    let okay = e.target.id
    console.log(okay)
    localStorage.setItem('fileChosen', okay);
    history.push("/mainVid");
  }
  let gu = globURL.slice(0, -1)
  return (
    <Container>
      <Jumbotron>
        <h1 className="display-3">Libre Video</h1>
        <p className="lead">Enjoy the freedom of your own videos</p>
        <hr className="my-2" />
        <p>Don't tread on me </p>
        <p>RareHoss.jpg</p>
        <p className="lead">
          <Button color="prim">Learn More</Button>
        </p>
      </Jumbotron>
      <Row>
      {allRoutes.map(vid => (
            <Col lg="6" sm="12" className="p-5">
        <Card>
            <CardImg top width="100%" src={`${gu}${vid['ScreenShotRoute']}`} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">{vid['VidName']}</CardTitle>
              <a href={`${gu}${vid['ScreenShotRoute']}`}><CardSubtitle tag="h6" className="mb-2 text-muted">screen-shot link</CardSubtitle></a>
              <CardText>Watch the show already...</CardText>
              <Button id={`${vid['VidRoute']}`} onClick={setLinkInStorage}>Watch</Button> 
            </CardBody>
          </Card>
        </Col>
        ))}



      </Row>
    </Container>
  );
};

export default Home;