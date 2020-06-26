import React, { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import { LEVELS } from "./levels";
function App() {
  const [currentField, setCurrentField] = useState(LEVELS.FIRST);
  const currentPosition = useRef();
  const [winFields, setWinFields] = useState();
  const [winMap, setWinMap] = useState(false);
  const [gameCounter, setGameCounter] = useState(2);

  const findPosition = useCallback(() => {
    let fields = [];
    for (let i = 0, l1 = currentField.length; i < l1; i++) {
      for (let j = 0, l2 = currentField[i].length; j < l2; j++) {
        if (currentField[i][j] === "G") {
          currentPosition.current = [i, j];
        }
        if (currentField[i][j] === "P") {
          fields.push([i, j]);
        }
      }
    }
    setWinFields(fields);
  });

  const drawMove = (action) => {
    console.log(currentPosition.current);
    if (currentPosition.current === undefined) {
      return;
    }
    switch (action) {
      case "up":
        let upStep = currentField;
        if (
          currentField[currentPosition.current[0]][
            currentPosition.current[1]
          ] === "I" &&
          (currentField[currentPosition.current[0] - 1][
            currentPosition.current[1]
          ] === "O" ||
            currentField[currentPosition.current[0] - 1][
              currentPosition.current[1]
            ] === "P")
        ) {
          upStep[currentPosition.current[0] - 1][currentPosition.current[1]] =
            "I";
        }
        upStep[currentPosition.current[0] + 1][currentPosition.current[1]] =
          "O";
        console.log(currentField);
        setCurrentField(upStep);
        break;
      case "down":
        let downStep = currentField;
        if (
          currentField[currentPosition.current[0]][
            currentPosition.current[1]
          ] === "I" &&
          (currentField[currentPosition.current[0] + 1][
            currentPosition.current[1]
          ] === "O" ||
            currentField[currentPosition.current[0] + 1][
              currentPosition.current[1]
            ] === "P")
        ) {
          downStep[currentPosition.current[0] + 1][currentPosition.current[1]] =
            "I";
        }
        downStep[currentPosition.current[0] - 1][currentPosition.current[1]] =
          "O";
        setCurrentField(downStep);
        break;

      case "left":
        let leftStep = currentField;
        if (
          currentField[currentPosition.current[0]][
            currentPosition.current[1]
          ] === "I" &&
          (currentField[currentPosition.current[0]][
            currentPosition.current[1] - 1
          ] === "O" ||
            currentField[currentPosition.current[0]][
              currentPosition.current[1] - 1
            ] === "P")
        ) {
          leftStep[currentPosition.current[0]][currentPosition.current[1] - 1] =
            "I";
        }
        leftStep[currentPosition.current[0]][currentPosition.current[1] + 1] =
          "O";
        setCurrentField(leftStep);
        break;

      case "right":
        let rightStep = currentField;
        if (
          currentField[currentPosition.current[0]][
            currentPosition.current[1]
          ] === "I" &&
          (currentField[currentPosition.current[0]][
            currentPosition.current[1] + 1
          ] === "O" ||
            currentField[currentPosition.current[0]][
              currentPosition.current[1] + 1
            ] === "P")
        ) {
          rightStep[currentPosition.current[0]][
            currentPosition.current[1] + 1
          ] = "I";
        }
        rightStep[currentPosition.current[0]][currentPosition.current[1] - 1] =
          "O";
        setCurrentField(rightStep);
        break;

      default:
        break;
    }
    let newfield = currentField;
    winFields.map((winCoordinates) => {
      let checkWinFields = currentField;
      if (
        currentField[winCoordinates[0]][winCoordinates[1]] !== "G" &&
        currentField[winCoordinates[0]][winCoordinates[1]] !== "I"
      ) {
        checkWinFields[winCoordinates[0]][winCoordinates[1]] = "P";
      }
      setCurrentField(checkWinFields);
    });
    let winCheck = winFields.every(
      (pCoordinates) => currentField[pCoordinates[0]][pCoordinates[1]] === "I"
    );
    setWinMap(winCheck);
    newfield[currentPosition.current[0]][currentPosition.current[1]] = "G";
    setCurrentField(newfield);
  };

  const moveUp = () => {
    console.log(currentPosition.current[0] - 1);

    let up = "up";
    if (
      0 === currentPosition.current[0] ||
      currentField[currentPosition.current[0] - 1][
        currentPosition.current[1]
      ] === "X" ||
      (currentField[currentPosition.current[0] - 1][
        currentPosition.current[1]
      ] === "I" &&
        (currentField[currentPosition.current[0] - 2][
          currentPosition.current[1]
        ] === "I" ||
          currentField[currentPosition.current[0] - 2][
            currentPosition.current[1]
          ] === "X"))
    ) {
      return;
    }
    currentPosition.current = [
      currentPosition.current[0] - 1,
      currentPosition.current[1],
    ];
    drawMove(up);
  };

  const moveDown = () => {
    const down = "down";
    if (
      currentField[currentPosition.current[0] + 1][
        currentPosition.current[1]
      ] === "X" ||
      (currentField[currentPosition.current[0] + 1][
        currentPosition.current[1]
      ] === "I" &&
        (currentField[currentPosition.current[0] + 2][
          currentPosition.current[1]
        ] === "I" ||
          currentField[currentPosition.current[0] + 2][
            currentPosition.current[1]
          ] === "X"))
    ) {
      return;
    }
    currentPosition.current = [
      currentPosition.current[0] + 1,
      currentPosition.current[1],
    ];
    drawMove(down);
  };

  const moveLeft = () => {
    const left = "left";
    if (
      0 === currentPosition.current[1] ||
      currentField[currentPosition.current[0]][
        currentPosition.current[1] - 1
      ] === "X" ||
      (currentField[currentPosition.current[0]][
        currentPosition.current[1] - 1
      ] === "I" &&
        (currentField[currentPosition.current[0]][
          currentPosition.current[1] - 2
        ] === "I" ||
          currentField[currentPosition.current[0]][
            currentPosition.current[1] - 2
          ] === "X"))
    ) {
      return;
    }
    currentPosition.current = [
      currentPosition.current[0],
      currentPosition.current[1] - 1,
    ];
    drawMove(left);
  };

  const moveRight = () => {
    let right = "right";

    if (
      currentField[1].length - 1 === currentPosition.current[1] ||
      currentField[currentPosition.current[0]][
        currentPosition.current[1] + 1
      ] === "X" ||
      (currentField[currentPosition.current[0]][
        currentPosition.current[1] + 1
      ] === "I" &&
        (currentField[currentPosition.current[0]][
          currentPosition.current[1] + 2
        ] === "I" ||
          currentField[currentPosition.current[0]][
            currentPosition.current[1] + 2
          ] === "X"))
    ) {
      return;
    }
    currentPosition.current = [
      currentPosition.current[0],
      currentPosition.current[1] + 1,
    ];
    drawMove(right);
  };

  const changeMap = () => {
    switch (gameCounter) {
      case 2:
        setCurrentField(LEVELS.SECOND);
        break;
      case 3:
        setCurrentField(LEVELS.THIRD);
        break;
      case 4:
        setCurrentField(LEVELS.FOURTH);
        break;
      case 5:
        setCurrentField(LEVELS.FIFTH);
        break;
      default:
        break;
    }
    setGameCounter(gameCounter + 1);
    setWinMap(false);
  };

  const keyHandler = useCallback(
    (event) => {
      const keyValue = event.key;
      switch (keyValue) {
        case "ArrowUp":
          moveUp();
          break;
        case "ArrowDown":
          moveDown();
          break;
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowRight":
          moveRight();
          break;
        default:
          break;
      }
    },
    [currentPosition.current]
  );

  useEffect(() => {
    document.addEventListener("keyup", keyHandler);
    return () => {
      document.removeEventListener("keyup", keyHandler);
    };
  }, [keyHandler]);

  useEffect(() => {
    findPosition();
  }, []);

  return (
    <>
      <div className="fieldContainer">
        {currentField.map((elements) => {
          return (
            <div className="fieldLine" height="200px">
              {elements.map((fieldElement) => {
                return (
                  <div width="10px" className={fieldElement + "-element"}></div>
                );
              })}
            </div>
          );
        })}
        {winMap && <button onClick={changeMap}>next map</button>}
      </div>
    </>
  );
}

export default App;
