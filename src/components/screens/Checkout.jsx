import React from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

export const ListItem = ({ imgUrl, name }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <Image
          source={require(`../../../assets/${imgUrl}`)}
          style={styles.imageStyle}
        />
            </View>
            <View style={styles.textDescView}>
                <Text style={styles.imgText}>{name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 5,
        marginTop: 25,
        width: '100%',
    },
    imageStyle: {
        height: 70,
        width: 150,
    },
    imageView: {
        width: '50%',
    },
    imgText: {
        fontSize: 15,
        fontWeight:'bold'
    },
    textDescView: {
        justifyContent: 'center',
        width: '50%',
    },
});
