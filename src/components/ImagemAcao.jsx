import { ChatClient } from "twitch-chat-client";
import React, { useState, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import { useParams } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import levenshtein from "js-levenshtein";
import shortid from "shortid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward, faExternalLinkAlt, faInfo } from "@fortawesome/free-solid-svg-icons";

import PopOutWindow from "./PopOutWindow";
import PopOut from "./PopOut";
import style from "./ImagemAcao.module.css";
import Filmes from "../data/categorias/filmes.json";
import Jogos from "../data/categorias/jogos.json";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const initial = [
  {
    posicao: 1,
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    posicao: 2,
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    posicao: 3,
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    posicao: 4,
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    posicao: 5,
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    posicao: 6,
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    posicao: 7,
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    posicao: 8,
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    posicao: 9,
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    posicao: 10,
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
];

const initialAll = [
  {
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
  {
    nome: "",
    acertos: 0,
    quase: 0,
    pontos: 0,
  },
];

const initialQuase = [
  {
    id: shortid.generate(),
    nome: "-",
  },
  {
    id: shortid.generate(),
    nome: "-",
  },
  {
    id: shortid.generate(),
    nome: "-",
  },
  {
    id: shortid.generate(),
    nome: "-",
  },
  {
    id: shortid.generate(),
    nome: "-",
  },
  {
    id: shortid.generate(),
    nome: "-",
  },
  {
    id: shortid.generate(),
    nome: "-",
  },
  {
    id: shortid.generate(),
    nome: "-",
  },
  {
    id: shortid.generate(),
    nome: "-",
  },
  {
    id: shortid.generate(),
    nome: "-",
  },
];

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const ImagemAcao = () => {
  const firstUpdate = useRef(true);
  const { canal } = useParams();
  const [array, setArray] = useState(initial);
  const [arrayQuase, setArrayQuase] = useState(initialQuase);
  const [arrayAll, setArrayAll] = useState(initialAll);

  const [palavra, setPalavra] = useState({
    nomePT: "",
    nomeEN: "",
    img_url: "",
  });
  const [arrayPalavras, setArrayPalavras] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [categorias, setCategorias] = useState([
    {
      nome: "filmes",
      selected: true,
      array: Filmes,
    },
    {
      nome: "jogos",
      selected: true,
      array: Jogos,
    },
  ]);

  const [time, setTime] = useState({
    second: "00",
    minute: "01",
    counter: 60,
  });

  const [isActive, setIsActive] = useState(false);

  const chatClient = ChatClient.anonymous({ channels: [`${canal}`] });

  const [isPopupWindowWithHooksOpen, setIsPopupWindowWithHooksOpen] = useState(false);

  const togglePopupWindowWithHooks = () => setIsPopupWindowWithHooksOpen(!isPopupWindowWithHooksOpen);

  const closePopupWindowWithHooks = () => setIsPopupWindowWithHooksOpen(false);

  const stopTimer = () => {
    // console.log(isActive);
    setIsActive(false);
    setTime(() => ({
      second: "00",
      minute: "00",
      counter: 0,
    }));
  };

  const nextItem = () => {
    if (isActive) {
      categorias.forEach((item) => {
        if (item.selected === true) {
          item.array.forEach((item2) => {
            const aux = arrayPalavras;
            aux.push(item2);
            setArrayPalavras(aux);
          });
        }
      });
      const aux2 = randomItem(arrayPalavras);
      // console.log(aux2);
      setPalavra(aux2);
      // console.log(`nextItem - ${palavra.nomePT}`);
    }
  };
  // useEffect do Timer
  React.useEffect(() => {
    let intervalId;
    if (time.counter === 0) {
      setIsActive(false);
      setTime({ minute: "01", second: "00", counter: 60 });
    }

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = time.counter % 60;
        const minuteCounter = Math.floor(time.counter / 60);

        const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
        const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

        setTime((prevState) => ({
          second: computedSecond,
          minute: computedMinute,
          counter: prevState.counter - 1,
        }));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, time.counter]);

  // useEffect das Mensagens do chat da Twitch
  React.useEffect(() => {
    let cont = null;
    if (isActive) {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        nextItem();
      }

      chatClient.connect();

      cont = chatClient.onMessage(async (channel, user, message) => {
        const acertoPT = levenshtein(message, palavra.nomePT);
        const acertoEN = levenshtein(message, palavra.nomeEN);

        if (acertoPT === 0 || acertoEN === 0) {
          // 0 = acertou
          if (arrayAll.find((item) => item.nome === user)) {
            // Se o usuario existir
            const elementsIndex = arrayAll.findIndex((element) => element.nome === user);
            const newArray = arrayAll;
            newArray[elementsIndex] = {
              ...newArray[elementsIndex],
              acertos: newArray[elementsIndex].acertos + 1,
              pontos: newArray[elementsIndex].pontos + 100,
            };
            setArrayAll(newArray);
          } else {
            // Se o usuario nao existir
            arrayAll.push({
              nome: user,
              acertos: 1,
              quase: 0,
              pontos: 100,
            });
            setArrayAll(arrayAll);
          }

          arrayAll.sort((a, b) => parseFloat(b.pontos) - parseFloat(a.pontos));
          const array2 = array.map((obj) => ({ ...obj }));

          for (let i = 0; i < array2.length; i += 1) {
            array2[i].nome = arrayAll[i].nome;
            array2[i].acertos = arrayAll[i].acertos;
            array2[i].quase = arrayAll[i].quase;
            array2[i].pontos = arrayAll[i].pontos;
          }

          setArray(array2);
        } else if (acertoPT === 1 || acertoPT === 2 || acertoEN === 1 || acertoEN === 2) {
          // 1 ou 2 = Quase acertou
          if (arrayAll.find((item) => item.nome === user)) {
            // Se o usuario existir
            const elementsIndex = arrayAll.findIndex((element) => element.nome === user);
            const newArray = arrayAll;
            newArray[elementsIndex] = {
              ...newArray[elementsIndex],
              quase: newArray[elementsIndex].quase + 1,
              pontos: newArray[elementsIndex].pontos + 50,
            };
            setArrayAll(newArray);
          } else {
            // Se o usuario nao existir
            arrayAll.push({
              nome: user,
              acertos: 0,
              quase: 1,
              pontos: 50,
            });
            setArrayAll(arrayAll);
          }

          const elementsIndex = arrayAll.findIndex((element) => element.nome === user);
          arrayQuase.unshift({
            id: shortid.generate(),
            nome: arrayAll[elementsIndex].nome,
          });
          arrayQuase.pop();

          setArrayQuase(arrayQuase);

          arrayAll.sort((a, b) => parseFloat(b.pontos) - parseFloat(a.pontos));
          const array2 = array.map((obj) => ({ ...obj }));

          for (let i = 0; i < array2.length; i += 1) {
            array2[i].nome = arrayAll[i].nome;
            array2[i].acertos = arrayAll[i].acertos;
            array2[i].quase = arrayAll[i].quase;
            array2[i].pontos = arrayAll[i].pontos;
          }
          setArray(array2);
        }
      });
    }
    return () => chatClient.removeListener(cont);
  }, [isActive, palavra]);

  // Side Effect
  React.useEffect(() =>
    window.addEventListener("beforeunload", () => {
      closePopupWindowWithHooks();
    })
  );

  return (
    <>
      <Paper className={style["container-paper"]} elevation={4}>
        <div className={style.container}>
          <div className={style.box1}>
            <div className={style["title-wrapper"]}>
              <h1>Imagem e ação</h1>
              <h2>v 1.0.0</h2>
            </div>
            <div className={style["btn-box1-wrapper"]}>
              <div className={style["btn-info-wrapper"]}>
                <IconButton>
                  <FontAwesomeIcon className={style["info-icon"]} icon={faInfo} />
                </IconButton>
              </div>
              <div className="btn-config-wrapper">
                <Button color="primary" variant="outlined">
                  Configs
                </Button>
              </div>
            </div>
          </div>
          <div className={style.box2}>
            <div className={style["datagrid1-title-wrapper"]}>
              <h2>CLASSIFICAÇÃO</h2>
            </div>
            <div className={style["datagrid2-title-wrapper"]}>
              <h2>Quase</h2>
            </div>
          </div>
          <div className={style.box3}>
            <div className={style["datagrid1-wrapper"]}>
              <TableContainer component={Paper}>
                <Table className={style.table} size="small" aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={style.customColumnPosicao} align="center">
                        Posição
                      </StyledTableCell>
                      <StyledTableCell className={style.customColumnNome} align="left">
                        Nome
                      </StyledTableCell>
                      <StyledTableCell className={style.customColumnAcertos} align="left">
                        Acertos
                      </StyledTableCell>
                      <StyledTableCell className={style.customColumnAcertos} align="left">
                        Quase
                      </StyledTableCell>
                      <StyledTableCell className={style.customColumnAcertos} align="left">
                        Pontos
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {array.map((row) => (
                      <StyledTableRow key={row.posicao}>
                        <StyledTableCell className={style.customColumnPosicao} align="center" component="th" scope="row">
                          {row.posicao}
                        </StyledTableCell>
                        <StyledTableCell className={style.customColumnNome} align="left">
                          {row.nome}
                        </StyledTableCell>
                        <StyledTableCell className={style.customColumnAcertos} align="center">
                          {row.acertos}
                        </StyledTableCell>
                        <StyledTableCell className={style.customColumnAcertos} align="center">
                          {row.quase}
                        </StyledTableCell>
                        <StyledTableCell className={style.customColumnAcertos} align="center">
                          {row.pontos}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={style["datagrid2-wrapper"]}>
              <TableContainer component={Paper}>
                <Table className={style.table} size="small" aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={style.customColumnPosicao} align="center">
                        Nome
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {arrayQuase.map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell className={style.customColumnPosicao} align="center" component="th" scope="row">
                          {row.nome}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className={style.box4}>
            <div className="btn-reset-wrapper">
              <Button onClick={stopTimer}>Reset</Button>
            </div>
            <div className="btn-start-wrapper">
              <Button onClick={() => setIsActive(!isActive)} size="large" color="secondary" variant="contained">
                {isActive ? `${time.minute}:${time.second}` : "Iniciar"}
              </Button>
            </div>
            <div className="btn-next-wrapper">
              <Button disabled={!isActive} onClick={nextItem} size="large" color="secondary" variant="contained">
                <FontAwesomeIcon icon={faForward} />
              </Button>
            </div>
            <div className="btn-popout-wrapper">
              <Button color="secondary" disabled={!isActive} onClick={togglePopupWindowWithHooks}>
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </Button>
              {isPopupWindowWithHooksOpen && (
                <PopOutWindow closePopupWindowWithHooks={closePopupWindowWithHooks}>
                  <PopOut nome={palavra.nomePT} imgUrl={palavra.img_url} nextItem={nextItem} activeState={!isActive} />
                </PopOutWindow>
              )}
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default ImagemAcao;
