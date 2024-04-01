import { shallowMount } from "@vue/test-utils";
import { vi } from "vitest";

import GetLocation from "../GetLocation.vue";

describe("GetLocation", () => {
  it("should render the component without crashing", async (): Promise<void> => {
    global.navigator.geolocation = {
      getCurrentPosition: () => {},
    };
    const wrapper = await shallowMount(GetLocation);
    expect(wrapper).toBeTruthy();
  });
  it("displays when geolocation resolved successfully", async (): Promise<void> => {
    const mockGeoLocation = vi.fn((successCallback: Function) => {
      const position = {
        coords: {
          latitude: 51,
          longitude: -0.1,
        },
      };
      successCallback(position);
    });
    global.navigator.geolocation = {
      getCurrentPosition: mockGeoLocation,
    };
    const wrapper = await shallowMount(GetLocation);
    expect(wrapper.vm.coords).toEqual({
      latitude: 51,
      longitude: -0.1,
    });
  });
  it("displays a message when user denied access", async (): Promise<void> => {
    const mockGeoLocation = vi.fn(
      (successCallback: Function, errorCallback: Function) => {
        const error = new Error("User denied geolocation access");
        errorCallback(error);
      }
    );
    global.navigator.geolocation = {
      getCurrentPosition: mockGeoLocation,
    };
    const wrapper = await shallowMount(GetLocation);
    expect(wrapper.vm.geolocationBlockedByUser).toEqual(true);
    expect(wrapper.html()).toContain("User denied access");
  });
});
