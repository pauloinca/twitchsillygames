import React, { useState } from 'react';
import './GameChoose.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useParams, Link } from 'react-router-dom';

// import Home from "./Home";

const GameChoose = () => {
  const { canal } = useParams();

  const [jogo, setJogo] = useState();

  const handleJogoChange = (e) => {
    setJogo(e.target.value);
  };

  return (
    <>      
      <div className="gamechoose">
        <Paper className="container-paper" elevation={3}>
          <div className="container">
            <div className="title-wrapper">          
              <h1>{canal}</h1>
            </div>
            <div className="form-wrapper">
              <form className="form-class" noValidate autoComplete="off">
                <TextField onChange={handleJogoChange} id="textfield-nome" label="Nome do canal" variant="outlined" />
              </form>
            </div>
            <div className="button-wrapper">
              <Link to={`/${canal}/${jogo}`}>
                <Button variant="contained" color="primary">
                  Botão
                </Button>
              </Link>
            </div>
          </div>
        </Paper>
      </div>            
    </>
  );
};

export default GameChoose;
