import { expect, test } from "@playwright/test";
import { setLastCreatedAdName, getLastCreatedAdName } from "../testData.js";

const lastCreatedAdName = getLastCreatedAdName();

test('Edit an advert', async ({ page }) => {

  await page.goto('/');
  await page.locator('input[placeholder="Поиск по объявлениям"]').fill(lastCreatedAdName);
  await page.locator('button:has-text("Найти")').click();

 
  await page.waitForSelector(`h4:has-text("${lastCreatedAdName}")`);
  await page.locator(`h4:has-text("${lastCreatedAdName}")`).click();

  await page.locator('div.chakra-container > div > svg').click();

  await page.waitForSelector('textarea[name="description"]') //Ожидаем прогрузки любой из полей формы (TODO: протестить неявное ожидание плейрайта)
  
  //Очищаем все поля
  await page.locator('textarea[name="description"]').clear();
  await page.locator('input[name="name"]').clear();
  await page.locator('input[name="imageUrl"]').clear();
  await page.locator('input[name="price"]').clear();

  let editedId = Math.floor(Math.random() * 1000);
  let editedAdName =  `Edited-Advert ${editedId}`; //создаём переменную с новым именем для упрощенного доступа
  let editedImgUrl ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdzXI1_xj7yhQo4nvtQNuPDUq7smmybBIijQ&s';



  await page.locator('textarea[name="description"]').fill('Editted Description');
  await page.locator('input[name="name"]').fill(editedAdName);
  await page.locator('input[name="price"]').fill('10'); //Любое число меньше 100 будет изменённым
  await page.locator('input[name="imageUrl"]').fill(editedImgUrl);
  
  await page.locator('div.css-nb383z > svg').click();

  
  await expect(page.locator('p:nth-child(1)')).toHaveText('Editted Description');
  await expect(page.locator('header.css-0 > p')).toHaveText('10 ₽');
  await expect(page.locator('h2')).toHaveText(editedAdName);
  await expect(page.locator('img[alt="product image"]')).toHaveAttribute('src', editedImgUrl);
  
  setLastCreatedAdName(editedAdName); 
 
});