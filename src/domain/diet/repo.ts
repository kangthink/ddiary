import { Result } from "../common/result";
import { Ddate, Diet } from "./entity/diet";

export type Repo = {
  save: (diet: Diet) => Result;
  delete: (id: string) => Result;
  findById: (id: string) => Result;
  findByDDate: (ddate: Ddate) => Result;
};
