import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View, ScrollView, TouchableHighlight } from 'react-native';
import CryptoJS from 'crypto-js';
import { RadioButton } from 'react-native-paper';

import { HeaderBar } from "../../components/organisms";
import UserDB from '../../utils/database/userdb'
import { Colors } from '../../styles';

const AddUserScreen = ({ navigation }) => {
    const [username, onChangeUsername] = useState("");
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const [repassword, onChangeRePassword] = useState("");
    const [checked, setChecked] = React.useState('admin');
    
    const [warning1, onWarning1] = useState(false);
    const [warning2, onWarning2] = useState(false);
    const [warning3, onWarning3] = useState(false);
    const [warning4, onWarning4] = useState(false);

    const registerClick = () => {
        let errors = [];
        onWarning1(false);
        onWarning2(false);
        onWarning3(false);
        onWarning4(false);

        if (username === ''){
            errors.push('username')
        }

        if (email === ''){
            errors.push('email')
        }

        if (password === ''){
            errors.push('password')
        }

        if (repassword === ''){
            errors.push('repassword')
        }

        if (errors.length) { 
            onWarning1(true)
            return;
        }

        let password_check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        if (!password.match(password_check)) { 
            onWarning4(true)
            return;
        }

        if (password != repassword) { 
            onWarning2(true)
            return;
        }

        let lowerEmail = email.toLowerCase();
        UserDB.getStaffSpecificUser(lowerEmail).then((result) => {
            if (result.length == 0) {
                var hashedPassword = CryptoJS.SHA256(password).toString()

                var type = 0;
                if (checked == "admin") {
                    type = 1;
                }
                UserDB.addStaffUser(username, lowerEmail, hashedPassword, type);
                navigation.navigate("UserManagement");
                return;
            }
            else {
                onWarning3(true);
                return;
            }
        })
    }

    return (
        <View style={{flex: 1}}>
            <HeaderBar navigation={navigation}/>

            <TouchableHighlight
                style={{padding: 10}}
                onPress={() => navigation.navigate('UserManagement')}>
                    <Text style={{fontWeight: "bold"}}>Go back</Text>
            </TouchableHighlight>

            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}
                    keyboardShouldPersistTaps='handled'>
                    <Text style={styles.title}>Add Staff User</Text>

                    <Text>Username</Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={onChangeUsername}
                        value={username}
                        placeholder="Enter your username"
                    />

                    <Text>Email</Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder="Enter your email"
                    />

                    <Text>Password</Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={onChangePassword}
                        secureTextEntry={true}
                        value={password}
                        placeholder="Enter your password"
                    />

                    <Text>Retype Your Password</Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={onChangeRePassword}
                        secureTextEntry={true}
                        value={repassword}
                        placeholder="Enter your password again"
                    />

                    <Text>Type of Account</Text>
                    <View style={[styles.row, {justifyContent: "space-evenly", marginBottom: 25}]}>
                        <Text>Admin</Text>
                        <RadioButton
                            value="admin"
                            status={ checked === 'admin' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('admin')}
                        />
                        <Text>Bin Collector</Text>
                        <RadioButton
                            style={{backgroundColor: "black"}}
                            value="bin"
                            status={ checked === 'bin' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('bin')}
                        />
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.cancelScreenButton}
                            onPress={() => navigation.navigate('UserManagement')}
                            underlayColor='#fff'>
                            <Text style={styles.registerButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.registerScreenButton}
                            onPress={() => registerClick()}
                            underlayColor='#fff'>
                            <Text style={styles.registerButtonText}>Register</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={warning1?[styles.warning, {display: 'flex'}]:styles.warning}>Fill in all the blanks</Text>
                    <Text style={warning2?[styles.warning, {display: 'flex'}]:styles.warning}>Passwords are not the same</Text>
                    <Text style={warning3?[styles.warning, {display: 'flex'}]:styles.warning}>This email is already in use</Text>
                    <Text style={warning4?[styles.warning, {display: 'flex'}]:styles.warning}>Password must have at least 8 characters, inclusive of one uppercase, one lowercase and numerical number.</Text>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: '10%',
        flex: 1,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20
    },
    inputText: {
        height: 40,
        margin: 12,
        padding: 10,
        borderWidth: 1
    },
    registerScreenButton: {
        marginRight: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: Colors.BLUE_BUTTON
    },
    cancelScreenButton: {
        marginRight: 10,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: Colors.DANGER_BUTTON
    },
    registerButtonText: {
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    redirectText: {
        textAlign: 'center',
        marginTop: 'auto',
        fontWeight: 'bold',
    },
    warning: {
        color: "red",
        display: 'none'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5
    },
    textStyle: {
        fontWeight: "bold",
        textAlign: "center"
    },
    modalSubtitle: {
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: 15,
        color: "red"
    },
    modalInnertext: {
        padding: 5,
    },
    modalButton: {
        marginTop: 15,
        padding: 10,
        borderRadius: 60,
    },
});

export default AddUserScreen;