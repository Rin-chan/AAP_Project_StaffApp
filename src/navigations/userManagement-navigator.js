import { createSwitchNavigator } from 'react-navigation';

import HomeScreen from '../scenes/home';
import UserManagementScreen from '../scenes/userManagement';
import ChangePasswordScreen from '../scenes/changePassword';
import AddUserScreen from '../scenes/userManagement/addUser'

const userManagement = createSwitchNavigator(
    {
        Home: HomeScreen,
        UserManagement: UserManagementScreen,
        ChangePassword: ChangePasswordScreen,
        AddUser: AddUserScreen,
    },
    {
        initialRouteName: 'Home',
    },
);

export default userManagement;