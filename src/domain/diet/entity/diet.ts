// diet.ts
import os from "os";
import { Ddate, isDdate } from "../../common/ddate";
import { now } from "../../common/ddate";
import type { Result } from "../../common/result";
import { failure, success } from "../../common/result";
import { createId } from "../../common/uuid";

// types
type Food = {
  name: string;
  volume: string;
  rating: number;
};

export type Diet = {
  id: string;
  eatenAt: Ddate;
  createdAt: Ddate;
  eatenBy: string;
  foods: Food[];
};

// helper function
function currentUser(): string {
  return os.userInfo().username;
}

// methods
export function foodFromLiteral(foodLiteral: string): Food[] {
  if (!foodLiteral) {
    return [];
  }

  const foodDelimeter = "&";
  const tagDelimeter = ";";

  const _foods = foodLiteral.split(foodDelimeter);
  const maybeFoods = _foods.map((_food) => {
    const [name, volume, rating] = _food.split(tagDelimeter);

    // return null if one of food's element is empty string
    if (!name || !volume || !rating) {
      return null;
    }
    const food: Food = {
      name,
      volume,
      rating: parseInt(rating),
    };
    return food;
  });

  // filter out null value and returns foods
  const foods = [];
  for (const maybeFood of maybeFoods) {
    if (maybeFood !== null) {
      foods.push(maybeFood as Food);
    }
  }
  return foods;
}

export function fromInput(input: any): Result {
  const foodsOrNull = foodFromLiteral(input.foodLiteral);
  if (foodsOrNull === []) {
    return failure("No Given Food");
  }

  const currentDdate = now();

  // validate ddate
  if (!isDdate(input.eatenAt)) {
    return failure("[entity] Invalid ddate format");
  }

  const diet: Diet = {
    id: createId(),
    eatenAt: input.eatenAt || currentDdate,
    createdAt: currentDdate,
    eatenBy: input.eatenBy || currentUser(),
    foods: foodsOrNull,
  };

  return success(diet);
}

// formatting
export function prettyFood(food: Food): string {
  const prettyRating = (rating: number) => {
    return "★".repeat(rating);
  };

  return `${food.name} ${food.volume} ${prettyRating(food.rating)}`;
}

export function prettyDiet(diet: Diet): object {
  return {
    id: diet.id,
    eatenAt: diet.eatenAt,
    eatenBy: diet.eatenBy,
    foods: diet.foods.map((food) => prettyFood(food)).join("/"),
  };
}
