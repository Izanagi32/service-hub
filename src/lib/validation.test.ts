import { describe, expect, it } from "vitest";
import {
  formatPhone,
  isPastSlot,
  isSunday,
  isValidEmail,
  isValidPhone,
  maxBookingDate,
  normalizePhone,
  todayIsoDate,
} from "./validation";

describe("normalizePhone", () => {
  it("keeps digits only", () => {
    expect(normalizePhone("+38 (067) 105-05-55")).toBe("380671050555");
  });
});

describe("isValidPhone", () => {
  it.each(["0671050555", "067 105 05 55", "380671050555", "+380671050555", "80671050555"])(
    "accepts %s",
    (value) => {
      expect(isValidPhone(value)).toBe(true);
    },
  );

  it.each(["123", "067105055", "06710505555", "", "abcdefghij"])("rejects %s", (value) => {
    expect(isValidPhone(value)).toBe(false);
  });
});

describe("formatPhone", () => {
  it("formats a local number", () => {
    expect(formatPhone("0671050555")).toBe("+38 (067) 105-05-55");
  });

  it("does not break short input", () => {
    expect(formatPhone("067")).toBe("+38 (067)");
  });

  it("returns non-UA input as-is", () => {
    expect(formatPhone("+1 555 0100")).toBe("+1 555 0100");
  });
});

describe("isValidEmail", () => {
  it("accepts a normal address", () => {
    expect(isValidEmail("info@servicehubmaster.com")).toBe(true);
  });

  it.each(["a@b", "a b@c.com", "@c.com", "a@.com"])("rejects %s", (value) => {
    expect(isValidEmail(value)).toBe(false);
  });
});

describe("todayIsoDate", () => {
  it("returns YYYY-MM-DD in local time", () => {
    expect(todayIsoDate()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("maxBookingDate", () => {
  it("is later than today", () => {
    expect(maxBookingDate(60) > todayIsoDate()).toBe(true);
  });
});

describe("isPastSlot", () => {
  it("treats early slots today as past", () => {
    expect(isPastSlot(todayIsoDate(), "00:00")).toBe(true);
  });

  it("does not mark slots on other days as past", () => {
    expect(isPastSlot("2099-01-01", "00:00")).toBe(false);
  });

  it("is false without a date or time", () => {
    expect(isPastSlot("", "10:00")).toBe(false);
    expect(isPastSlot(todayIsoDate(), "")).toBe(false);
  });
});

describe("isSunday", () => {
  it("detects Sunday", () => {
    expect(isSunday("2026-11-08")).toBe(true);
    expect(isSunday("2026-11-09")).toBe(false);
    expect(isSunday("")).toBe(false);
  });
});
