import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderBar = ({ navigation }) => {
    async function logout() {
        try {
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("userToken");
            navigation.navigate('Login');
        }
        catch(exception) {
            console.log("LOGOUT FAILED");
            console.log(exception);
        }
    };
    
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image
                        style={styles.menu}
                        source={require("../../assets/images/menu.png")} />
                </TouchableOpacity> 

                <Image
                    style={styles.title}
                    source={require("../../assets/images/logo.png")} />

                <TouchableOpacity onPress={() => logout()}>
                    <Text style={styles.logout}>Log out</Text>
                </TouchableOpacity> 
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    menu: {
        resizeMode: "center",
        width: 30,
        height: 30,
        margin: 10
    },
    title: {
        resizeMode: "center",
        width: 200,
        height: 30,
        margin: 10
    },
    header:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems:'center',
        borderWidth: 1,
    },
    container: {
        backgroundColor: '#E8EBE8',
    },
    logout: {
        fontSize: 16,
        marginRight: 10,
        fontWeight: "bold",
        color: "red"
    }
});

export default HeaderBar;