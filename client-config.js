module.exports = {
    name: 'laptimes racing',
    serverHost: 'localhost',
    serverPort: 3000,
    myHost: 'localhost',
    myPort: 3005,
    authKey: 'ASDASD', // Change this
    actions: {
        leaderboard: {
            exactPhrase: 'laptimes',
            keywords: [
                {
                    word: 'standing',
                    type: 'noun'
                },
                {
                    word: 'racing',
                    type: 'noun'
                },
                {
                    word: 'leaderboard',
                    type: 'noun'
                }
            ]
        },
        addRecord: {
            exactPhrase: 'add laptime',
            keywords: [
                {
                    word: 'add',
                    type: 'verb'
                },
                {
                    word: 'enter',
                    type: 'verb'
                },
                {
                    word: 'entry',
                    type: 'noun'
                },
                {
                    word: 'laptime',
                    type: 'noun'
                }
            ]
        }
    }
};
