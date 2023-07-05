import {MainScreen} from '~/screens';
import React from 'react';
import {SendbirdProvider} from './providers/sendbird/sendbird.provider';

const App: React.FC = () => {
  return (
    <SendbirdProvider>
      <MainScreen />
    </SendbirdProvider>
  );
};

export default App;
