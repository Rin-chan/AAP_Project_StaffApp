import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';
import UserDB from '../../utils/database/userdb';

const UserManagementScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const [page, setPage] = useState(0);
    const [staffPage, setStaffPage] = useState(0);
    const itemsPerPage = 4;

    const [selected, setSelected] = useState(0);
    const [request, setRequest] = useState(false)

    const [users, setUsers] = useState(Array);
    const [staffUsers, setStaffUsers] = useState(Array);

    const [totalUserPage, setTotalUserPage] = useState(0);
    const [totalStaffPage, setTotalStaffPage] = useState(0);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalId, setModalId] = useState(0);
    const [modalUsername, setModalUsername] = useState("");
    const [modalEmail, setModalEmail] = useState("");
    const [modalType, setModalType] = useState(0);
    const [modalDisabled, setModalDisabled] = useState(0);

    function getPageUsers() {
        UserDB.getAllUsersCount(searchQuery).then((result) => {
            var temPage = Math.ceil(result/itemsPerPage)
            setTotalUserPage(temPage);
        });
    }

    function getPageStaffUsers() {
        UserDB.getStaffAllUsersCount(searchQuery).then((result) => {
            var temPage = Math.ceil(result/itemsPerPage)
            setTotalStaffPage(temPage);
        });
    }

    function getUsers() {
        UserDB.getAllUsers(page, itemsPerPage, searchQuery).then((result) => {
            setRequest(true);
            setUsers(result);
            setSelected(1);
        });

        getPageUsers();
    }

    function getStaffUsers() {
        UserDB.getStaffAllUsers(staffPage, itemsPerPage, searchQuery).then((result) => {
            setRequest(true);
            setStaffUsers(result);
            setSelected(0);
        });

        getPageStaffUsers();
    }

    useEffect(() => {
        if (request) {
            getUsers();
        }
    }, [page]);

    useEffect(() => {
        if (request) {
            getStaffUsers();
        }
    }, [staffPage]);

    useEffect(() => {
        if (request) {
            if (selected == 0) {
                setStaffPage(0);
                getStaffUsers();
            }
            else {
                setPage(0);
                getUsers();
            }
        }
    }, [searchQuery]);

    if (request == false) {
        getStaffUsers();
    }

    const userDisabled = (id, email) => {
        UserDB.updateUserDisabled(email, 1);
        let newTable = users;
        newTable[id-page*itemsPerPage-1][9] = 1;
        setUsers([...newTable]);
    }

    const userEnabled = (id, email) => {
        UserDB.updateUserDisabled(email, 0);
        let newTable = users;
        newTable[id-page*itemsPerPage-1][9] = 0;
        setUsers([...newTable]);
    }

    const staffUserDisabled = (id, email) => {
        UserDB.updateStaffUserDisabled(email, 1);
        let newTable = staffUsers;
        newTable[id-staffPage*itemsPerPage-1][5] = 1;
        setUsers([...newTable]);
        setModalDisabled(1);
    }

    const staffUserEnabled = (id, email) => {
        UserDB.updateStaffUserDisabled(email, 0);
        let newTable = staffUsers;
        newTable[id-staffPage*itemsPerPage-1][5] = 0;
        setUsers([...newTable]);
        setModalDisabled(0);
    }

    const staffUserAdmin = (id, email) => {
        UserDB.updateStaffUserType(email, 1);
        let newTable = staffUsers;
        newTable[id-staffPage*itemsPerPage-1][4] = 1;
        setUsers([...newTable]);
        setModalType(1);
    }

    const staffUserBin = (id, email) => {
        UserDB.updateStaffUserType(email, 0);
        let newTable = staffUsers;
        newTable[id-staffPage*itemsPerPage-1][4] = 0;
        setUsers([...newTable]);
        setModalType(0);
    }

    return (
        <View style={styles.container}>
            <HeaderBar navigation={navigation}/>

            <View style={[styles.row, {justifyContent: "space-between"}]}>
                <TouchableHighlight
                    style={{padding: 10}}
                    onPress={() => navigation.navigate('Home')}>
                        <Text style={{fontWeight: "bold"}}>Go back to home page</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={{padding: 10}}
                    onPress={() => navigation.navigate('AddUser')}>
                    <Text style={{fontWeight: "bold"}}>Add Staff Users</Text>
                </TouchableHighlight>
            </View>

            <View style={styles.innerContainer}>
                <Text style={styles.title}>User Management</Text>
                
                <Searchbar
                    style={{marginBottom: 15}}
                    placeholder="Search for user"
                    onChangeText={query => setSearchQuery(query)}
                    value={searchQuery}
                />

                <View style={styles.row}>
                    {selected == 0? 
                    <TouchableOpacity
                        style={[styles.userSelectionButton, {backgroundColor: Colors.BLUE_BUTTON}]}
                        underlayColor='#fff'>
                        <Text>Staff Users</Text>
                    </TouchableOpacity>
                    : 
                    <TouchableOpacity
                        style={[styles.userSelectionButton, {backgroundColor: 'white'}]}
                        onPress={() => getStaffUsers()}
                        underlayColor='#fff'>
                        <Text>Staff Users</Text>
                    </TouchableOpacity>
                    }

                    {selected == 1?
                    <TouchableOpacity
                        style={[styles.userSelectionButton, {backgroundColor: Colors.BLUE_BUTTON}]}
                        underlayColor='#fff'>
                        <Text>Customer Users</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={[styles.userSelectionButton, {backgroundColor: 'white'}]}
                        onPress={() => getUsers()}
                        underlayColor='#fff'>
                        <Text>Customer Users</Text>
                    </TouchableOpacity>
                    }
                </View>

                <ScrollView>
                    <View>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Username</DataTable.Title>
                                <DataTable.Title>Email</DataTable.Title>
                                {selected == 0 ? <DataTable.Title>Type</DataTable.Title>: null}
                                <DataTable.Title>Disabled</DataTable.Title>
                                {selected == 0 ? <DataTable.Title>Edit</DataTable.Title>: null}
                            </DataTable.Header>
                            
                            {
                                selected == 0 ? 
                                    <View>
                                    {
                                        staffUsers.map(row => {
                                            return (
                                                <DataTable.Row>
                                                    <DataTable.Cell>{row[1]}</DataTable.Cell>
                                                    <DataTable.Cell>{row[2]}</DataTable.Cell>
                                                    <DataTable.Cell>
                                                        {row[4] == 1 ?<Text>Admin</Text>
                                                            :<Text>Bin Collector</Text>}
                                                    </DataTable.Cell>
                                                    <DataTable.Cell>
                                                        {row[5] == 1 ?<Text>Yes</Text>
                                                            : <Text>No</Text>}
                                                    </DataTable.Cell>
                                                    <DataTable.Cell>
                                                    <TouchableOpacity
                                                        style={styles.primaryButton}
                                                        onPress={() => {
                                                            setModalVisible(true);
                                                            setModalId(row[0]);
                                                            setModalUsername(row[1]);
                                                            setModalEmail(row[2]);
                                                            setModalType(row[4]);
                                                            setModalDisabled(row[5]);
                                                        }}>
                                                        <Text>Edit</Text>
                                                    </TouchableOpacity>
                                                    </DataTable.Cell>
                                                </DataTable.Row>
                                            );
                                        })
                                    }
                                    </View>
                                : 
                                    <View>
                                    {
                                        users.map(row => {
                                            return (
                                                <DataTable.Row>
                                                    <DataTable.Cell>{row[1]}</DataTable.Cell>
                                                    <DataTable.Cell>{row[2]}</DataTable.Cell>
                                                    <DataTable.Cell>
                                                        {row[9] == 1 ?
                                                            <TouchableOpacity
                                                                style={styles.disabledButton}
                                                                onPress={() => userEnabled(row[0], row[2])}
                                                                underlayColor='#fff'>
                                                                <Text>Yes</Text>
                                                            </TouchableOpacity>
                                                        :
                                                            <TouchableOpacity
                                                                style={styles.enabledButton}
                                                                onPress={() => userDisabled(row[0], row[2])}
                                                                underlayColor='#fff'>
                                                                <Text>No</Text>
                                                            </TouchableOpacity>
                                                        }
                                                    </DataTable.Cell>
                                                </DataTable.Row>
                                            );
                                        })
                                    }
                                    </View>
                            }

                            {selected === 0?
                            <DataTable.Pagination
                                page={staffPage}
                                numberOfPages={totalStaffPage}
                                onPageChange={(staffPage) => setStaffPage(staffPage)}
                                label={(staffPage+1) + ' of ' + (totalStaffPage)}
                            />
                            :
                            <DataTable.Pagination
                                page={page}
                                numberOfPages={totalUserPage}
                                onPageChange={(page) => setPage(page)}
                                label={(page+1) + ' of ' + (totalUserPage)}
                            />
                            }
                        </DataTable>
                    </View>
                </ScrollView>
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
                        <Text style={styles.modalSubtitle}>Edit Staff Users</Text>

                        <View style={styles.row}>
                            <Text style={styles.modalInnertext}>Username: </Text>
                            <Text style={styles.modalInnertext}>{modalUsername}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.modalInnertext}>Email: </Text>
                            <Text style={styles.modalInnertext}>{modalEmail}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.modalInnertext}>Type of Account: </Text>
                            {
                            modalType == 1 ?
                                <TouchableOpacity
                                    style={styles.disabledButton}
                                    onPress={() => staffUserBin(modalId, modalEmail)}
                                    underlayColor='#fff'>
                                    <Text>Admin</Text>
                                </TouchableOpacity>
                            :
                                <TouchableOpacity
                                    style={styles.enabledButton}
                                    onPress={() => staffUserAdmin(modalId, modalEmail)}
                                    underlayColor='#fff'>
                                    <Text>Bin</Text>
                                </TouchableOpacity>
                            }
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.modalInnertext}>Disabled: </Text>
                            {
                            modalDisabled == 1 ?
                                <TouchableOpacity
                                    style={styles.disabledButton}
                                    onPress={() => staffUserEnabled(modalId, modalEmail)}
                                    underlayColor='#fff'>
                                    <Text>Yes</Text>
                                </TouchableOpacity>
                            : 
                                <TouchableOpacity
                                    style={styles.enabledButton}
                                    onPress={() => staffUserDisabled(modalId, modalEmail)}
                                    underlayColor='#fff'>
                                    <Text>No</Text>
                                </TouchableOpacity>
                            }
                        </View>

                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalVisible(!modalVisible)} >
                            <Text style={styles.textStyle}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        justifyContent: 'flex-start',
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
    userSelectionButton: {
        padding: 10,
        borderRadius: 60,
        borderWidth: 1,
        margin: 5
    },
    enabledButton: {
        padding: 10,
        borderRadius: 60,
        backgroundColor: Colors.GREEN_BUTTON
    },
    disabledButton: {
        padding: 10,
        borderRadius: 60,
        backgroundColor: Colors.DANGER_BUTTON
    },
    primaryButton: {
        padding: 10,
        borderRadius: 60,
        backgroundColor: Colors.PRIMARY_BUTTON
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
        fontSize: 15,
        marginBottom: 15,
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

export default UserManagementScreen;