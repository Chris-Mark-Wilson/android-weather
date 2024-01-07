import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';



export  const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
        />
        <StatusBar style="auto" />
        </View>
    );
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
      });