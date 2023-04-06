import React, {useState} from 'react';
import {TextInput} from 'react-native';

const KeyBoardHandler = () => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = e => {
    const {
      nativeEvent: {key},
    } = e;
    let keyId;

    switch (key) {
      case ' ':
        keyId = 'SPACE';
        break;
      case 'ArrowLeft':
        keyId = 'LEFT_ARROW';
        break;
      case 'ArrowRight':
        keyId = 'RIGHT_ARROW';
        break;
      // add more cases as needed for other keys that don't provide an ID
      default:
        keyId = key;
        break;
    }

    console.log(`Key pressed: ${keyId}`);
  };

  return (
    <TextInput
      value={inputValue}
      onChangeText={setInputValue}
      onKeyPress={handleKeyPress}
      style={{borderWidth: 1, marginBottom: 15}}
      placeholder="Enter something"
    />
  );
};

export default KeyBoardHandler;
