import BaseDB from './BaseDatabase';
import moment from "moment"

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

    public async userProfile(id: string): Promise<any> {
        const result = await this.makeConnection()
        .select("*")
        .from(UserDB.tableName)
        .where({id})

        return result[0]
    }
      
    public async followUser(userId: string, idToFollow: string): Promise<void> {
        await this.makeConnection()
        .insert({user_id: userId, id_to_follow: idToFollow})
        .into("follow")
    }

    public async unfollowUser(
        userId: string, 
        followingId: string
    ): Promise<void> {
        await this.makeConnection().raw(`
            DELETE FROM follow WHERE user_id = "${userId}"
            AND id_to_follow = "${followingId}";
        `)
    } 

    public async getRecipesFeed(): Promise<any> {
        const feed = await this.makeConnection().raw(`
            SELECT r.id, r.title, r.description, r.date, u.id, u.name 
            FROM recipe r JOIN user u WHERE user_id = u.id
        `)
        
        for(const feeds of feed[0]) {
            feeds.date = moment(feeds.date, "YYYY/MM/DD").format("DD/MM/YYYY")
        }
        
        return feed[0]
    }
}