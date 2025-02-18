# Баг‑репорты

В данном документе описаны обнаруженные баги, выявленные при автоматизированном тестировании функционала доски объявлений.  
**Окружение:**  
- **URL:** http://tech-avito-intern.jumpingcrab.com/advertisements
- **Браузер:** Google Chrome версии 115 (рекомендуемая версия для тестирования)  
- **Платформа:** Playwright Test  
- **Режим:** Headless (для отладки можно использовать режим с графическим интерфейсом)





## Баг‑репорт 1: Некорректная сортировка по возрастанию цены


**Описание:**
При сортировке по возрастанию цены первое объявление имеет цену, превышающую цену пятого объявления

**Шаги для воспроизведения:**

1. Открыть сайт по адресу:http://tech-avito-intern.jumpingcrab.com/advertisements

2. Нажать на кнопку сортировки и выбрать опцию "По возрастанию" цены.

3. Просмотреть цены объявлений на странице: сравнить цену первого и пятого объявлений.

**Ожидаемый результат:**
Цены должны быть отсортированы по возрастанию – то есть цена первого объявления должна быть минимальной, а цена пятого – максимальной среди отображённых.

**Фактический результат:**
Цена первого объявления выше последнего на странице, при условии, что на странице присутствует как минимум два объявления с разными ценами. 
Таким образом, сортировка не соответствует ожидаемому порядку.
---


## Баг‑репорт 2: Сортировка по лайкам не изменяет порядок объявлений


**Описание:**
Пользователь выбирает сортировку по лайкам с опциями "По возрастанию" и затем "По убыванию". Ожидается, что порядок объявлений изменится (то есть первое объявление до и после сортировки должны отличаться). Однако, наблюдается, что порядок первого объявления остается неизменным, что свидетельствует о некорректной работе сортировки по лайкам.

**Шаги для воспроизведения:**

1. Открыть сайт по адресу:http://tech-avito-intern.jumpingcrab.com/advertisements

2. Нажать на кнопку сортировки и выбрать сортировку по лайкам.

3. Выбрать опцию "По возрастанию" и зафиксировать данные первого объявления.

4. Затем выбрать опцию "По убыванию" и сравнить данные первого объявления с предыдущим.

**Ожидаемый результат:**
Порядок объявлений должен измениться, и первое объявление после смены сортировки (по убыванию) должно отличаться от первого объявления при сортировке по возрастанию.

**Фактический результат:**
Первое объявление до и после смены сортировки по лайкам совпадает, сортировка не работает корректно.
---


## Баг‑репорт 3: Сортировка по просмотрам не изменяет порядок объявлений


**Описание:**
При выборе сортировки по просмотрам (сначала по возрастанию, затем по убыванию) ожидается изменение порядка объявлений на странице. Однако, наблюдается, что первое объявление остается тем же при смене сортировки, что свидетельствует о том, что сортировка по просмотрам не работает.

**Шаги для воспроизведения:**

1. Открыть сайт по адресу:http://tech-avito-intern.jumpingcrab.com/advertisements

2. Выбрать сортировку по просмотрам, сначала "По возрастанию", и зафиксировать данные первого объявления.

3. Затем выбрать сортировку "По убыванию" и сравнить данные первого объявления с предыдущими.

**Ожидаемый результат:**
Порядок объявлений должен измениться – первое объявление при сортировке по убыванию должно отличаться от первого при сортировке по возрастанию.

**Фактический результат:**
Порядок первого объявления не меняется, что указывает на ошибку в сортировке по просмотрам.
---


## Баг‑репорт 4: Неверная работа кнопки "Следующая" после поиска


**Описание:**
После выполнения поиска по заданному имени объявления, на первой странице отображается 5 объявлений. При переходе на следующую страницу, ожидается, что кнопка "Следующая" станет неактивной (так как больше страниц нет) и количество объявлений на второй странице будет меньше 5. Однако кнопка остается активной, и тест зафиксировал несоответствие количества объявлений.

**Шаги для воспроизведения:**

1. Открыть главную страницу сайта: http://tech-avito-intern.jumpingcrab.com/advertisements.

2. В поле поиска ввести имя объявления (например, из файла testData: page test) и нажать кнопку "Найти".

3. Убедиться, что на первой странице отображается ровно 5 объявлений.

4. Нажать кнопку "Следующая" для перехода на вторую страницу результатов поиска.

5. Проверить, что кнопка "Следующая" деактивирована и что количество объявлений на второй странице меньше 5.

**Ожидаемый результат:**

- После перехода на вторую страницу кнопка "Следующая" должна быть деактивирована.

- Количество объявлений на второй странице должно быть меньше 5.

**Фактический результат:**

- Кнопка "Следующая" остаётся активной.

- Количество объявлений на следующей странице превышает ожидаемое значение.

---


