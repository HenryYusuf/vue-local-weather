import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";

import GetLocation from "./components/GetLocation.vue";
import App from "./App.vue";
describe("App", (): void => {
  it("renders the GetLocation component", (): void => {
    const wrapper = shallowMount(App);
    expect(wrapper.findComponent(GetLocation).exists()).toBe(true);
  });
});
