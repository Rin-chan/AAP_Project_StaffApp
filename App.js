import React from 'react';
import Index from './src';
import 'react-native-url-polyfill/auto';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
    return (
        <PaperProvider>
            <Index />
        </PaperProvider>
    );
}

export default App;