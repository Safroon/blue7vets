// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import Welcome from './components/Welcome';
// import AppNavigator from './navigation/AppNavigator';
// // import AppNavigator from './src/navigation/AppNavigator';
// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       {/* <NewAppScreen templateFileName="App.tsx" /> */}
//       {/* <Welcome /> */}
//       <AppNavigator />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;

import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Login from './src/components/Login';

const App = () => (
  <Provider store={store}>
    <Login />
  </Provider>
);

export default App;
