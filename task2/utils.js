//Functions:

//Функия выбора количества отображаемых объявлений
async function selectItemsQuantity(num, page, expect) {
  await page.locator('//*[@id="menu-button-:r5:"]').click();
  await page.locator(`button:has-text("${num}")`).click();
}

//Функция проверки отображения объявлений
async function assertItemsDisplayed(num, page, expect) {
  await page.waitForSelector(`button:has-text("Items on page:")`);

  await expect(page.locator('//*[@id="menu-button-:r5:"]')).toHaveText(
    `Items on page: ${num}`
  );

  await page.waitForSelector(`//*[@class="css-1w07v7s"]/div[${num}]`);
  let adverts = await page.locator('//*[@class="css-1w07v7s"]/div');
  let advertsCount = await adverts.count();

  await expect(advertsCount).toBe(num);
}



export { selectItemsQuantity, assertItemsDisplayed };
