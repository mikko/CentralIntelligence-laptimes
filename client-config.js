const fs = require('fs');

module.exports = {
    name: 'laptimes racing',
    serverHost: process.env.SERVER_HOST || 'localhost',
    serverPort: process.env.SERVER_PORT || 3000,
    myHost: process.env.MY_HOST || 'localhost',
    myPort: process.env.MY_PORT || 3005,
    authKey: process.env.AUTH_KEY || fs.readFileSync('/run/secrets/authkey', { encoding: 'utf-8' }).trim(),
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
