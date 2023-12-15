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
    //set up attributes/states of form and of corresponding table
    const [name, setName] = useState(''); //name field
    const [location, setLocation] = useState(''); //location field
    const [locations, setLocations] = useState([]); //locations from api.js
    const [isNameTaken, setIsNameTaken] = useState(false); //checks if name is taken
    const [entries, setEntries] = useState([]); //table entries

    //now use api to retrieve locations list via effect hook
    useEffect(() => {
        getLocations().then(setLocations);
    }, []);

    //create ability to check input name against isNameValid
    const checkValidName = async (name) => {
        const nameIsValid = await isNameValid(name);
        setIsNameTaken(!nameIsValid);
    }; //end checkValidName

    //event handler for form for name input
    const handleNameInput = (event) => {
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
    }; //end handleNameInput

    //event handler for locations in dropdown
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    //function to clear form
    const handleFormClear = () => {
        setName('');
        setLocation('');
        setIsNameTaken(false);
    }; //end handleFormClear

    //function for form submission
    const handleFormAdd = (event) => {
        event.preventDefault();
        //perform checks for valid name and selected location
        if (name && !isNameTaken && location) {
            //add new entry to entries and clear form
            setEntries([...entries, { name, location }]);
            handleFormClear();
        }
    }; //end handleFormAdd


    //finally, return
    return (
        <div className="form-component">
            <form onSubmit={handleFormAdd}>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        value={name}
                        onChange={handleNameInput}
                        className={isNameTaken ? 'input-error' : ''}
                    />
                    {/* Erorr message for taken name */}
                    {isNameTaken && <div className="error">this name has already been taken</div>}
                </div>
                <div className="input-group">
                    <label htmlFor="location">Location</label>
                    {/* Location dropdown */}
                    <select id="location" value={location} onChange={handleLocationChange}>
                        {locations.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>
                <div className="buttons">
                    {/* Buttons for clearing form and adding new entry */}
                    <button type="button" onClick={handleFormClear}>Clear</button>
                    <button type="submit" disabled={isNameTaken}>Add</button>
                </div>
            </form>
            {/* Display area for entries */}
            <div className="entries-display">
                {entries.map((entry, index) => (
                    <div key={index} className="entry">
                        <span>{entry.name}</span>
                        <span>{entry.location}</span>
                    </div>
                ))}
            </div>
        </div>
    );


} //end NewForm

//export
export default NewForm;