import { foodFromLiteral } from "../diet";
import { expect } from "chai";

describe("foodFromLiteral", () => {
  describe("food literal success", () => {
    it("parses multiple foods", () => {
      const literal = "당근;1개;3&우유;1컵;2";
      const foods = foodFromLiteral(literal);
      if (foods == null) {
        expect.fail();
      }

      expect(foods).to.deep.equal([
        {
          name: "당근",
          volume: "1개",
          rating: 3,
        },
        {
          name: "우유",
          volume: "1컵",
          rating: 2,
        },
      ]);
    });
  });
  describe("food literal error", () => {
    it("ignores if all food elements are not provided", () => {
      const noRating = "당근;1개;";
      const foods1 = foodFromLiteral(noRating);
      expect(foods1).to.eql([]);

      const nameOnly = "당근";
      const foods2 = foodFromLiteral(nameOnly);
      expect(foods2).to.eql([]);
    });
  });
});
