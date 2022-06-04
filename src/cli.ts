// 어떻게 상호작용할까?

import { JsonRepo } from "./domain/diet/infra/jsonRepo";
import { CreateDiet } from "./domain/diet/usecase/CreateDiet";

// ddiary diet create \
// --at <ddate> \
// --by <name> \
// --food "당근;1개;4" \
// --food "우유;2ml;3"

// ddiary diet edit <id> \
// --add-food "당근;1개;4"
// --rm-food "당근"

// --or--

// ddiary diet edit <id> \
// --add "당근;1개;4"
// --rm "당근"

// ddiary diet delete <id>

// ddiary diet ls
// ddiary diet ls --today
// ddiary diet ls --week
// ddiary diet ls --month

const { Command } = require("commander");

const diet = new Command();
diet.description("식단 기록 어플리케이션");

// init
const repo = new JsonRepo("./sample_db.json");

// create --at "ss" -b me --food "당근;1개;3&우유;2ml;3"
diet
  .command("create")
  .option("-a,--at <eaten_at>", "식사한 날짜와 시간")
  .option("-b,--by <eaten_by>", "식사한 사람")
  .option("-f,--food <food>", "식사한 음식")
  .action((opts: any) => {
    const cmd = new CreateDiet(repo);
    const input = {
      eatenAt: opts.at,
      eatenBy: opts.by,
      foodLiteral: opts.food,
    };
    const result = cmd.exec(input);
    console.log(result);
  });

diet.command("ls").action((opts: any) => {
  // repo
  // Call QueryDiet all

  console.log("모든 식단 기록 출력");
});

diet.parse();
