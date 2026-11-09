import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockEnv } = vi.hoisted(() => ({
  mockEnv: {
    siteUrl: "https://servicehubmaster.com",
    gaMeasurementId: undefined as string | undefined,
    bookingWebhookUrl: "" as string | undefined,
    contactWebhookUrl: "" as string | undefined,
  },
}));

vi.mock("../env", () => ({ env: mockEnv }));

import { submitBookingRequest, submitContactRequest } from "./submissions";

const booking = {
  name: "Іван Петренко",
  phone: "0671050555",
  service: "Мийка",
  consent: true,
  consentAt: "2026-11-09T10:00:00.000Z",
};

const contact = {
  name: "Іван",
  phone: "",
  email: "ivan@example.com",
  message: "Питання щодо полірування кузова",
  consent: true,
  consentAt: "2026-11-09T10:00:00.000Z",
};

const response = (status: number) => ({ ok: status >= 200 && status < 300, status }) as Response;

beforeEach(() => {
  mockEnv.bookingWebhookUrl = "";
  mockEnv.contactWebhookUrl = "";
  vi.stubGlobal("window", { location: { href: "https://servicehubmaster.com/" } });
  vi.stubGlobal("navigator", { userAgent: "vitest" });
  vi.stubGlobal("document", { referrer: "" });
  vi.unstubAllGlobals();
  vi.stubGlobal("window", { location: { href: "https://servicehubmaster.com/" } });
  vi.stubGlobal("navigator", { userAgent: "vitest" });
  vi.stubGlobal("document", { referrer: "" });
});

describe("submitBookingRequest", () => {
  it("falls back to WhatsApp when no webhook is configured", async () => {
    const result = await submitBookingRequest(booking);

    expect(result.channel).toBe("whatsapp");
    if (result.channel === "whatsapp") {
      expect(result.url).toContain("https://wa.me/380671050555");
      expect(decodeURIComponent(result.url)).toContain("Іван Петренко");
    }
  });

  it("sends a webhook payload with consent metadata", async () => {
    mockEnv.bookingWebhookUrl = "https://hook.test/booking";
    const fetchMock = vi.fn().mockResolvedValue(response(200));
    vi.stubGlobal("fetch", fetchMock);

    const result = await submitBookingRequest(booking);

    expect(result.channel).toBe("webhook");
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(payload).toMatchObject({
      source: "booking-modal",
      consent: true,
      consentAt: booking.consentAt,
      consentVersion: "2026-11-09",
      service: "Мийка",
    });
  });

  it("retries once on a 5xx response", async () => {
    mockEnv.bookingWebhookUrl = "https://hook.test/booking";
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(response(503))
      .mockResolvedValueOnce(response(200));
    vi.stubGlobal("fetch", fetchMock);

    const result = await submitBookingRequest(booking);

    expect(result.channel).toBe("webhook");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("does not retry 4xx and surfaces the status", async () => {
    mockEnv.bookingWebhookUrl = "https://hook.test/booking";
    const fetchMock = vi.fn().mockResolvedValue(response(422));
    vi.stubGlobal("fetch", fetchMock);

    await expect(submitBookingRequest(booking)).rejects.toThrow("422");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("reports a network failure after two attempts", async () => {
    mockEnv.bookingWebhookUrl = "https://hook.test/booking";
    const fetchMock = vi.fn().mockRejectedValue(new Error("offline"));
    vi.stubGlobal("fetch", fetchMock);

    await expect(submitBookingRequest(booking)).rejects.toThrow("зв'язатися із сервером");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

describe("submitContactRequest", () => {
  it("falls back to WhatsApp with the message", async () => {
    const result = await submitContactRequest(contact);

    expect(result.channel).toBe("whatsapp");
    if (result.channel === "whatsapp") {
      expect(decodeURIComponent(result.url)).toContain("ivan@example.com");
    }
  });

  it("uses the contact webhook when configured", async () => {
    mockEnv.contactWebhookUrl = "https://hook.test/contact";
    const fetchMock = vi.fn().mockResolvedValue(response(200));
    vi.stubGlobal("fetch", fetchMock);

    await expect(submitContactRequest(contact)).resolves.toEqual({ channel: "webhook" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
