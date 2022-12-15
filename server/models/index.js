import User from './user.js';
import Batch from './batch.js';

User.hasMany(Batch);
Batch.belongsTo(User);

export { User, Batch };