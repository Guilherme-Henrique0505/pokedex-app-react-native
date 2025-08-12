// component/Wrapper.js

import styled from 'styled-components/native'
import Constants from 'expo-constants';
import { View } from 'react-native';

const Wrapper = styled(View)`
  flex: 1;
  justify-content: flex-start;
  padding-top: ${Constants.statusBarHeight};
  background-color: #ecf0f1;
  padding: 0px;
`;

export default Wrapper;