import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserDB from '../../utils/database/userdb';
import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';

const HomeScreen = ({ navigation }) => {
    const [type, setType] = useState(0);

    const getUser = async () => {
        email = await AsyncStorage.getItem('user');

        UserDB.getStaffSpecificUser(email).then((result) => {
            if(result.length != 0) {
                if (result[0][4] == 1){
                    setType(1);
                }
            }
        })
    }

    getUser();

    return (
        <View style={styles.container}>
            <HeaderBar navigation={navigation}/>

            <View style={styles.innerContainer}>
                <Text style={styles.title}>Home</Text>

                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                        <TouchableOpacity
                            style={styles.box}
                            onPress={() => navigation.navigate('routingMap')}>
                            <View style={styles.row}>
                                <Icon name="location-arrow" size={50}/>
                                <Text style={styles.text}>View Routing Map</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.box}
                            onPress={() => navigation.navigate('Bins')}>
                            <View style={styles.row}>
                                <Icon name="dumpster" size={50}/>
                                <Text style={styles.text}>Check Bins</Text>
                            </View>
                        </TouchableOpacity>

                        {
                            type == 1?
                            <TouchableOpacity
                                style={styles.box}
                                onPress={() => navigation.navigate('UserManagement')}>
                                <View style={styles.row}>
                                    <Icon name="users" size={50}/>
                                    <Text style={styles.text}>User Management</Text>
                                </View>
                            </TouchableOpacity>
                            : null
                        }

                        <TouchableOpacity
                            style={styles.box}
                            onPress={() => navigation.navigate('ChangePassword')}>
                            <View style={styles.row}>
                                <Icon name="lock" size={50}/>
                                <Text style={styles.text}>Change Password</Text>
                            </View>
                        </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        margin: "5%"
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: "center"
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    box: {
        margin: 10,
        padding: 20,
        borderWidth: 1,
        backgroundColor: Colors.SECONDARY_BACKGROUND
    },
    text: {
        fontSize: 20,
    },
});

export default HomeScreen;