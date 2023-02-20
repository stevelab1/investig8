import { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchContext } from "../context/SearchContext";

import { Card, Alert, Container } from "react-bootstrap";
import React, { createContext, useContext } from 'react';

// Create a new context
//export const SearchContext = createContext({});


function UrbanAPI() {
    const { searchInput, setSearchInput, setApiStatus } =
        useContext(SearchContext);

    const [urban, setUrban] = useState({
        definition: '',
        example: '',
    })
    useEffect(
        () => {
            const options = {
                method: 'GET',
                url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',

                params: {
                    term: searchInput 
                },
                headers: {
                    'X-RapidAPI-Key': '662923c1d1msh2601dffd22e156dp13e20ejsn70d788d09664',
                    'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com',
                }
            };

            axios.request(options).then(function (response) {
                console.log(response.data.list[0].definition);
                console.log(response.data.list[0].example);
                setUrban({
                    definition: response.data.list[0].definition,
                    example: response.data.list[0].example,
                })

            }).catch(function (error) {
                console.error(error);
            });
        }, [
        searchInput
    ]
    )
    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title>Urban-dictionary definition</Card.Title>

                    <Card.Text>
                        <p>{urban.definition}</p>
                        <br></br>
                        Example: {urban.example}
                    </Card.Text>
                    {/* link not working because of some syntax error, not sure if this link is the one being used on the page*/}
                    <Card.Link href='https://www.urbandictionary.com/define.php?term={searchinput}'>Learn more</Card.Link>

                </Card.Body>
            </Card>
        </div>
    )
    // <div className="urban">
    //     <h2>{urban.definition}</h2>
    //     <h3>{urban.example}</h3>
    // </div>
    //)
};
export default UrbanAPI;

