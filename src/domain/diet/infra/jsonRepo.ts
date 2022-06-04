import { Result, success, failure } from "../../common/result";
import { Diet } from "../entity/diet";
import { Repo } from "../repo";
import fs from "fs";

export class JsonRepo implements Repo {
  private db: any;
  private filepath: string;

  constructor(filepath: string) {
    this.filepath = filepath;
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
    this._saveJson();
    return success(found);
  }

  findByDDate(ddate: string): Result {
    return failure("Not Implemented");
  }

  _loadJson() {
    const rawdata = fs.readFileSync(this.filepath).toString();
    const db = JSON.parse(rawdata);
    this.db = db;
  }

  _saveJson() {
    const rawdata = JSON.stringify(this.db);
    fs.writeFileSync(this.filepath, rawdata);
  }
}
