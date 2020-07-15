import knex from "knex";
import { BaseDatabase } from "./BaseDatabase";
import { USER_ROLES } from "../services/Authenticator";

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
      .into("User");

    BaseDatabase.destroyConnection();
  }

  public async userInfo(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from("User")
      .where({ email });

    BaseDatabase.destroyConnection();
    return result[0];
  }

  public async getUserById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from("User")
      .where({ id });

    BaseDatabase.destroyConnection();
    return result[0];
  }

  public async deleteUser(id: string): Promise<void> {
    await this.getConnection().raw(`
    DELETE FROM User WHERE id = "${id}"`);

    BaseDatabase.destroyConnection();
  }

  public async getInfoById(id: string): Promise<any> {
    const info = await this.getConnection().raw(`
    SELECT id, email FROM User WHERE id = "${id}"`);

    return info[0];
  }
}
