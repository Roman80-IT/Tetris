**`document.querySelector('.tetris').append(div);`**

означає, що створений елемент `div` додається до елемента з класом `tetris` в **DOM**.<br>

Детальніше:

`document`: Об'єкт, що представляє весь **HTML-документ**. Він надає доступ до елементів сторінки і дозволяє маніпулювати ними.<br>
`querySelector('.tetris')`: Метод об'єкта `document`, який повертає перший елемент, що відповідає CSS-селектору. У цьому випадку це перший елемент з класом `tetris`.<br>
`.append(div)`: Метод, який додає (вставляє) вказаний елемент (`div`) як останню дитину до вибраного елемента.<br>

Таким чином, весь запис виконує наступні дії:

Використовує `document.querySelector('.tetris')` для вибору першого елемента з класом `tetris` в документі.
Додає створений елемент div як останню дитину вибраного елемента з класом `tetris`.

**_Приклад HTML-документа і застосування цього коду:_**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Example</title>
  </head>
  <body>
    <div class="tetris"></div>

    <script>
      // JavaScript code
      const div = document.createElement("div"); // Створюється новий елемент <div>
      div.textContent = "New Tetris Block"; // Додається текст в елемент <div>
      document.querySelector(".tetris").append(div); // Додається новий <div> до елемента з класом "tetris"
    </script>
  </body>
</html>
```

Після виконання цього коду, **HTML-структура** буде виглядати так:

```html
<div class="tetris">
  <div>New Tetris Block</div>
</div>
```

Отже, новий div з текстом `"New Tetris Block"` додається всередину елемента з класом `tetris`.
