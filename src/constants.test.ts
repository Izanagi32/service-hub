import { describe, expect, it } from "vitest";
import { getServiceBySlug, services } from "./constants";

describe("services data", () => {
  it("exposes a unique slug for every service", () => {
    const slugs = services.map((service) => service.slug);
    expect(new Set(slugs).size).toBe(services.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("finds a service by slug", () => {
    expect(getServiceBySlug("miyka")?.title).toBe("Мийка");
    expect(getServiceBySlug("rozval-shodzhennia")?.id).toBe("06");
  });

  it("returns undefined for unknown slugs", () => {
    expect(getServiceBySlug("unknown")).toBeUndefined();
    expect(getServiceBySlug(undefined)).toBeUndefined();
  });

  it("keeps prices as positive numbers", () => {
    for (const service of services) {
      expect(service.priceValue).toBeGreaterThan(0);
    }
  });
});
