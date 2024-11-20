import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useMsg } from './MessagesContext';
import dummyData from './dummyData';

const Chat: React.FC = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { msgData, setMsgData } = useMsg();
    const uId = Number(id);

    const user = dummyData.users.find((u) => u.id === uId);
    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>User not found!</Text>
            </View>
        );
    }

    const userMsgs = msgData[uId] || [];
    const [text, setText] = useState('');

    const send = () => {
        if (text.trim()) {
            const newMsg = {
                sender: 'You',
                text,
                timestamp: new Date().toISOString(),
            };
            setMsgData({
                ...msgData,
                [uId]: [...userMsgs, newMsg],
            });
            setText('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/chat')}>
                    <Ionicons name="arrow-back-outline" size={24} color="#007BFF" />
                </TouchableOpacity>
                <Text style={styles.title}>{user.name}</Text>
            </View>
            <FlatList
                data={userMsgs}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.msg,
                            item.sender === 'You' ? styles.sent : styles.received,
                        ]}
                    >
                        <Text
                            style={item.sender === 'You' ? styles.sentText : styles.receivedText}
                        >
                            {item.text}
                        </Text>
                    </View>
                )}
            />
            <View style={styles.inputSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message"
                    value={text}
                    onChangeText={setText}
                />
                <TouchableOpacity style={styles.btn} onPress={send}>
                    <Ionicons name="send" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    msg: {
        marginVertical: 5,
        borderRadius: 10,
        maxWidth: '75%',
        padding: 10,
        marginHorizontal: 10,
    },
    received: {
        backgroundColor: '#B0BEC5',
        alignSelf: 'flex-start',
    },
    list: {
        paddingTop: 10,
    },
    title: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    sent: {
        backgroundColor: '#007BFF',
        alignSelf: 'flex-end',
    },
    input: {
        padding: 10,
        borderRadius: 20,
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    header: {
        borderColor: '#eee',
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: 'center',
        padding: 10,

    },
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: 16,

    },
    sentText: {
        color: '#fff',
    },
    error: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    btn: {
        backgroundColor: '#007BFF',
        borderRadius: 25,
        marginLeft: 10,
        padding: 10,
    },
    inputSection: {
        borderColor: '#ddd',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopWidth: 1,
        padding: 10,
    },
    receivedText: {
        color: '#000',
    },
});

export default Chat;
