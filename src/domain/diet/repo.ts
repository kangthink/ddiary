import { Result } from "../common/result";
import type { Ddate } from "../common/ddate";
import { Diet } from "./entity/diet";

export type Repo = {
  save: (diet: Diet) => Result;
  delete: (id: string) => Result;
  all: () => Result;
  findById: (id: string) => Result;
  findByDdateSameMonth: (ddate: Ddate) => Result;
  findByDdateSameWeek: (ddate: Ddate) => Result;
  findByDdateSameToday: (ddate: Ddate) => Result;
};
