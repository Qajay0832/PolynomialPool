// frontend/src/pages/CreatePoll.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {API} from "../../services/axios";
import "./createPoll.css"; // Assuming you have a CSS file for styles
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validOptions = options.filter((opt) => opt.trim() !== "");
    if (question.trim() && validOptions.length >= 2) {
      try {
        await API.post("/polls", { question, options: validOptions });
        navigate("/");
      } catch (err) {
        console.error("Poll creation failed", err);
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="createPollContainer">
      <h2 className="titles">Create New Poll</h2>
      <form className="createPollForm">
        <Input
          type="text"
          placeholder="Poll question"
          className="pollInputs"
          state={question}
          setState={setQuestion}
          required
        />
        {options.map((opt, idx) => (
          <div className="input-wrapper">
            <input
              key={idx}
              className="pollInputs custom-input"
              type="text"
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
            />
          </div>
        ))}
        <div className="createPollbuttonsContainer">
          <Button type="button" onClick={addOption} text={"+ Add Option"} />
          <Button type="submit" text={"Create Poll"} onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default CreatePoll;
