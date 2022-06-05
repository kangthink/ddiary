import type { Result } from "./domain/common/result";
import { now } from "./domain/common/ddate";
import { JsonRepo } from "./domain/diet/infra/jsonRepo";

import { Diet, prettyDiet } from "./domain/diet/entity/diet";
import { CreateDiet } from "./domain/diet/usecase/CreateDiet";
import type { Query } from "./domain/diet/usecase/QueryDiet";
import { QueryDiet } from "./domain/diet/usecase/QueryDiet";

// config commands
const { Command } = require("commander");

const diet = new Command("ddiary");
diet.description("식단 기록 CLI Application");

// init repository
const repo = new JsonRepo("./ddiary.db.json");

/**
 * Create a new diet
 *
 * ddiary diet create \
 *   --at <Ddate>
 *   --by <name>
 *   --food <food-literal>
 *
 * e.g.) ddiary create --at "2022-06-06T17:24" --by me --food "당근;1개;3&우유;2ml;3"
 *
 * What is Ddate type?
 * - looks like ISO-8601 without timezone infomartion
 * - means KST only
 *
 * What is food literal?
 * - literal format presenting food informations
 * - use `&` to present multiple foods
 * - use `;` to present food elements; <name>;<volume>;<rating>
 */
diet
  .command("create")
  .option("-a,--at <Ddate>", "식사한 날짜와 시간 (default: 현재 시간)")
  .option("-b,--by <name>", "식사한 사람 (default: 로그인된 유저)")
  .option("-f,--food <food-literal>", "식사한 음식")
  .action((opts: any) => {
    const usecase = new CreateDiet(repo);
    const input = {
      eatenAt: opts.at,
      eatenBy: opts.by,
      foodLiteral: opts.food,
    };
    const result = usecase.exec(input);
    console.log(result);
  });

// `edit`
// ddiary diet edit <id> \
// --add "당근;1개;4"
// --rm "당근"
// TODO: Implement edit command

// `delete`
// ddiary diet delete <id>
// TODO: Implement delete command

/**
 * List Diets
 *
 * ddiary diet ls [--today | --week | --month]
 *
 * e.g.) ddiary ls --today (list today's diet history)
 */
diet
  .command("ls")
  .option("--today", "오늘 기록")
  .option("--week", "이번주 기록")
  .option("--month", "이번달 기록")
  .action((opts: any) => {
    // helper functions
    const proccessResult = (result: Result) => {
      if (!result.isSuccess) {
        console.error(result.error);
      }
      const diets = result.value as Diet[];
      const view = diets.map((diet) => prettyDiet(diet));
      console.table(view);
    };

    const execUsecase = (condition: Query["condition"]) => {
      const usecase = new QueryDiet(repo);
      const query: Query = {
        condition: condition,
        ddate: now(),
      };
      const result = usecase.exec(query);
      return result;
    };

    // execute usecases
    if (opts.today) {
      const result = execUsecase("TODAY");
      proccessResult(result);
      return;
    }

    if (opts.week) {
      const result = execUsecase("WEEK");
      proccessResult(result);
      return;
    }

    if (opts.month) {
      const result = execUsecase("MONTH");
      proccessResult(result);
      return;
    }

    // all
    const result = execUsecase("ALL");
    proccessResult(result);
  });

diet.parse();
