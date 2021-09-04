import React, { useState, useEffect, Suspense } from "react";
import {
  Jumbotron, Button, Container, Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,
} from 'reactstrap';
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import globURL from "../Utils/urlSwitcher";
import fetchy from "../Utils/fetcher";
import rareHoss from "../Utils/rareHoss";
import AlphaDrop from "../Components/HomeAlphaDrop";


import { hashy, deHashy } from '../Utils/crypto';

// let alphabet = 'abcdefghijklmnopqrstuvwxyz'
// let alphaArr = alphabet.split('')

const Home = () => {



  const history = useHistory();
  const [rootAllRoutes, setRootAllRoutes] = useState<any[]>([]);
  const [allRoutes, setAllRoutes] = useState<any[]>([]);
  const [alphaSetArr, setAlphaSet] = useState<any[]>([]);

  let ok = [] as any
  let alphaSet = new Set()

  const alphaSort = (arr:any[]) => {
    arr.sort(function(a, b) {
      var nameA = a; 
      var nameB = b;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    });
  }

  const setAlpha= (arr:string[])=>{
    if(ok != null){
      ok.forEach((element: { VidName: string; }) => {
        let alphaAvailible = element.VidName.charAt(0).toLowerCase()
        alphaSet.add(alphaAvailible)
      });
    }
    let arrFromSet = Array.from(alphaSet)
    arrFromSet.sort(function(a:any, b:any) {
      return a - b;
    });
    alphaSort(arrFromSet)
    console.log(arrFromSet)
    setAlphaSet(arrFromSet)
    
  }
  const data = async () => {
    // var existingRoutes = localStorage.getItem("allRoutes");
    // if (existingRoutes) {
    //   setAllRoutes(JSON.parse(existingRoutes))
    // } 
    // else {
    fetchy(globURL + 'dirList').then(async (data) => {
      // console.log(data.userTrunk);
      let derta = await data
      // console.log(derta)
      derta.forEach((el: string) => {
        ok.push(el)
      });
      localStorage.setItem("allRoutes", JSON.stringify(ok));
      setAllRoutes(ok)
      setRootAllRoutes(ok)
      setAlpha(ok)
    }
    );
    // }
  };



  useEffect(() => {
    data()
  }, []);

  let ninja = (e: any) => {
    let okay = e.target.parentElement.parentElement.querySelector('.vidCardBod').classList
    if (okay !== null) {
      console.log(okay)
      okay.remove("ninjaVanish")
      okay.add("ninja")
    } else {
      console.log('nulllsz')
    }
  }
  let ninjaVanish = (e: any) => {
    let okay = e.target.parentElement.parentElement.querySelector('.vidCardBod').classList
    okay.remove("ninja")
    okay.add("ninjaVanish")
  }
  let ninjaD = (e: any) => {
    let okay = e.target.classList
    okay.remove("ninjaVanish")
    okay.add("ninja")
  }
  let ninjaVanishD = (e: any) => {
    let okay = e.target.classList
    okay.remove("ninja")
    okay.add("ninjaVanish")
  }

  const setRando = (e: any) => {
    console.log(allRoutes)
    let RandoNumInArr = Math.ceil(Math.random() * allRoutes.length)
    let rando = allRoutes[RandoNumInArr];
    localStorage.setItem('fileChosen', rando['VidRoute']);
    localStorage.setItem('mainVidName', rando['VidName']);
    history.push("/mainVid");
  }
  const setLinkInStorage = (e: any) => {
    let okay = e.target.id
    localStorage.setItem('fileChosen', okay);
    localStorage.setItem('mainVidName', okay);
    history.push("/mainVid");
  }

  const paginateCharAt = (selected:string) => {
    let newThing: object[]  = []
    let oldArr = rootAllRoutes
    oldArr.forEach(element => {
      if (element !== null) {
        let vidName = element.VidName
        if(vidName.charAt(0)===selected|| vidName.charAt(0)===selected.toUpperCase()){
          // console.log(element.VidName)
          newThing.push(element)
        }
      }
    });
    setAllRoutes(newThing)
  }

  const handleSelect = (e:any)=> {
    paginateCharAt(e)
 }

  let gu = globURL.slice(0, -1)
  return (
    <Container className='pt-5'>
      <Jumbotron className='jumboTron' fluid>
        <h1 className="display-3 jumboTitle">Libre Video</h1>
        <p className="lead">Enjoy the freedom of your own videos</p>
        <hr className="my-2" />
        <p>Don't tread on me </p>
        <img height='100px' src={rareHoss} alt="Rare Hoss.jpg" />
        {/* <p>RareHoss.jpg</p> */}
      </Jumbotron>
      <Row>
        <Col>
          <Button color="prim" className='randoButt mt-5' onClick={setRando}>Play Rando Vid</Button>
        </Col>
        <Col>
          <AlphaDrop dropDownTitle={'Starts With'} handleSelect={handleSelect} menuTitle={'Get all videos starting with'} menuPages={alphaSetArr}/>
        </Col>
      </Row>
      <hr className="my-2" />
      <Container fluid>
        <Row className='align-items-center'>
          {allRoutes.map(vid => (
            <Col lg={{ size: 6 }} sm="12" className='pt-3 pb-3'>
              <Card className="shad">
                {/* <CardImg top height="300px" id={`${vid['VidRoute']}`} className='card-img' src={`${gu}${vid['ScreenShotRoute']}`} onClick={setLinkInStorage} onMouseEnter={ninja} onMouseLeave={ninjaVanish} alt="Card image cap" /> */}
                <LazyLoadImage
                  onClick={setLinkInStorage}
                  onMouseEnter={ninja}
                  onMouseLeave={ninjaVanish}
                  id={`${vid['VidRoute']}`}
                  className='card-img'
                  // placeholder={baser}
                  placeholderSrc={`${gu}${vid['ScreenShotRoute']}`}
                  alt=""
                  threshold={1}
                  effect="blur"
                  delayMethod="debounce"
                  src={`${gu}${vid['ScreenShotRoute']}`} // use normal <img> attributes as props
                  width="100%"
                  height="300px"
                />
                <CardBody className="vidCardBod  ninjaVanish" onMouseEnter={ninjaD} onMouseLeave={ninjaVanishD}>
                  <CardTitle tag="h5">{vid['VidName']}</CardTitle>
                  {/*TODO
              parse/regex the titles and remove odd chard between () or [] and replace . with whitespace
              */},
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