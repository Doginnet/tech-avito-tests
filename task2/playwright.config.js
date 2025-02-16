
// Это базовый файл конфигурации для Playwright

export default {
  testDir: './e2e-tests',
  workers: 1,
    use: {
      baseURL: "http://tech-avito-intern.jumpingcrab.com/advertisements", // базовый URL тестируемого сайта
      headless: true,   // тесты будут запускаться в headless-режиме (без открытия браузерного окна)
      viewport: { width: 1280, height: 720 },
      actionTimeout: 5000, // таймаут для ожидания действий
    },
    timeout: 30000,      // общий таймаут для теста
    retries: 0,          // число повторов при провале теста (можно увеличить, если требуется)
  };

  