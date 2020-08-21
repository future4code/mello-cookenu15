import BaseDB from "./BaseDatabase";
import moment from "moment"
import IdGenerator from "../services/IdGenerator";


export default class RecipeDatabase extends BaseDB {
  public async newRecipe(
    title: string, 
    description: string, 
    user_id: string
  ): Promise<void> {
    await this.makeConnection().insert({
      id: IdGenerator.execute(),
      title,
      description,
      date: moment().format("YYYY/MM/DD"),
      user_id
    }).into("recipe")
  }

  public async getRecipeById(id: string): Promise<any> {
    const recipe = await this.makeConnection().raw(`
      SELECT * FROM recipe
      WHERE id = "${id}"
    `)
    return recipe[0][0]
  }
}