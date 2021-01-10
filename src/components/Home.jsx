import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import style from './Home.module.css';
// import GameChoose from "./GameChoose";

const Home = () => {
  const [canal, setCanal] = useState();

  const handleCanalChange = (e) => {
    setCanal(e.target.value);
  };

  return (
    <>     
      <Paper className={style['container-paper']} elevation={3}>
        <div className={style.container}>
          <div className={style['title-wrapper']}>          
            <h1>Twitch Silly Games</h1>
          </div>
          <div className="form-wrapper">
            <form className="form-class" noValidate autoComplete="off">
              <TextField onChange={handleCanalChange} id="textfield-nome" label="Nome do canal" variant="outlined" />
            </form>
          </div>
          <div className="button-wrapper">
            <Link to={`/${canal}`}>
              <Button variant="contained" color="primary">
                Botão
              </Button>
            </Link>
          </div>
        </div>
      </Paper>      
    </>
  );
};

export default Home;
