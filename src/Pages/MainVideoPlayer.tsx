import React, { useState, useEffect, Suspense } from "react";
import ReactPlayer from 'react-player/lazy'
import { Jumbotron, Button, Container } from 'reactstrap';
import globURL from "../Utils/urlSwitcher";



export default function MainVid() {
    
    const [stateFile, setChosenFile] = useState<string>();
    const thing = () => {
        const chosenFile = localStorage.getItem('fileChosen');
        console.log(chosenFile)
        setChosenFile(chosenFile as string)
        return chosenFile
    }


    useEffect(() => {
        thing()
    }, []);


    return (
        <Container>
            <div>

                <ReactPlayer url={globURL + 'vids/' + stateFile} loop={true} controls={true} />
            </div>
        </Container>
    )
}