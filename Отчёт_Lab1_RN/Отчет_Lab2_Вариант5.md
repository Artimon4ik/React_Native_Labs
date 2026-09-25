# Отчёт по лабораторной работе №2
**Вариант 5 — Каталог рецептов**

---

## 1. Ссылка на Git-репозиторий

`https://github.com/Artimon4ik/React_Native_Labs`
---

## 2. Краткое описание API-ресурса

Endpoint: `https://dummyjson.com/recipes`
Массив в ответе: `recipes`
Пагинация: серверная, через `limit` и `skip`.

Запрос страницы:

```typescript
GET https://dummyjson.com/recipes?limit=10&skip=0
```

Ответ:
```json
{
  "recipes": [ { "id": 1, "name": "...", "image": "...", "cuisine": "Italian", "difficulty": "Easy", "rating": 4.6 } ],
  "total": 50,
  "skip": 0,
  "limit": 10
}
```

---

## 3. TypeScript-типы

```typescript
export type Recipe = {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  difficulty: string;
  rating: number;
};

type RecipesResponse = {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
};
```

---

## 4. Скриншот успешно загруженной страницы

![alt text](<Screenshot_20260926_002237_Expo Go.jpg>)

---

## 5. Скриншот второй страницы страницы

![Скриншот второй страницы](<Screenshot_20260926_003611_Expo Go.jpg>)

---
## 6. Скриншот  5 страницы(последней) 

![alt text](<Screenshot_20260926_002913_Expo Go.jpg>)
---
## 7. Объяснение цепочки setPage → render → useEffect → fetch → setItems → render

1. Нажатие «Далее →» вызывает `setPage(prev => prev + 1)`.
2. State `page` меняется → компонент перерисовывается.
3. React видит, что `page` изменился (зависимость `useEffect`), выполняет cleanup предыдущего эффекта (`controller.abort()`) и запускает эффект заново.
4. В эффекте: `loading = true`, `error = null`, считается `skip = (page - 1) * PAGE_SIZE`, формируется URL.
5. Выполняется `fetch(url, { signal: controller.signal })`.
6. Проверяется `response.ok`; при ошибке — `throw new Error`.
7. `response.json()` → `setRecipes(data.recipes)`, `setTotal(data.total)` (это и есть шаг `setItems`).
8. `finally`: `setLoading(false)`.
9. Изменение `recipes`/`loading`/`error`/`total` вызывает новый render: список карточек обновляется, `totalPages` пересчитывается из `total`, кнопки и текст «Страница X / Y» обновляются.
10. Если страница переключается повторно до завершения запроса, предыдущий `fetch` отменяется через `AbortController`, ошибка `AbortError` игнорируется в `catch`.
