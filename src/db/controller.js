import mongoController from './mongo';
import { ObjectID } from 'mongodb';

const { getDatabase, startDatabase } = mongoController;

async function createDB() {
    await startDatabase();
}

async function getDB() {
    const database = await getDatabase();

    return database;
}

async function findByAuthId(collectionName, auth0Id) {
    const database = await getDatabase();
    return await database.collection(collectionName).findOne({ auth0_user_id: auth0Id });
}

async function insert(collectionName, entity) {
    const database = await getDatabase();
    const { insertedId } = await database.collection(collectionName).insertOne(entity);
    return insertedId;
}

async function getAll(collectionName) {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

async function get(collectionName, id) {
    const database = await getDatabase();
    return await database.collection(collectionName).find({ _id: new ObjectID(id) }).toArray();
}

async function remove(collectionName, id) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
        _id: new ObjectID(id),
    });
}

async function update(collectionName, id, entity) {
    const database = await getDatabase();
    delete entity._id;

    const newEntity = await database.collection(collectionName).update(
        {
            _id: new ObjectID(id)
        },
        {
            $set: {
                ...entity,
            },
        },
    );

    return newEntity;
}

export default {
    createDB,
    getDB,
    findByAuthId,
    insert,
    getAll,
    get,
    update,
    remove,
};