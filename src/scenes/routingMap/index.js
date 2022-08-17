import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
var openrouteservice = require("openrouteservice-js");

import { HeaderBar } from "../../components/organisms";
import BinDB from '../../utils/database/bindb';
import flaskServer from '../../../settings.json'
import apiKey from '../../../secrets.json'

const routingMapScreen = ({ navigation }) => {
    var Directions = new openrouteservice.Directions({ api_key: apiKey.ORSKey});

    const _width = Dimensions.get('screen').width;
    const _height = Dimensions.get('screen').height * 0.7;

    const [rendered, setRendered] = useState(false);
    const [coords, setCoords] = useState(Array);

    const [coordinates, setCoordinates] = useState(Array);

    const getPath = async () => {
        fetch(`http://${flaskServer.flaskServer}/routing`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            var dataList = new Array
            data.result.forEach(element => {
                dataList.push(element)
            });

            Directions.calculate({
                coordinates: dataList,
                profile: 'driving-car',
                format: 'geojson'
            })
            .then(function(geojson) {
                var PolyLine = geojson.features[0].geometry.coordinates.map(c => ({latitude: c[1], longitude: c[0]}))
                setRendered(true);
                setCoords(PolyLine);

                BinDB.getAllBins().then((result) => {
                    setCoordinates(result);
                });
            })
            .catch(function(err) {
                var str = "An error occurred: " + err;
                console.log(str);
            });
        })
        .catch(err => console.error(err));
    }

    if (rendered == false) {
        getPath();
    }

    return (
        <View style={styles.container}>
            <HeaderBar navigation={navigation}/>

            <View style={styles.innerContainer}>
                <Text style={styles.title}>Route</Text>

                <MapView
                    style={{height: _height, width: _width}}>
            
                    {
                        coordinates.map((c, index) => {
                            if (c[3] == 1) {
                                return (<Marker
                                    coordinate={{latitude: parseFloat(c[5]), longitude: parseFloat(c[4])}}
                                    key={index}
                                    title={c[1]}
                                   />);
                            }
                        })
                    }

                    <Polyline
                        coordinates={coords.map(c => ({latitude: c.latitude, longitude: c.longitude}))}
                        strokeColor="#000"
                        strokeWidth={6}
                    />

                </MapView>
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
        margin: "5%",
        alignItems: "center"
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default routingMapScreen;