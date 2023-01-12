import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Result = ({ result, totalTimeTaken }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        textAlign: "center",
        background: "white",
        padding: "50px",
        color: "black",
        width: "fit-content",
        margin: "auto",
        marginTop: "100px",
        borderRadius:"10px",
        boxShadow:"1px 3px 5px 3px #8185EA",
      }}
    >
      <h2>FINDING FALCONE!</h2>
      {result.status === "success" ? (
        <div>
          <h3>Success! Congratulations on Finding Falcone.</h3>
          <h3>{`Time Taken : ${totalTimeTaken}`}</h3>
          <h3>{`Planet Found : ${result.planet_name}`}</h3>
        </div>
      ) : (
        <h3>Failure! Falcone not found. </h3>
      )}
      <Button variant="contained" onClick={() => navigate("/")}>
        START AGAIN
      </Button>
    </div>
  );
};

export default Result;
