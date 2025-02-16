import { expect, test } from "@playwright/test";
import { setLastCreatedAdName, description, generatePrice, imgUrl } from "../testData.js";




test("Create an advert with valid data", async ({ page }) => {
  
  await page.goto('/');

  await page.locator('button:has-text("Создать")').click();
  await page.waitForSelector('xpath=//header[text()="Создать объявление"]');

  //Генерируем цену и уникальное имя объявления 
  const price = generatePrice();
  const id = `#${price}`;
  const adName = `Test-Advert ${id}`;

  //Заполняем поля формы
  await page.fill('input[name="name"]', adName);
  await page.fill('input[name="price"]', price);
  await page.fill('input[name="description"]', description);
  await page.fill('input[name="imageUrl"]', imgUrl);

  await page.locator('button:has-text("Сохранить")').click();

  await expect(page.locator('button:has-text("Сохранить")')).toBeHidden(); //Проверяем, что форма пропала (значит создание прошло успешно)
  setLastCreatedAdName(adName); //Сохраняем название объявления для последующего поиска 

});
