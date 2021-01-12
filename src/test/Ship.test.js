import "@testing-library/jest-dom";
import Ship from "../components/Ship";
it("Hits the ship at position 3", () => {
  expect(
    (() => {
      const ship = Ship({ index: 4 });
      ship.hit(2);
      console.log(ship.shipBody);
      return ship.shipBody;
    })()
  ).toBe([1, 1, 0, 1]);
});
