import BaseDB from './BaseDatabase';

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
    };

    public async loginUser(email: string): Promise<any>{
        const result = await this.makeConnection()
        .select('*')
        .from(UserDB.tableName)
        .where({email})

        return result[0]
    }

    public async followUser(userId: string, idToFollow: string): Promise<void> {
        await this.makeConnection()
        .insert({user_id: userId, id_to_follow: idToFollow})
        .into("follow")
    }

    
}