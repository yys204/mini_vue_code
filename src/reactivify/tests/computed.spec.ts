import { computed } from "../computed";
import { reactive } from "../reactive";

describe("computed", () => {
  it("should return updated value", () => {
    const user = reactive({
      age: 1,
    });
    const cValue = computed(() => user.age);
    expect(cValue.value).toBe(1);
  });
  it("should return cached value", () => {
    const user = reactive({
      age: 1,
    });
    const getter = jest.fn(() => user.age);
    const cValue = computed(getter);
    expect(getter).not.toHaveBeenCalled();
    expect(cValue.value).toBe(1);
    expect(getter).toHaveBeenCalledTimes(1);
    cValue.value;
    expect(getter).toHaveBeenCalledTimes(1);
    user.age = 2;
    expect(getter).toHaveBeenCalledTimes(1);
  });
});
