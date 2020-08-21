import BaseDB from "./BaseDatabase";


export default class RecipeDatabase extends BaseDB {
  public async newRecipe(
    id: string,
    title: string, 
    description: string,
    date: string,
    user_id: string
  ): Promise<void> {
    await this.makeConnection().insert({
      id,
      title,
      description,
      date,
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