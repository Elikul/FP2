let browser = require("webextension-polyfill");

/**
 * Создать панель в Devtools
 */
window.addEventListener("load", async () => {
    await browser.devtools.panels.create("Tester assistant", "icons/page-16.png", "panel.html");
});
