import React, {useState, useEffect} from 'react';
import {View, Text, InteractionManager, TouchableOpacity} from 'react-native';

const AnrHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('https://example.com/api/data');
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    let timer = null;

    const handleCheckAppResponsiveness = () => {
      timer = setTimeout(() => {
        InteractionManager.runAfterInteractions(() => {
          // This function will be executed after all interactions have finished
          handleCheckAppResponsiveness();
        });
      }, 5000); // Check every 5 seconds
    };

    handleCheckAppResponsiveness();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleFetchData = () => {
    console.log('42 line handle fetch data');
    InteractionManager.runAfterInteractions(() => {
      console.log('fetchData called');
      fetchData();
    });
  };

  return (
    <View>
      {isLoading ? (
        <Text>Loading data...</Text>
      ) : responseData ? (
        <Text>Data loaded: {JSON.stringify(responseData)}</Text>
      ) : (
        <TouchableOpacity onPress={handleFetchData}>
          <Text>Tap to load data</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AnrHandler;
