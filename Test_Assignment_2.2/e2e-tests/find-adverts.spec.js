import { expect, test } from "@playwright/test";
import { getLastCreatedAdName, pagePaginationData } from "../testData";
import { selectItemsQuantity, assertItemsDisplayed } from "../utils";




//Поиск объявления по имени

test('Find an advert by name', async ({ page }) => {
 

  await page.goto('/');
 
  
  await page.locator('input[placeholder="Поиск по объявлениям"]').fill(getLastCreatedAdName());
  await page.locator('button:has-text("Найти")').click();


  await page.waitForSelector(`h4:has-text("${getLastCreatedAdName()}")`);
  let adIsVisible = await page.locator(`h4:has-text("${getLastCreatedAdName()}")`).isVisible();

  expect(adIsVisible).toBeTruthy();
  await expect(page.locator('p:has-text("Найдено:")')).toHaveText('Найдено: 1')
});





//Функции сортровки

test.describe('Sorting functionality', async() =>{

  test.beforeEach(async ({ page }) =>{
    await page.goto('/');
  });


  //Изменение количества отображаемых объявлений на странице

  test("Sort adverts by items display quantity", async ({ page }) => {


  //5 items
  await assertItemsDisplayed(5, page, expect);

  //10 items
  await selectItemsQuantity(10, page, expect);
  await assertItemsDisplayed(10, page, expect);

  //15 items
  await selectItemsQuantity(15, page, expect);
  await assertItemsDisplayed(15, page, expect);

  //20 items
  await selectItemsQuantity(20, page, expect);
  await assertItemsDisplayed(20,page, expect);

  //25 items
  await selectItemsQuantity(25, page, expect);
  await assertItemsDisplayed(25, page, expect);


 
});



  //Сортировка по убыванию
  test('Sorting by descending price', async ({ page }) => {

    await page.locator('button[id="menu-button-:rh:"]').click()
    await page.getByRole('menuitem', { name: 'По убыванию' }).click();
    
    //Сравниваем цены первого и последнего объявления (у последнего объявления цена должна быть ниже или равна)
    
    let firstAdPrice = await page.locator('//div[@class="css-1cickmn"][1]//div[2]').textContent();
    let lastAdPrice = await page.locator('//div[@class="css-1cickmn"][5]//div[2]').textContent();
    
    await expect(firstAdPrice >= lastAdPrice).toBeTruthy();
    
  });

 //Сортировка по возрастанию
    test('Sorting by ascending price', async ({ page }) => {
   
    await page.locator('button[id="menu-button-:rh:"]').click()
    await page.getByRole('menuitem', { name: 'По возрастанию' }).click();
    
    //Сравниваем цены первого и последнего объявления (у последнего объявления цена должна быть выше или равна)
    
    let firstAdPrice = await page.locator('//div[@class="css-1cickmn"][1]//div[2]').textContent();
    let lastAdPrice = await page.locator('//div[@class="css-1cickmn"][5]//div[2]').textContent();
   
    await expect(firstAdPrice <= lastAdPrice).toBeTruthy();
   
  });


  //Сортировка по количеству лайков

  test('Sorting by ascending and descending likes count', async ({ page }) => {
   

    await page.locator('[id="menu-button-:rc:"]').click();
    await page.getByRole('menuitem', { name: 'Лайки' }).click();
    
    //Сравниваем объекты первого объявления на странице до и после смены типа сортировки по лайкам (по возрастанию -> по убыванию)

    await page.locator('button[id="menu-button-:rh:"]').click();
    await page.getByRole('menuitem', { name: 'По возрастанию' }).click();
    
    await page.waitForTimeout(200); //Добавляем явное ожидание для сортировки

    
    let ascendingLikesFirstAd =  page.locator('//div[@class="css-1cickmn"][1]');

    await page.locator('[id="menu-button-:rh:"]').click();
    await page.getByRole('menuitem', { name: 'По убыванию' }).click();

    await page.waitForTimeout(200); //Добавляем явное ожидание для сортировки
    
    
    let descendingLikesFirstAd =  page.locator('//div[@class="css-1cickmn"][1]');

    //Если объекты первого объявления до и после сортировки совпадают - сортировка не работает.
     expect(ascendingLikesFirstAd).not.toStrictEqual(descendingLikesFirstAd);
   
  });



  //Сортировка по количеству просмотров

  test('Sorting by ascending and descending views count', async ({ page }) => {
   

    await page.locator('[id="menu-button-:rc:"]').click();
    await page.getByRole('menuitem', { name: 'Просмотры' }).click();
    
    //Сравниваем объекты первого объявления на странице до и после смены типа сортировки по просмотрам (по возрастанию -> по убыванию)

    await page.locator('button[id="menu-button-:rh:"]').click();
    await page.getByRole('menuitem', { name: 'По возрастанию' }).click();
    
    await page.waitForTimeout(200); //Добавляем явное ожидание для сортировки

    
    let ascendingViewsFirstAd =  page.locator('//div[@class="css-1cickmn"][1]');

    await page.locator('[id="menu-button-:rh:"]').click();
    await page.getByRole('menuitem', { name: 'По убыванию' }).click();

    await page.waitForTimeout(200); //Добавляем явное ожидание для сортировки
    
    
    let descendingViewsFirstAd =  page.locator('//div[@class="css-1cickmn"][1]');

    //Если объекты первого объявления до и после сортировки совпадают - сортировка не работает.
     expect(ascendingViewsFirstAd).not.toStrictEqual(descendingViewsFirstAd);
   
  });
  
});

