import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function DisplayUserData({ vezeteknev, keresztnev, szuletesiDatum, email, jelszo }) {
  return (
    <div>
      <h2>Your data:</h2>
      <p>{vezeteknev}</p>
      <p>{keresztnev}</p>
      <p>{szuletesiDatum}</p>
      <p>{email}</p>
      <p>{jelszo}</p>
    </div>
  );
}

function CreateInput({ labelValue, typeValue, nameValue, onChangeCallback }) {
  return (
    <>
      <label>{labelValue}</label>
      <br />
      <input type={typeValue} name={nameValue} onChange={onChangeCallback} />
      <br />
    </>
  );
}

function Form() {

  const [inputs, setInputs] = useState({ vezeteknev: "", keresztnev: "", szuletesi_datum: "", email: "", jelszo: "" });
  const [submitted, setSubmitted] = useState(false);
  const [arrayInputs, setArrayInputs] = useState([]);
  const labelValues = ["Vezetéknév", "Keresztnév", "Születési dátum", "Email", "Jelszó"];
  const typeValues = ["text", "text", "date", "email", "password"];
  const nameValues = ["vezeteknev", "keresztnev", "szuletesi_datum", "email", "jelszo"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setArrayInputs(prevArray => [...prevArray, inputs]);
    const mappableArrayInputs = [...arrayInputs, inputs];
    mappableArrayInputs.map(arr => {
      Object.keys(arr).forEach((key, index) => {
        if (arr[key] === "") {
          console.log(`Hibás ${labelValues[index]}!`);
        }
        else {
          setSubmitted(true);
        }
      });
    });
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(prevValues => ({ ...prevValues, [name]: value }));
  }

  return (
    <div>
      {!submitted && (
        <form onSubmit={handleSubmit}>
          {nameValues.map((name, index) => (<CreateInput key={index} labelValue={labelValues[index]} typeValue={typeValues[index]} nameValue={name} onChangeCallback={handleChange} />))}
          <input type="submit" value="Regisztráció" />
        </form>
      )}
      {submitted && <DisplayUserData vezeteknev={inputs.vezeteknev} keresztnev={inputs.keresztnev} szuletesiDatum={inputs.szuletesi_datum} email={inputs.email} jelszo={inputs.jelszo} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Form />);