const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

async function expectAccessible(page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(
    results.violations.map(({ id, impact, nodes }) => ({
      id,
      impact,
      elements: nodes.map(({ target, failureSummary }) => ({
        target,
        failureSummary,
      })),
    }))
  ).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("has accessible landmarks, headings, and default content", async ({
  page,
}) => {
  await expect(page.getByRole("banner").first()).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 1, name: "Welcome to My Cyber Desktop" })
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "About and projects" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Night" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  await expectAccessible(page);
});

test("theme buttons announce the selected theme", async ({ page }) => {
  await page.getByRole("button", { name: "Day" }).click();

  await expect(page.getByRole("button", { name: "Day" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
  await expect(page.getByRole("button", { name: "Night" })).toHaveAttribute(
    "aria-pressed",
    "false"
  );
  await expect(page.locator("html")).toHaveAttribute("data-theme", "day");
});

test("Code Club resources can be opened and closed with focus restored", async ({
  page,
}) => {
  const openButton = page.getByRole("button", {
    name: "Code Club",
    exact: true,
  });
  await openButton.click();

  const resources = page.getByRole("region", { name: "Code Club Resources" });
  await expect(resources).toBeVisible();
  await expect(openButton).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("button", { name: "Close Code Club Resources" })
  ).toBeFocused();
  await expectAccessible(page);

  await page.getByRole("button", { name: "Close Code Club Resources" }).click();
  await expect(resources).toBeHidden();
  await expect(openButton).toHaveAttribute("aria-expanded", "false");
  await expect(openButton).toBeFocused();
});

test("secret message is a keyboard-dismissible modal dialog", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Click Me" }).click();

  const dialog = page.getByRole("dialog", { name: "SYSTEM MESSAGE" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close" })).toBeFocused();
  await expectAccessible(page);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page.getByRole("button", { name: "Click Me" })).toBeFocused();
});

test("stacks content without horizontal overflow on narrow screens", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });

  const dimensions = await page.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    pageWidth: document.documentElement.scrollWidth,
    cardRects: [...document.querySelectorAll(".content-window:not(.invisible)")].map(
      (card) => {
        const { left, right } = card.getBoundingClientRect();
        return { left, right };
      }
    ),
  }));

  expect(dimensions.pageWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
  expect(dimensions.cardRects.length).toBeGreaterThan(1);
  for (const rect of dimensions.cardRects) {
    expect(rect.left).toBeGreaterThanOrEqual(0);
    expect(rect.right).toBeLessThanOrEqual(dimensions.viewportWidth);
  }
});
