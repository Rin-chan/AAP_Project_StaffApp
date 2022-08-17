import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';

import { HeaderBar } from "../../components/organisms";
import { Colors } from '../../styles';
import BinDB from '../../utils/database/bindb';

const BinsScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const [page, setPage] = useState(0);
    const itemsPerPage = 4;

    const [totalBinsPage, setTotalBinsPage] = useState(0);

    const [request, setRequest] = useState(false);

    const [resultTable, setResultTable] = useState(Array);

    useEffect(() => {
        if (request) {
            getBinsDB();
        }
    }, [page]);

    useEffect(() => {
        if (request) {
            setPage(0);
            getBinsDB();
        }
    }, [searchQuery]);

    function getPageBins() {
        BinDB.getAllBinsCount(searchQuery).then((result) => {
            var temPage = Math.ceil(result/itemsPerPage)
            setTotalBinsPage(temPage);
        });
    }

    const getBinsDB = () => {
        BinDB.getBins(page, itemsPerPage, searchQuery).then((result) => {
            setRequest(true);
            setResultTable(result);
        });

        getPageBins();
    }

    if (request == false) {
        getBinsDB();
    }

    const unSelect = (id) => {
        BinDB.updateBins(id, 0);
        let newTable = resultTable;
        newTable[id-page*itemsPerPage-1][3] = 0;
        setResultTable([...newTable]);
    }

    const select = (id) => {
        BinDB.updateBins(id, 1);
        let newTable = resultTable;
        newTable[id-page*itemsPerPage-1][3] = 1;
        setResultTable([...newTable]);
    }

    return (
        <View style={styles.container}>
            <HeaderBar navigation={navigation}/>

            <View style={styles.innerContainer}>
                <Text style={styles.title}>List of Bins</Text>
                
                <Searchbar
                    placeholder="Search for location"
                    onChangeText={query => setSearchQuery(query)}
                    value={searchQuery}
                />

                <ScrollView>
                    <View>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Selected</DataTable.Title>
                                <DataTable.Title>Location</DataTable.Title>
                                <DataTable.Title>Capacity</DataTable.Title>
                            </DataTable.Header>
                            
                            { 
                                resultTable.map(row => {
                                    return (
                                        <DataTable.Row>
                                            <DataTable.Cell>
                                                {row[3] == 1 ?
                                                    <TouchableOpacity
                                                        style={styles.selectedButton}
                                                        onPress={() => unSelect(row[0])}
                                                        underlayColor='#fff'>
                                                        <Text>&#10004;</Text>
                                                    </TouchableOpacity>
                                                :
                                                    <TouchableOpacity
                                                        style={styles.notSelectedButton}
                                                        onPress={() => select(row[0])}
                                                        underlayColor='#fff'>
                                                        <Text>&#10006;</Text>
                                                    </TouchableOpacity>
                                                }
                                            </DataTable.Cell>
                                            <DataTable.Cell>{row[1]}</DataTable.Cell>
                                            <DataTable.Cell>{row[2]}</DataTable.Cell>
                                        </DataTable.Row>
                                    );
                                })
                            }

                            <DataTable.Pagination
                                page={page}
                                numberOfPages={totalBinsPage}
                                onPageChange={(page) => setPage(page)}
                                label={(page+1) + ' of ' + (totalBinsPage)}
                            />
                        </DataTable>
                    </View>
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
    selectedButton: {
        padding: 10,
        borderRadius: 60,
        backgroundColor: Colors.GREEN_BUTTON
    },
    notSelectedButton: {
        padding: 10,
        borderRadius: 60,
        backgroundColor: Colors.DANGER_BUTTON
    },
});

export default BinsScreen;