import type { Result } from "../../common/result";
import type { Repo } from "../repo";
import * as diet from "../entity/diet";

export class CreateDiet {
  private repo: Repo;
  constructor(repo: Repo) {
    this.repo = repo;
  }

  exec(input: any): Result {
    const result = diet.fromInput(input);
    if (!result.isSuccess) {
      return result.error;
    }
    return this.repo.save(result.value);
  }
}
