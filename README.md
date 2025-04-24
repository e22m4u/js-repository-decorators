# @e22m4u/js-repository-decorators

TypeScript декораторы для
[@e22m4u/js-repository](https://www.npmjs.com/package/@e22m4u/js-repository)

## Установка

```bash
npm install @e22m4u/js-repository-decorators
```

#### Поддержка декораторов

Для включения поддержки декораторов, добавьте указанные
ниже опции в файл `tsconfig.json` вашего проекта.

```json
{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}
```

## Пример

```ts
import {
  model,
  property,
  relation,
  getModelDefinitionFromClass,
} from '@e22m4u/js-repository-decorators';

import {DataType} from '@e22m4u/js-repository';
import {RelationType} from '@e22m4u/js-repository';

@model({
  tableName: 'myUserTable',
  datasource: 'myDatasource',
})
class User {
  @property({
    type: DataType.STRING,
    primaryKey: true,
  })
  id!: string;

  @property({
    type: DataType.STRING,
    required: true,
  })
  name!: string;
  
  @property({
    type: DataType.STRING,
    default: '',
  })
  roleId!: string;

  @relation({
    type: RelationType.BELONGS_TO,
    model: 'Role',
  })
  role?: object;
}

const modelDef = getModelDefinitionFromClass(User);
// {
//   "name": "User",
//   "tableName": "myUserTable",
//   "datasource": "myDatasource",
//   "properties": {
//     "id": {
//       "type": "string",
//       "primaryKey": true,
//     },
//     "name": {
//       "type": "string",
//       "required": true,
//     },
//     "roleId": {
//       "type": "string",
//       "default": "",
//     },
//   },
//   "relations": {
//     "role": {
//       "type": "belongsTo",
//       "model": "Role"
//     },
//   },
// },
```

## Тесты

```bash
npm run test
```

## Лицензия

MIT
