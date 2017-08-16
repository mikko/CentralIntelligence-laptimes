module.exports = {
    name: 'laptimes racing',
    serverHost: 'localhost',
    serverPort: 3000,
    myHost: 'localhost',
    myPort: 3005,
    authKey: '', // Change this
    actions: {
        leaderboard: {
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
                    word: 'time',
                    type: 'noun'
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
