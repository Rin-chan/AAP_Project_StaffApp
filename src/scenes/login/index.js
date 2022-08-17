import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View, Image, Dimensions, ScrollView, Modal } from 'react-native';
import CryptoJS from 'crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserDB from '../../utils/database/userdb';
import { Colors } from '../../styles';

const LoginScreen = ({ navigation }) => {
    const _width = Dimensions.get('screen').width * 0.8;

    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    const [warning1, onWarning1] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const storeData = async (location, value) => {
        try {
            await AsyncStorage.setItem(location, value)
        } catch (e) {
            console.log("Error in storing userToken");
            console.log(e);
        }
    }

    const loginClick = () => {
        onWarning1(false);

        let lowerEmail = email.toLowerCase();
        UserDB.getStaffSpecificUser(lowerEmail).then((result) => {
            if(result.length != 0) {
                if (lowerEmail == result[0][2]) {
                    var hashedPassword = CryptoJS.SHA256(password).toString()

                    if (hashedPassword == result[0][3]){
                        if (result[0][5] == 1) {
                            setModalVisible(true);
                            return;
                        }
                        
                        var randomNum = Math.floor(Math.random() * 999999) + 100000 // Generate a random number between 100000 and 999999
                        var userToken = CryptoJS.SHA256(lowerEmail+randomNum.toString()).toString() // Generate a token

                        storeData('userToken', userToken);
                        storeData('user', lowerEmail);

                        navigation.navigate('Home');
                        return;
                    }
                }
                onWarning1(true);
                return;
            }
            else {
                onWarning1(true);
                return;
            }
        })
    }

    const createAccount = () => {
        UserDB.getStaffSpecificUser("rin@gmail.com").then((result) => {
            if(result.length != 1) {
                var password = "Password1"
                var hashedPassword = CryptoJS.SHA256(password).toString()

                UserDB.addStaffUser("Rin", "rin@gmail.com", hashedPassword, 1);
                return;
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps='handled'>
                <Image 
                    source={require("../../assets/images/logo.png")}
                    style={{width: _width, resizeMode: "contain"}} />

                <Text style={styles.title}>Staff Login</Text>

                <Text >Email</Text>
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

                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.loginScreenButton}
                        onPress={() => loginClick()}
                        underlayColor='#fff'>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>

                <Text style={warning1?[styles.warning, {display: 'flex'}]:styles.warning}>Email or password is incorrect</Text>
            </ScrollView>

            <View style={styles.row}>
                <TouchableOpacity
                    style={[styles.loginScreenButton, {backgroundColor: "yellow"}]}
                    onPress={() => createAccount()}
                    underlayColor='#fff'>
                    <Text style={styles.redirectText}>Generate a staff account</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalSubtitle}>THIS ACCOUNT HAS BEEN DISABLED</Text>
                        <Text style={styles.modalInnertext}>Please contact administrator if this account has been disabled incorrectly.</Text>

                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalVisible(!modalVisible)} >
                            <Text style={styles.textStyle}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
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
    loginScreenButton: {
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
    loginButtonText: {
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
        backgroundColor: Colors.PRIMARY_BUTTON
    },
});

export default LoginScreen;