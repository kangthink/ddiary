// diet.ts
import { nanoid } from "nanoid";
import { failure, Result } from "../../common/result";
// types
export type Ddate = string;

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

// helper functions
function now(): Ddate {
  return new Date().toString();
}

function createId(): string {
  return nanoid();
}

function foodFromLiteral(foodLiteral: string): Food[] | null {
  const delimeter = "&";
  const tagDelimeter = ";";

  const _foods = foodLiteral.split(delimeter);
  const maybeFoods = _foods.map((_food) => {
    const [name, volume, rating] = _food.split(tagDelimeter);

    const food: Food = {
      name,
      volume,
      rating: parseInt(rating),
    };
    return food;
  });

  maybeFoods.forEach((maybeFood) => {
    if (!maybeFood.name || !maybeFood.volume || !maybeFood.rating) {
      return null;
    }
  });

  return maybeFoods;
}

// methods
export function fromInput(input: any): Result {
  const foodsOrNull = foodFromLiteral(input.foodLiteral);
  if (!foodsOrNull) {
    return failure("No Given Food");
  }

  const diet: Diet = {
    id: createId(),
    eatenAt: input.eatenAt,
    createdAt: now(),
    eatenBy: input.eatenBy,
    foods: foodsOrNull,
  };

  return {
    isSuccess: true,
    value: diet,
    error: null,
  };
}
