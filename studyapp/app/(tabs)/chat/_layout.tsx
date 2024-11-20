import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import { MsgProvider } from './MessagesContext';

export default function Layout() {
    return (
        <MsgProvider>
            <View style={styles.wrapper}>
                <Slot />
            </View>
        </MsgProvider>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
});
