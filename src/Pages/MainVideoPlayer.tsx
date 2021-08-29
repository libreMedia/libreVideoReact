import React, { useState, useEffect, Suspense, useRef } from "react";
import ReactPlayer from 'react-player/lazy'
import { Button, Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import globURL from "../Utils/urlSwitcher";
import Ico from "../Utils/Ico";



export default function MainVid() {
    const [stateFile, setChosenFile] = useState<string>();
    const [pBRate, setPBRate] = useState<number>(1);
    const [vol, setVol] = useState<number>(1);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const player = useRef<ReactPlayer>(null)

    const thing = () => {
        const chosenFile = localStorage.getItem('fileChosen');
        console.log(chosenFile)
        setChosenFile(chosenFile as string)
        return chosenFile
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
            console.log(playa)
        } else {
            console.log(playa)
        }
        // player.getCurrentTime()
    }
    let onSeekMouseUp = (e: any) => {
        console.log('onSeek', e);
    }


    useEffect(() => {
        thing()
    }, []);


    return (
        <Container >
            <Container className='d-flex justify-content-center pt-5'>
                <Row>

                    <ReactPlayer
                        url={globURL + 'vids/' + stateFile}
                        
                        playing={true}
                        ref={player}
                        forceAudio={true}
                        playbackRate={pBRate}
                        onSeek={onSeekMouseUp}
                        width='900px'
                        height='500px'
                        loop={true}
                        controls={true}
                        volume={vol}
                    />
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <Button color='prim' className='controlButt' onClick={begin}>{'|<5'}</Button>
                    </Col>
                    <Col>
                        <Button color='prim' className='controlButt' onClick={backSkip}>{'<<30'}</Button>
                    </Col>
                    <Col>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle className='controlButt' caret color='prim'>
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
                        <Button color='prim' className='controlButt' onClick={forSkip}>{'30>>'}</Button>
                    </Col>
                    <Col>
                        <Button color='prim' className='controlButt' onClick={end}>{'5>|'}</Button>
                    </Col>
                    <Col>
                        <Button className='controlButt' color='prim' onClick={volLoop}>
                            <Ico />
                        </Button>
                    </Col>
                </Row>
            </Container>

        </Container>
    )
}