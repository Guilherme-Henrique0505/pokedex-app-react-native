// App.js

import List from './components/List';
import Details from './components/Details';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat': require('./Assets/Fonts/Montserrat.ttf'),
    'Akshar': require('./Assets/Fonts/Akshar.ttf'),
    'KronaOne': require('./Assets/Fonts/KronaOne.ttf'),
    'Open Sans': require('./Assets/Fonts/OpenSans.ttf'),
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={List} />
        <Stack.Screen name="Detalhes" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}