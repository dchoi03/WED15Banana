type Msg = { sender: string; text: string; timestamp: string };

const data = {
    users: [
        { id: 1, name: 'Tony Stark' },
        { id: 2, name: 'Hulk' },
        { id: 3, name: 'Natasha Romanoff' },
        { id: 4, name: 'Thor' },
    ],
    messages: {
        1: [
            { sender: 'Tony Stark', text: 'Do you want a shawarma?', timestamp: '2024-11-17T14:30:00Z' },
            { sender: 'You', text: 'No!', timestamp: '2024-11-17T14:32:00Z' },
        ],
        2: [
            { sender: 'Hulk', text: 'smash smash smash', timestamp: '2024-11-17T13:00:00Z' },
        ],
        3: [],
        4: [],
    },
};

export default data;
