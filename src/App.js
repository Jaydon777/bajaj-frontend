import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";


const options = [
  { value: "Alphabets", label: "Alphabets" },
  { value: "Numbers", label: "Numbers" },
  { value: "Highest lowercase alphabet", label: "Highest lowercase alphabet" },
];

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [isValidJson, setIsValidJson] = useState(true);
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState({});

  // Handle form submission and validate JSON input
  const handleSubmit = async () => {
    try {
      console.log("Submitting JSON input:", jsonInput); // Debugging
      const parsedJson = JSON.parse(jsonInput); // Parse input JSON
      setIsValidJson(true);

      // Call API with parsed JSON
      const res = await axios.post("https://bajaj-backend-hx87.onrender.com/bfhl", parsedJson);
      console.log("API Response:", res.data); // Debugging
      setResponse(res.data); // Set the API response
    } catch (error) {
      console.error("Error in JSON submission or API call:", error); // Debugging
      setIsValidJson(false); // Set validation error
    }
  };

  // Handle dropdown change and filter response
  const handleDropdownChange = (selected) => {
    setSelectedOptions(selected);
    const selectedValues = selected.map((option) => option.value);
    console.log("Selected dropdown options:", selectedValues); // Debugging

    if (response) {
      let filtered = {};

      // Filtering logic based on selected options
      if (selectedValues.includes("Alphabets")) {
        filtered.alphabets = response.alphabets || [];
      }
      if (selectedValues.includes("Numbers")) {
        filtered.numbers = response.numbers || [];
      }
      if (selectedValues.includes("Highest lowercase alphabet")) {
        filtered.highest_lowercase_alphabet =
          response.highest_lowercase_alphabet || "";
      }
      console.log(filtered.highest_lowercase_alphabet);
      console.log("Filtered Response:", filtered); // Debugging
      setFilteredResponse(filtered);
    }
  };

  return (
    
    <div className="App">
      <div className="Box">

   
      <h1>Bajaj Technical Challenge</h1>

      {/* JSON Input Field */}
      <div>
        <label>API Input</label>
        <input
          type="text"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter JSON input"
        />
        <button onClick={handleSubmit}>Submit</button>
        {!isValidJson && <p className="invalid">Invalid JSON format!</p>}
      </div>

      {/* Display Dropdown only after valid JSON submission */}
      {response && (
        <>
          <div className="Filter">
            <label>Multi Filter</label>
            <Select
              isMulti
              value={selectedOptions}
              onChange={handleDropdownChange}
              options={options}
              className="multi-select"
              classNamePrefix="select"
            />
          </div>

          {/* Display Filtered Response */}
          <h3>Filtered Response</h3>
          {filteredResponse.numbers && (
            <p><strong>Numbers:</strong> {filteredResponse.numbers.join(",")}</p>
          )}
          {filteredResponse.alphabets && (
            <p><strong>Alphabets: </strong>{filteredResponse.alphabets.join(",")}</p>
          )}
          {filteredResponse.highest_lowercase_alphabet && (
            <p><strong>Highest lowercase alphabet: </strong>{filteredResponse.highest_lowercase_alphabet.join(",")}</p>
          )}
        </>
      )}
      </div>
      <div>
        <h4>Developed by <a href="https://portfolio-jaddu.firebaseapp.com/">J Haniel Jaydon</a></h4>
      </div>
    </div>
    
  );
}

export default App;
