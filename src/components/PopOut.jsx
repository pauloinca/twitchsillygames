/* eslint-disable react/prop-types */
import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import style from "./PopOut.module.css";

// import GameChoose from "./GameChoose";

// eslint-disable-next-line react/prop-types
const PopOut = ({ activeState, imgUrl, nome, nextItem }) => (
  <>
    <div className={style.background}>
      <Paper className={style["container-paper"]} elevation={3}>
        <div className={style.container}>
          {/* <div className={style["title-wrapper"]}>
            <h2>A palavra é:</h2>
          </div> */}
          <div className={style["word-wrapper"]}>
            <h1>{nome}</h1>
          </div>
          <div className={style["img-wrapper"]}>
            <img src={imgUrl} alt="Imagem da palavra" />
          </div>
          <div className={style["container-timerbtn"]}>
            <div className={style["timer-wrapper"]}>
              <h1>00:00</h1>
            </div>
            <div className={style["btn-wrapper"]}>
              <Button disabled={activeState} onClick={nextItem} size="large" color="secondary" variant="contained">
                <FontAwesomeIcon icon={faForward} />
              </Button>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  </>
);
export default PopOut;
