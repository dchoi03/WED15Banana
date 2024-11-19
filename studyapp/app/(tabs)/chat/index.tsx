import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Pressable, Modal } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useMsg } from './MessagesContext';

const ChatList: React.FC = () => {
    const { msgData, setMsgData } = useMsg();
    const [modal, setModal] = useState(false);
    const [users, setUsers] = useState([
        { id: 1, name: 'Tony Stark' },
        { id: 2, name: 'Hulk' },
        { id: 3, name: 'Natasha Romanoff' },
        { id: 4, name: 'Thor' },
    ]);
    const router = useRouter();

    const start = (id: number) => {
        if (!msgData[id]) {
            setMsgData({ ...msgData, [id]: [] });
        }
        setModal(false);
        router.push(`/chat/${id}`);
    };

    const initials = (name: string) => name.split(' ').map((n) => n[0]).join('');

    return (
        <View style={styles.container}>
            <FlatList
                data={users.filter((u) => msgData[u.id])}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const lastMsg = msgData[item.id]?.[msgData[item.id].length - 1] || null;
                    return (
                        <Link href={`/chat/${item.id}`} asChild>
                            <Pressable style={styles.item}>
                                <View style={styles.icon}>
                                    <Text style={styles.iconText}>{initials(item.name)}</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.preview}>
                                        {lastMsg ? lastMsg.text : 'No messages yet'}
                                    </Text>
                                </View>
                            </Pressable>
                        </Link>
                    );
                }}
            />
            <TouchableOpacity style={styles.fab} onPress={() => setModal(true)}>
                <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
            </TouchableOpacity>
            <Modal visible={modal} animationType="slide" transparent>
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Start a New Chat</Text>
                    <FlatList
                        data={users.filter((user) => !msgData[user.id])}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.newChat} onPress={() => start(item.id)}>
                                <View style={styles.icon}>
                                    <Text style={styles.iconText}>{initials(item.name)}</Text>
                                </View>
                                <Text style={styles.newName}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    item: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a2ddfa',
        marginRight: 15,
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    info: {
        flex: 1,
    },
    preview: {
        color: '#666',
        fontSize: 14,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007BFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        flex: 1,
        marginTop: 100,
        backgroundColor: 'white',
        padding: 20,
    },
    iconText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    newChat: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    newName: {
        marginLeft: 15,
        fontSize: 16,
    },
});

export default ChatList;
