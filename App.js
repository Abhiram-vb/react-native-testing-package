import React, {useEffect, useRef, useState} from 'react';
import KeyBoardHandler from './src/screens/KeyBordHandler';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  PanResponder,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import HelloWorld from 'testing_react_native_abhiram';
// import ErrorScreen from './src/screens/ErrorScreen';
import AnrHandler from './src/screens/AnrHandler';
import {
  setNativeExceptionHandler,
  setJSExceptionHandler,
} from 'react-native-exception-handler';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [textString, setTextString] = useState('');
  const [name, setname] = useState('collection');
  const getCollectionss = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8085/api/collection', {
        method: 'GET',
        headers: new Headers({
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaXZhamkiLCJvcmdJZCI6IjY0MDA0ZjcxODVkN2RlN2JjYmFmMWIyZiIsInJvbGVzIjpbInNkZTEiLCJvcmdhZG1pbiJdLCJ1c2VyX2lkIjoiNjQwYjBkZDc4ZjllODhiMjE5Y2M2Zjk0IiwiaWF0IjoxNjgwNjc2NjAxLCJleHAiOjE2ODA3NjMwMDEsImlzcyI6InZiIn0.dh50CF3F1fL3AMz9jZUA-fkUSkB6w8m9I12jt_6q63M',
          'Content-Type': 'application/json',
        }),
      });
      const {
        data: {results},
      } = await response.json();
      setData(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getAggregations = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8085/pi/aggregation', {
        method: 'GET',
        headers: new Headers({
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaXZhamkiLCJvcmdJZCI6IjY0MDA0ZjcxODVkN2RlN2JjYmFmMWIyZiIsInJvbGVzIjpbInNkZTEiLCJvcmdhZG1pbiJdLCJ1c2VyX2lkIjoiNjQwYjBkZDc4ZjllODhiMjE5Y2M2Zjk0IiwiaWF0IjoxNjgwNjc2NjAxLCJleHAiOjE2ODA3NjMwMDEsImlzcyI6InZiIn0.dh50CF3F1fL3AMz9jZUA-fkUSkB6w8m9I12jt_6q63M',
          'Content-Type': 'application/json',
        }),
      });
      const {
        data: {results},
      } = await response.json();
      setname('aggregation');
      setData(results);
    } catch (error) {
      console.error(JSON.stringify(error), '3939393939');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCollectionss();
  }, []);

  const [touch, setTouch] = useState({x: 0, y: 0});
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        setTouch({x: gestureState.moveX, y: gestureState.moveY});
      },
    }),
  ).current;
  // const errorHandler = (error, isFatal) => {
  //   console.log(error); // log the error for debugging purposes

  //   if (isFatal) {
  //     Alert.alert('An error occurred', 'The app will now exit', [
  //       {text: 'OK', onPress: () => BackHandler.exitApp()},
  //     ]);
  //   } else {
  //     console.log(error); // log the error for debugging purposes
  //   }
  // };

  // // register the global exception handler
  // ErrorUtils.setGlobalHandler(errorHandler);
  const exceptionHandler = async (error, isFatal) => {
    console.log('hello abhiram', JSON.stringify(error), isFatal);
    try {
      const response = await fetch('http://10.0.2.2:8085/api/aggregation', {
        method: 'GET',
        headers: new Headers({
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaXZhamkiLCJvcmdJZCI6IjY0MDA0ZjcxODVkN2RlN2JjYmFmMWIyZiIsInJvbGVzIjpbInNkZTEiLCJvcmdhZG1pbiJdLCJ1c2VyX2lkIjoiNjQwYjBkZDc4ZjllODhiMjE5Y2M2Zjk0IiwiaWF0IjoxNjgwNjc2NjAxLCJleHAiOjE2ODA3NjMwMDEsImlzcyI6InZiIn0.dh50CF3F1fL3AMz9jZUA-fkUSkB6w8m9I12jt_6q63M',
          'Content-Type': 'application/json',
        }),
      });
      const {
        data: {results},
      } = await response.json();
      console.log(results, 'resultssssssssssssss');
      setname('aggregation');
      setData(results);
      Alert.alert(JSON.stringify(error));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  setJSExceptionHandler(exceptionHandler, true);
  setNativeExceptionHandler((error, isFatal) => {
    console.log(
      'inside native exception handler -----------==============00000000000000000',
      error,
    );
  }, true);
  return (
    <View style={{flex: 1, padding: 24}} {...panResponder.panHandlers}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <FlatList
            data={data}
            keyExtractor={({_id}) => _id}
            renderItem={({item}) => (
              <>
                <Text style={{fontWeight: 'bold'}}>
                  {name === 'collection'
                    ? item.modelName + '   ,   ' + item.modelId
                    : item.aggregationName + '   ,   ' + item.aggregation}
                </Text>
              </>
            )}
          />
          <TextInput
            style={styles.input}
            onChangeText={setTextString}
            value={textString}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />
          <Text>Your type string:-{textString}</Text>
          <Button
            onPress={() => {
              getAggregations();
            }}
            title="Press Me"
          />

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Global touch position:</Text>
            <Text>{`x: ${touch.x.toFixed(2)}, y: ${touch.y.toFixed(2)}`}</Text>
          </View>
          <KeyBoardHandler />
          <HelloWorld />
          <AnrHandler />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
