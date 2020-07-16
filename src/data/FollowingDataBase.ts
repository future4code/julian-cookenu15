import { BaseDatabase } from "./BaseDatabase";
import { connect } from "http2";
import { basename } from "path";

export class FollowingDataBase extends BaseDatabase {
  public async follow(followerId: string, followedId: string): Promise<void> {
    await this.getConnection()
      .insert({ followerId, followedId })
      .into("following");

    BaseDatabase.destroyConnection();
  }
}
