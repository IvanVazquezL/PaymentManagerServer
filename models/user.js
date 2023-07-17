import { Schema, model } from 'mongoose';

const UserSchema = Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
});

UserSchema.method('toJSON', function() {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
})

const User = model('User', UserSchema);

export default User;
  
