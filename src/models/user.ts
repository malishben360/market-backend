import mongoose from 'mongoose';

//create user schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    }
});

//Expose the User Model for external access
export const UserModel = mongoose.model('User', UserSchema);

//Expose CRUD function of mongoosejs for user model
export const getUsers = () => UserModel.find();
export const getUserById = (id: string) => UserModel.findById(id);
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken
});
export const createUser = (values: Record<string, any>) => new UserModel(values)
.save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({
    _id: id
});
export const updateUserById = (id: string, values: Record<string, any>) => {
    const filter = {_id: id};
    const update = { ...values };
    return UserModel.findOneAndUpdate(filter, update);
};