//Функционал смены страниц

test.describe('Page controls functionality', () => {

  test.beforeEach(async ({page}) => {
    await page.goto('/');
  });


  //Тест кнопок "Следующая", "Предыдущая" для смены страниц

  test('Change page test', async ({page}) => {
    
    //Проверяем совпадает ли первое объявление начальной страницы с первым объявлением следующей

    let firstPageAd = await page.locator('//div[@class="css-1cickmn"][1]//div/div/div[1]/h4').textContent(); 

    await page.getByRole('button', { name: 'Следующая' }).click();
    await page.waitForTimeout(1000); //Добавляем явное ожидание, чтобы страница полностью прогрузилась

    let currentPageAd = await page.locator('//div[@class="css-1cickmn"][1]//div/div/div[1]/h4').textContent(); 
   
     expect(page.url()).toContain('page=2') //Проверяем, что url совпадает со второй страницей каталога
     expect(firstPageAd).not.toEqual(currentPageAd);;
    
    //Проверяем совпадает ли первое объявление начальной страницы с первым объявлением при возвращении на страницу назад
    
    await page.getByRole('button', { name: 'Предыдущая' }).click();
    await page.waitForTimeout(1000); //Добавляем явное ожидание, чтобы страница полностью прогрузилась
    
    currentPageAd = await page.locator('//div[@class="css-1cickmn"][1]//div/div/div[1]/h4').textContent()
    
     expect(page.url()).toContain('page=1') //Проверяем, что url совпадает с первой страницей каталога
    expect(firstPageAd).toEqual(currentPageAd);;
  })
  
  //Тестирование смены страниц после поиска объявлений по имени

  test('Next page after searching by name', async ({page}) => {

  


    //Выполняем поиск предварительно созданного объявления по имени 
    await page.getByRole('textbox', { name: 'Поиск по объявлениям' }).click();
    await page.getByRole('textbox', { name: 'Поиск по объявлениям' }).fill(pagePaginationData.adName); 
    await page.getByRole('button', { name: 'Найти' }).click();

    await page.waitForURL('/?q=page+test') 
    let advertsOnPageCount = await page.locator('//div/div[@class="css-1cickmn"]').count();
    expect(advertsOnPageCount).toBe(5);;

    await page.getByRole('button', { name: 'Следующая' }).click();
    await page.waitForTimeout(1000); //Добавляем явное ожидание, чтобы страница полностью прогрузилась
    advertsOnPageCount = await page.locator('//div/div[@class="css-1cickmn"]').count();
   
    

    await expect(page.getByRole('button', { name: 'Следующая' })).toBeDisabled();
    expect(advertsOnPageCount).toBeLessThan(5);
  })
 
})








