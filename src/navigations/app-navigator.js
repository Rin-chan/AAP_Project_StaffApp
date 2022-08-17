import { createDrawerNavigator } from "react-navigation-drawer";

import userManagement from './userManagement-navigator';
import BinsScreen from '../scenes/bins';
import routingMapScreen from '../scenes/routingMap';

const TabNavigatorConfig = {
    initialRouteName: 'Home',
    header: null,
    headerMode: 'none',
    unmountInactiveRoutes: true,
};

const RouteConfigs = {
    Home: userManagement,
    routingMap: {
        screen: routingMapScreen,
        navigationOptions: {
            title: "Map",
        }
    },
    Bins: {
        screen: BinsScreen,
    },
};

const AppNavigator = createDrawerNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;