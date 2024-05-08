const sum = require("./sum");

test("sum(1, 2) should equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("sum(1, 3) should equal 3", () => {
  expect(sum(1, 3)).toBe(3);
});
