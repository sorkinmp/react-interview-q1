import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './newForm.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//get the api functions
import { isNameValid, getLocations } from './mock-api/apis';

//create the form component
//need to validate name (isNameValid) and get locations (getLocations)
const NewForm = () => {
    //set up attributes of form and of corresponding table
    const [name, setName] = useState(''); //name field
    const [location, setLocation] = useState(''); //location field
    const [locations, setLocations] = useState([]); //locations
    const [isNameTaken, setIsNameTaken] = useState(false); //name taken
    const [entries, setEntries] = useState([]); //table entries

    //now use api to retrieve locations list
    useEffect(() => {
        getLocations().then(setLocations);
    }, []);

    //create ability to check input name against isNameValid
    const checkValidName = async (name) => {
        const nameIsValid = await isNameValid(name);
        setIsNameTaken(!nameIsValid);
    };

    const handleNameChange = (event) => {
        //retrieve name
        const newName = event.target.value;
        setName(newName);
        //check name against API
        if (newName) {
            checkValidName(newName);
        } else {
            //after field cleared, need to restart validation
            setIsNameTaken(false);
        }
    };
    
    


} //end NewForm