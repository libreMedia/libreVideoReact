import React, { useState, useEffect, Suspense, useRef } from "react";
import ReactPlayer from 'react-player/lazy'

import { Button, Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Progress } from 'reactstrap';
import globURL from "../Utils/urlSwitcher";
import Ico from "../Utils/Ico";
import Playbutt from "../Utils/PlayButt";
import { setInterval } from "timers";

let yellowCog = "http://www.clker.com/cliparts/4/5/9/D/X/I/gear-orange-cog-hi.png"

export default function MainVid() {
    const [stateFile, setChosenFile] = useState<string>();
    const [pBRate, setPBRate] = useState<number>(1);
    const [currentTime, setCurrentTime] = useState<number>(1);
    const [vol, setVol] = useState<number>(1);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [playPause, setPlayPause] = useState(true);
    const [controls, setControls] = useState(true);
    const [allRoutes, setAllRoutes] = useState([]);
    const [mainVidTitle, setMainVidTitle] = useState('');

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const player = useRef<ReactPlayer>(null)

    let randoNext = () => {
        var existingRoutes = localStorage.getItem("allRoutes");
        if (existingRoutes) {
            setAllRoutes(JSON.parse(existingRoutes))
        } else {
            console.log('borklyfe')
        }

    }

    const thing = () => {
        randoNext()
        let chosenTitle = localStorage.getItem('mainVidName');
        const chosenFile = localStorage.getItem('fileChosen');
        console.log(chosenFile)
        setChosenFile(chosenFile as string)
        setMainVidTitle(chosenTitle as string)
        return chosenFile
    }

    const setRando = () => {
        console.log(allRoutes)
        let randoNumInArr = Math.ceil(Math.random() * allRoutes.length)
        console.log(randoNumInArr)
        let rando = allRoutes[randoNumInArr];
        localStorage.setItem('fileChosen', rando['VidRoute']);
        localStorage.setItem('mainVidName', rando['VidName']);
        setMainVidTitle(rando['VidName'])
        setChosenFile(rando['VidRoute'])
    }



    const setNext = (e: any) => {

        let rooot: any;
        let vidNamee: any;

        allRoutes.find((thing1: any, thing2: any) => {
            // console.log(thing1.VidFileLoc, thing2);
            e.preventDefault()
            if (thing1.VidRoute === localStorage.getItem('fileChosen')) {
                const thing3 = allRoutes[thing2 + 1]
                console.log(thing3);

                console.log(thing3);
                rooot = thing3['VidRoute']
                vidNamee = thing3['VidName']

            }

        })
        console.log('route: ', rooot);
        console.log('vidName: ', vidNamee);
        localStorage.setItem('fileChosen', rooot);
        localStorage.setItem('mainVidName', vidNamee);
        setMainVidTitle(vidNamee)
        setChosenFile(rooot)
    }

    let volLoop = (e: any) => {
        console.log(vol)
        if (vol <= 1) {
            setVol(0.5)
        }
        if (vol <= 0.5) {
            setVol(0.25)
        }
        if (vol <= 0.25) {
            setVol(0)
        }
        if (vol <= 0) {
            setVol(1)
        }
    }

    let speed = (e: any) => {
        let speedVal = e.target.value
        const playa = player.current
        if (player.current !== null) {
            setPBRate(speedVal)
        } else {
            console.log(playa)
        }
        // player.getCurrentTime()
    }
    let begin = (e: any) => {
        const playa = player.current
        if (player.current !== null) {
            playa?.seekTo(5)
        } else {
            console.log(playa)
        }
        // player.getCurrentTime()
    }
    let end = (e: any) => {
        const playa = player.current
        if (player.current !== null) {

            playa?.seekTo(playa?.getDuration() - 5)
        } else {
            console.log(playa)
        }
        // player.getCurrentTime()
    }
    let forSkip = (e: any) => {
        const playa = player.current
        if (player.current !== null) {

            playa?.seekTo(playa?.getCurrentTime() + 30)
            console.log(playa?.getCurrentTime())
            console.log(playa)
        } else {
            console.log(playa)
        }
        // player.getCurrentTime()
    }
    let backSkip = (e: any) => {
        const playa = player.current
        if (player.current !== null) {

            playa?.seekTo(playa?.getCurrentTime() - 30)
            console.log(playa?.getCurrentTime())
            // console.log(playa)
        } else {
            console.log(playa)
        }
        // player.getCurrentTime()
    }
    let onSeekMouseUp = (e: any) => {
        console.log('onSeek', e);
    }


    let setTime = () => {
        const playa = player.current
        if (playa !== null) {
            let ct = playa?.getCurrentTime()
            setCurrentTime(ct)
        }
    }

    let controlsTog = () => {
        if (controls) {

            setControls(false)
        } else {
            setControls(true)
        }
    }

    let playPauseToggle = () => {
        if (playPause) {
            setPlayPause(false)
        } else {
            setPlayPause(true)
        }
    }
    let cb = () => {

    }


    useEffect(() => {
        const playa = player.current
        let okInter = setInterval(setTime, 100);

        thing()
        setPlayPause(true)
    }, []);


    return (
        <Container fluid>
            <Container fluid>
                <Container fluid>

                    <Row className='mainVidTitleRow shad pt-2 mb-4 w-100'>
                        <Col>
                            {mainVidTitle}
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>

                        <Col>
                            <Button color='prim' className='controlButt shad' onClick={controlsTog}>
                                <img className='controlButt shad' height='25px' src={yellowCog} alt="" /></Button>
                        </Col>
                    </Row>
                </Container>
                <Container className='d-flex justify-content-center mt-4 mb-4'>
                    <Row className='resize' style={{ height: '41.5vh' }} >
                        <ReactPlayer
                            url={globURL + 'vids/' + stateFile}
                            playing={playPause}
                            ref={player}
                            forceAudio={true}
                            playbackRate={pBRate}
                            onSeek={onSeekMouseUp}
                            width='100%'
                            height='100%'
                            controls={controls}
                            volume={vol}
                        />
                    </Row>
                </Container>
                <Container >
                    <Row >
                        <Col>
                            {currentTime + ' / ' + player?.current?.getDuration()}
                        </Col>
                    </Row>
                </Container>
                <Row className='pt-3 pb-3'>
                    <Col>
                        <Button className='randoButt shad' color='prim' onClick={volLoop}>
                            <Ico />
                        </Button>
                    </Col>
                    <Col>
                        <Progress animated color="warning" value={currentTime} max={player?.current?.getDuration()} />
                    </Col>
                    <Col>
                        <Col className="p-1">
                            <Button color="prim" className='randoButt shad' onClick={setRando}>{'Rando Vid >|'}</Button>
                        </Col>
                        <Col className="p-1">
                            <Button color="prim" className='randoButt shad' onClick={setNext}>{'DB Next Vid >|'}</Button>
                        </Col>
                    </Col>

                </Row>
            </Container>
            <Container className='pt-3 pb-3'>
                <Row>
                    <Col>
                        <Button color='prim' className='controlButt shad' onClick={begin}>{'|<5'}</Button>
                    </Col>
                    <Col>
                        <Button color='prim' className='controlButt shad' onClick={backSkip}>{'<<30'}</Button>
                    </Col>
                    <Col>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle className='controlButt shad' caret color='prim'>
                                xSpeed
                            </DropdownToggle>
                            <DropdownMenu className='speedDrop'>
                                <DropdownItem className='speedDropHead' header>Speed Control</DropdownItem>
                                <DropdownItem className='speedDrop' onClick={speed} value={.25}>{'x0.25'}</DropdownItem>
                                <DropdownItem className='speedDrop' onClick={speed} value={.5}>{'x0.5'}</DropdownItem>
                                <DropdownItem className='speedDrop' onClick={speed} value={1}>{'x1'}</DropdownItem>
                                <DropdownItem className='speedDrop' onClick={speed} value={1.5}>{'x1.5'}</DropdownItem>
                                <DropdownItem className='speedDrop' onClick={speed} value={2}>{'x2'}</DropdownItem>
                                <DropdownItem className='speedDrop' onClick={speed} value={3}>{'x3'}</DropdownItem>
                                <DropdownItem className='speedDrop' onClick={speed} value={4}>{'x4'}</DropdownItem>
                                <DropdownItem className='speedDrop' onClick={speed} value={5}>{'x5'}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Button color='prim' className='controlButt ppButt shad' onClick={playPauseToggle}>
                            <Playbutt />
                        </Button>
                    </Col>
                    <Col>
                        <Button color='prim' className='controlButt shad' onClick={forSkip}>{'30>>'}</Button>
                    </Col>
                    <Col>
                        <Button color='prim' className='controlButt shad' onClick={end}>{'5>|'}</Button>
                    </Col>
                </Row>
            </Container>

        </Container>
    )
}