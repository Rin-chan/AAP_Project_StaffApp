import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import authLoading from '../scenes/authLoading';
import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';

const RootNavigator = createSwitchNavigator(
    {
        Load: authLoading,
        Auth: AuthNavigator,
        App: AppNavigator,
    },
    {
        initialRouteName: 'Load',
    },
);

export default createAppContainer(RootNavigator);