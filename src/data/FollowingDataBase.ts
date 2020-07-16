import { BaseDatabase } from "./BaseDatabase";

// Classe que estabelece a ligação com o banco de dados, especificamente a tabela following.
// Se você olhar a tabela, vai ver que ela tem duas foreign keys, que são o id do usuário,
// e o id de quem ele segue. Ambas fazem referências a ids dos usuários na tabalea Cookenu_Users.
// Essa fução simplesmente faz um insert de uma linha com os dois ids associados.
export class FollowingDataBase extends BaseDatabase {
  public async follow(followerId: string, followedId: string): Promise<void> {
    await this.getConnection().raw(`
    INSERT INTO following VALUES("c8fd27d3-5ce4-4d30-ae7d-86dfd2868469", "609648e3-fb63-4fab-881e-270bc08a5f48")
    `);
  }
}
