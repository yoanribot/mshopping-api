import { createDB } from './controller';

createDB()
.then(() => {
    console.log('DB running ...');
}).catch((err) => {
    console.error(err);
});