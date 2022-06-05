import { Result, success, failure } from "../../common/result";
import { Diet } from "../entity/diet";
import { Repo } from "../repo";
import fs from "fs";
import {
  Ddate,
  isSameMonth,
  isSameToday,
  isSameWeek,
} from "../../common/ddate";

export class JsonRepo implements Repo {
  private db: { [key: string]: Diet } = {};
  private filepath: string;

  constructor(filepath: string) {
    this.filepath = filepath;
    this._createJsonIfNotExists();
  }

  save(diet: Diet): Result {
    this._loadJson();
    this.db[diet.id] = diet;
    this._saveJson();
    return success(diet.id);
  }

  delete(id: string): Result {
    this._loadJson();
    delete this.db[id];
    this._saveJson();
    return success(id);
  }

  findById(id: string): Result {
    this._loadJson();
    const found = this.db[id];
    if (!found) {
      return failure(`${id} Not found`);
    }
    return success(found);
  }

  all(): Result {
    this._loadJson();
    const diets = [];
    for (const k of Object.keys(this.db)) {
      diets.push(this.db[k]);
    }
    return success(diets);
  }

  findByDdateSameMonth(ddate: Ddate): Result {
    this._loadJson();
    const diets = [];
    for (const k of Object.keys(this.db)) {
      const diet = this.db[k];

      if (isSameMonth(ddate, diet.eatenAt)) {
        diets.push(diet);
      }
    }
    return success(diets);
  }
  findByDdateSameWeek(ddate: Ddate): Result {
    this._loadJson();
    const diets = [];
    for (const k of Object.keys(this.db)) {
      const diet = this.db[k];

      if (isSameWeek(ddate, diet.eatenAt)) {
        diets.push(diet);
      }
    }
    return success(diets);
  }
  findByDdateSameToday(ddate: Ddate): Result {
    this._loadJson();
    const diets = [];
    for (const k of Object.keys(this.db)) {
      const diet = this.db[k];

      if (isSameToday(ddate, diet.eatenAt)) {
        diets.push(diet);
      }
    }

    return success(diets);
  }

  private _createJsonIfNotExists() {
    if (!fs.existsSync(this.filepath)) {
      fs.writeFileSync(this.filepath, "{}");
    }
  }

  private _loadJson() {
    const rawdata = fs.readFileSync(this.filepath).toString();
    const db = JSON.parse(rawdata);
    this.db = db;
  }

  private _saveJson() {
    const rawdata = JSON.stringify(this.db);
    fs.writeFileSync(this.filepath, rawdata);
  }
}
