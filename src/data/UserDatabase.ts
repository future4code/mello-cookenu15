import BaseDB from './BaseDabase';

export default class UserDB extends BaseDB{
    static tableName = 'user';

    async createUser(
        id: string,
        email: string,
        name: string,
        password: string
    ) {
    await this.makeConnection()
        .insert({id, email, name, password})
        .into(UserDB.tableName)

    await BaseDB.destroyConnection()
    }
    
}