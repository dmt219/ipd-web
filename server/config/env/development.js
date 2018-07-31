module.exports = {
    db: 'mongodb://localhost:27017/ipd',
    mailer: {
        user: 'dmt219',
        pass: 'Naruto20021997@'
    },
    facebook: {
        clientID: '1546130648820165',
        clientSecret: '8a4485e7bc78accf8e606a55c9deba72',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    google: {
        clientID: '845081013357-rhrtmerrmpc7283dqor8jdu7ktrbds7k.apps.googleusercontent.com',
        clientSecret: 'MQw-kIeXbIz4gWsxbkQTuPSh',
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    },
    sessionSecret: 'tofindamockingbird'
};