const Client = require('ci-client');
const Moment = require('moment');
const clientConfig = require('./client-config.js');
const laptimesConfig = require('./config');
const request = require('request');

const CONSTANTS = {
    LEADERBOARDS: '/v1/leaderboard',
    GAMES: '/v1/game',
    PLAYERS: '/v1/player'
};

const client = new Client(clientConfig)

const actions = {
    leaderboard: 'leaderboard',
    addRecord: 'addRecord'
};

const timeToString = time => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time - (minutes * 60000)) / 1000);
    const millis = time % 1000;

    const minStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const milStr = millis < 10 ? `00${millis}` : millis < 100 ? `0${millis}` : `${millis}`;

    return `${minStr}:${secStr}.${milStr}`;
};

const getEntities = (type, cb) => {
    request.get(`http://${laptimesConfig.laptimesHost}${type}`, (err, response) => {
        if (err) {
            console.log(err);
            reply('Some problem with laptimes service');
            return;
        }
        const body = JSON.parse(response.body);
        cb(body);
    });
};

const messageReceiver = (action, message, context, reply, prompt) => {
    const race = context.race;
    const raceName = context.raceName;
    const time = context.raceTime;

    if (action === 'leaderboard') {
        if (!race) {
            request.get(`http://${laptimesConfig.laptimesHost}${CONSTANTS.LEADERBOARDS}`, (err, response) => {
                if (err) {
                    console.log(err);
                    reply('Could not get current leaderboards');
                    return;
                }
                const body = JSON.parse(response.body);
                const leaderboards = [{track: 'All leaderboards'}, ...body.leaderboards];
                prompt(`Which leaderboard would you like to see`, 'race', leaderboards.map(lb => `${lb.track}`));
            });
        } else {
            request.get(`http://${laptimesConfig.laptimesHost}${CONSTANTS.LEADERBOARDS}`, (err, response) => {
                if (err) {
                    console.log(err);
                    reply('Could not get current leaderboards');
                    return;
                }
                const body = JSON.parse(response.body);
                const leaderboards = body.leaderboards;

                if (race === 'all') {
                    const msg = leaderboards.map(lb => {
                        const header = `${lb.game} ${lb.track} ${lb.car}`;
                        const results = lb.records.map((rec, i) => `${i}.${i < 10 ? '  ' : ' '}${timeToString(rec.time)}   ${rec.name}`).join('\n')
                        return `${header}\n${results}`;
                    }).join('\n\n');
                    reply(msg);
                }
                else {
                    const leaderboard = leaderboards.find(lb => lb.track === race);
                    const header = `${leaderboard.game} ${leaderboard.track} ${leaderboard.car}`;
                    const results = leaderboard.records.map((rec, i) => `${i}.${i < 10 ? '  ' : ' '}${timeToString(rec.time)}   ${rec.name}`).join('\n')
                    reply(`${header}\n${results}`);
                }
            });
        }
    } else if (action === 'addRecord') {

        if (!race) {
            getEntities(CONSTANTS.LEADERBOARDS, response => {
                const races = response.leaderboards.map(lb => lb.track);
                prompt(`Which race would you like to add an entry to`, 'race', races);
            });
        } else if (!raceName) {
            getEntities(CONSTANTS.PLAYERS, response => {
                prompt(`Adding entry for ${race}\nWho is your racing identity`, 'raceName', response.players.map(p => p.name));
            });
        } else if (!time) {
            prompt(`Adding entry for ${race} ${raceName}\nWhat was your laptime`, 'raceTime');
        } else {
            reply(`TODO: Could be adding new record now for ${race} ${raceName} ${time}`);
        }
    }
    //reply(action + ' ' + message);
};

client.setReceiver(messageReceiver);
