import "reflect-metadata";
import {Animated, Image, Modal, StyleSheet, Text} from 'react-native';
import {container} from "tsyringe";
import {Game} from "../backEnd/Game";
import {Provider, useSelector} from "react-redux";
import {RootState} from "../backEnd/store/Store";
import {MazePointType} from "../backEnd/model/maze/MazePointType";
import View = Animated.View;
import {Dimensions} from "react-native";
import {useState} from "react";

export default function App() {
  const game = container.resolve(Game);

  const [isGameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const timer = setTimeout(() => {
      game.doStep();
      if (game.isDeath()){
        setGameOver(true);
        clearTimeout(timer);
      }
      if (game.isWin()){
          setIsWin(true);
          clearTimeout(timer);
      }
  },34);

  const maze = useSelector((state: RootState) => state.maze);
  const ghosts = useSelector((state: RootState) => state.ghosts);
  const pacman = useSelector((state: RootState) => state.pacman);
  const coins = useSelector((state: RootState) => state.coins);

  return (
      <View style={styles.container}>
          {maze.points.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                  {row.map((cell, cellIndex) => (
                      <View
                          key={cellIndex}
                          style={[
                              styles.cell,
                              cell.type === MazePointType.WALL ? styles.wall : null, // Замість 1 можна використовувати ваші значення
                          ]}
                      />
                  ))}
              </View>
          ))}
          {ghosts.map((ghost, index) => (
              <Image
                  key={index}
                  source={require('../assets/images/ghost-image.png')} // Поставте правильний шлях до зображення привида
                  style={{
                      position: 'absolute',
                      left: 40 * ghost.location.x, // Розмір клітинки в масиві maze
                      top: 40 * ghost.location.y, // Розмір клітинки в масиві maze
                      width: 40,
                      height: 40,
                  }}
              />
          ))}

          {/* Pac-Man */}
          <Image
              source={require('../assets/images/pacman-image.png')} // Поставте правильний шлях до зображення Pac-Man
              style={{
                  position: 'absolute',
                  left: 40 * pacman.location.x, // Розмір клітинки в масиві maze
                  top: 40 * pacman.location.y, // Розмір клітинки в масиві maze
                  width: 40,
                  height: 40,
              }}
          />
          {coins.map((coin, index) => (
              <Image
                  key={index}
                  source={require('../assets/images/coin-image.png')} // Поставте правильний шлях до зображення привида
                  style={{
                      position: 'absolute',
                      left: 40 * coin.location.x, // Розмір клітинки в масиві maze
                      top: 40 * coin.location.y, // Розмір клітинки в масиві maze
                      width: 40,
                      height: 40,
                  }}
              />
          ))}
          <Modal visible={isGameOver}>
              <View style={styles.modalContainer}>
                  <Text style={styles.modalText}>Ви програли</Text>
              </View>
          </Modal>
          <Modal visible={isWin}>
              <View style={styles.modalContainer}>
                  <Text style={styles.modalText}>Ви виграли</Text>
              </View>
          </Modal>
      </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column'
    },
    row: {
      flexDirection: 'row',
    },
    cell: {
      width: 40,
      height: 40,
      borderWidth: 1,
      borderColor: 'black',
    },
    wall: {
      backgroundColor: 'blue', // Колір стіни
    },
      modalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
      },
      modalText: {
          fontSize: 24,
      },
  });
