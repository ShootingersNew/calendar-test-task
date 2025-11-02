# calendar-test-task

This is a test project(calendar component).

## Task description

    Нужно сделать возможность переключения месяцев, а так же выбора конкретной даты при клике.

На клик по дню повесить событие, которое будет возвращать выбранную дату.
При инициализации компонент может принимать свойство даты в формате "год-месяц-день" и переключать текущий месяц и день на нее. Если дата не передана, то берем текущий день.
Реализовать возможность смены языка (название месяцев, дней недели).
Никаких ограничений в использовании справочных материалов при выполнении не накладывается (google, stackoverflow и т.д.).
Код должен быть выложен на github.
Запрещено копировать код или использовать нейросети. Код будет проверен на написание нейросетью и копирование из других источников.
Сроки: не более 1 дня с момента получения.

## Architecture

I use FSD;
Navigation, Calendar days - features

Calendar - widget

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
