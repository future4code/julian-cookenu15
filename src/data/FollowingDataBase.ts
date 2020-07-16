import { BaseDatabase } from "./BaseDatabase";

export class FollowingDataBase extends BaseDatabase {
  public async follow(followerId: string, followedId: string): Promise<void> {
    await this.getConnection().raw(`
    INSERT INTO following VALUES("c8fd27d3-5ce4-4d30-ae7d-86dfd2868469", "609648e3-fb63-4fab-881e-270bc08a5f48")
    `);
  }
}
