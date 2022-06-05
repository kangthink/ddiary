import type { Result } from "../../common/result";
import type { Repo } from "../repo";
import { Ddate } from "../../common/ddate";

export type Query = {
  condition: "TODAY" | "WEEK" | "MONTH" | "ALL";
  ddate: Ddate;
};
export class QueryDiet {
  private repo: Repo;
  constructor(repo: Repo) {
    this.repo = repo;
  }

  exec(query: Query): Result {
    switch (query.condition) {
      case "TODAY":
        return this.repo.findByDdateSameToday(query.ddate);
      case "WEEK":
        return this.repo.findByDdateSameWeek(query.ddate);
      case "MONTH":
        return this.repo.findByDdateSameMonth(query.ddate);
      case "ALL":
        return this.repo.all();
    }
  }
}
