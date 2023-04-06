// import React, {useState, useEffect} from 'react';
// import {Text, InteractionManager} from 'react-native';

// const ErrorScreen = () => {
//   const [isAppResponsive, setIsAppResponsive] = useState(true);

//   useEffect(() => {
//     const handleInteractionChange = hasStartedInteraction => {
//       if (!hasStartedInteraction) {
//         setIsAppResponsive(false);
//       } else {
//         setIsAppResponsive(true);
//       }
//     };

//     InteractionManager.createInteractionHandle(handleInteractionChange);

//     const timeoutId = setTimeout(() => {
//       setIsAppResponsive(false);
//     }, 15000); // Increase the timeout to 15 seconds

//     return () => {
//       InteractionManager.clearInteractionHandle(handleInteractionChange);
//       clearTimeout(timeoutId);
//     };
//   }, []);

//   if (!isAppResponsive) {
//     return <Text>App not responding. Please try again later.</Text>;
//   }

//   return null;
// };

// export default ErrorScreen;
