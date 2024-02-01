import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Modal } from 'react-native';
import {useState, useEffect} from 'react';

export default function App() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [numOfGuesses, setNumOfGuesses] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const startGame = ()=>{
    setMessage('Guess a number between 1-100');
    setRandomNumber( Math.floor(Math.random() * 100) + 1);
    setNumOfGuesses(0);
    setShowModal(false);
    setGuess('');
  }
    useEffect (()=>{
      startGame();
    },[]);

    const checkGuess = () =>{
      console.log('Checking guess:', guess, 'Random number:', randomNumber);
      if (guess < randomNumber){
        setMessage('your guess ' + guess + ' is too low')
        setNumOfGuesses(numOfGuesses + 1)
      } else if (guess > randomNumber){
        setMessage('Your guess ' + guess + ' is too high')
        setNumOfGuesses(numOfGuesses + 1)
      } else if(guess === randomNumber){
        setNumOfGuesses(numOfGuesses + 1)
        setShowModal(true);


      }
    }
  
  return (
    <View style={styles.container}>
      <View>
      <Text>{message}</Text>
      <TextInput style={styles.input}
      keyboardType='numeric'
      onChangeText={(text) => setGuess(text)}
      />
      </View>
      <View>
        <Button
        title="Guess a number"
        onPress={checkGuess}

        color="lightgreen"
        />
      </View>
      
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{`Congratulations! You guessed ${numOfGuesses} times.`}</Text>
            <Button title="Play Again" onPress={startGame} />
            </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //justifyContent: 'space-around',
  },
  input: {
    borderColor:'black',
    borderWidth: 1,
    padding: 8,
    margin: 10,
    width:100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
    //elevation: 5,
  },
});
