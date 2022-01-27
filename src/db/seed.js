import dbController from './controller'

const { getDB, insert  } = dbController;

function seedUser() {
    getDB().then(async () => {
        await insert('User', { name: 'Admin' });
    });
}

export default {
    seedUser,
};