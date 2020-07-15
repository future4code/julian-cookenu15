import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public async createUser(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        name,
        email,
        password
      })
      .into("Cookenu_Users");

    BaseDatabase.destroyConnection();
  }

  public async userInfo(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from("Cookenu_Users")
      .where({ email });

    BaseDatabase.destroyConnection();
    return result[0];
  }

  public async getUserById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from("Cookenu_Users")
      .where({ id });

    BaseDatabase.destroyConnection();
    return result[0];
  }

  public async deleteUser(id: string): Promise<void> {
    await this.getConnection().raw(`
    DELETE FROM Cookenu_Users WHERE id = "${id}"`);

    BaseDatabase.destroyConnection();
  }

  public async getInfoById(id: string): Promise<any> {
    const info = await this.getConnection().raw(`
    SELECT id, email FROM Cookenu_Users WHERE id = "${id}"`);

    return info[0];
  }
}
