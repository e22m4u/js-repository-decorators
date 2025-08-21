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
import {model} from '@e22m4u/js-repository-decorators';
import {property} from '@e22m4u/js-repository-decorators';
import {relation} from '@e22m4u/js-repository-decorators';
import {getModelDefinitionFromClass} from '@e22m4u/js-repository-decorators';

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

## Декораторы

- [@model(options?: ModelOptions)](#model) - объявление модели
- [@property(metadata: PropertyMetadata)](#property) - объявление свойства
- [@relation(metadata: RelationMetadata)](#relation) - объявление связи

### <a id="model"></a> @model(options?: ModelOptions)

Декоратор применяется к классу, объявляя его моделью.

```ts
import {model} from '@e22m4u/js-repository-decorators';

@model() // <=
class User {}
```

#### datasource

Определение [источника данных](https://www.npmjs.com/package/@e22m4u/js-repository#%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85).

```ts
import {model} from '@e22m4u/js-repository-decorators';

@model({datasource: 'mongo'}) // <=
class User {}
```

#### tableName

Определение названия коллекции/таблицы в базе данных.  
(по умолчанию используется имя класса)

```ts
import {model} from '@e22m4u/js-repository-decorators';

@model({tableName: 'users'}) // <=
class User {}
```

### <a id="property"></a> @property(metadata: PropertyMetadata)

Декоратор применяется к свойству экземпляра класса, определяя
тип допустимого значения.

```ts
import {DataType} from '@e22m4u/js-repository';
import {property} from '@e22m4u/js-repository-decorators';

@model()
class User {
  @property(DataType.STRING) // <=
  name?: string;
}
```

Типы данных.

- `DataType.ANY` разрешено любое значение
- `DataType.STRING` только значение типа `string`
- `DataType.NUMBER` только значение типа `number`
- `DataType.BOOLEAN` только значение типа `boolean`
- `DataType.ARRAY` только значение типа `array`
- `DataType.OBJECT` только значение типа `object`

#### type

Тип передается первым аргументом или внутри объекта опций.

```ts
import {DataType} from '@e22m4u/js-repository';
import {property} from '@e22m4u/js-repository-decorators';

@model()
class User {
  @property(DataType.STRING) // <=
  name?: string;

  @property({type: DataType.STRING}) // <=
  surname?: string;
}
```

#### itemType

Определение типа для элемента массива.

```ts
import {DataType} from '@e22m4u/js-repository';
import {property} from '@e22m4u/js-repository-decorators';

@model()
class Article {
  @property({
    type: DataType.ARRAY,
    itemType: DataType.STRING, // <=
  })
  tags?: string[];
}
```

#### model

Определение модели объекта.

```ts
import {DataType} from '@e22m4u/js-repository';
import {property} from '@e22m4u/js-repository-decorators';

@model()
class LatLng {
  @property(DataType.NUMBER)
  lat?: number;

  @property(DataType.NUMBER)
  lng?: number;
}

@model()
class Address {
  @property({
    type: DataType.OBJECT,
    model: LatLng.name, // <=
  })
  coordinates?: LatLng;
}
```

#### primaryKey

Определение первичного ключа (по умолчанию свойство `id`).

```ts
import {DataType} from '@e22m4u/js-repository';
import {property} from '@e22m4u/js-repository-decorators';

@model()
class User {
  @property({
    type: DataType.STRING,
    primaryKey: true, // <=
  })
  id!: string;
}
```

#### columnName

Определение названия колонки/свойства в базе данных.  
(по умолчанию имя свойства)

```ts
import {DataType} from '@e22m4u/js-repository';
import {property} from '@e22m4u/js-repository-decorators';

@model()
class User {
  @property({
    type: DataType.STRING,
    columnName: 'NAME', // <=
  })
  name?: string;
}
```

#### required

Определение свойства обязательным (запрет [пустых значений](https://www.npmjs.com/package/@e22m4u/js-repository#Пустые-значения)).

```ts
import {DataType} from '@e22m4u/js-repository';
import {property} from '@e22m4u/js-repository-decorators';

@model()
class User {
  @property({
    type: DataType.STRING,
    required: true, // <=
  })
  name!: string;
}
```

#### default

Определение значения по умолчанию.

```ts
import {DataType} from '@e22m4u/js-repository';
import {property} from '@e22m4u/js-repository-decorators';

@model()
class User {
  @property({
    type: DataType.STRING,
    default: 'John Doe', // <=
  })
  name?: string;
}
```

#### validate

Определение [валидаторов](https://www.npmjs.com/package/@e22m4u/js-repository#Валидаторы).

```ts
import {DataType} from '@e22m4u/js-repository';
import {property} from '@e22m4u/js-repository-decorators';

@model()
class User {
  @property({
    type: DataType.STRING,
    validate: {
      minLength: 2,  // <=
      maxLength: 24, // <=
    },
  })
  name?: string;
}
```

#### unique

Определение свойства уникальным.

```ts
import {DataType} from '@e22m4u/js-repository';
import {PropertyUniqueness} from '@e22m4u/js-repository';
import {property} from '@e22m4u/js-repository-decorators';

@model()
class User {
  @property({
    type: DataType.STRING,
    unique: true, // <=
  })
  username!: string;
}
```

Режимы проверки.

- `PropertyUniqueness.STRICT` или `true` для строгой проверки
- `PropertyUniqueness.SPARSE` не проверять [пустые значения](https://www.npmjs.com/package/@e22m4u/js-repository#Пустые-значения)
- `PropertyUniqueness.NON_UNIQUE` не проверять (по умолчанию)

### <a id="relation"></a> @relation(metadata: RelationMetadata)

Декоратор применяется к свойству экземпляра класса, определяя
тип связи к целевой модели.

#### Belongs To

Текущая модель содержит ссылку на целевую модель.

```ts
import {RelationType} from '@e22m4u/js-repository';
import {model} from '@e22m4u/js-repository-decorators';
import {relation} from '@e22m4u/js-repository-decorators';
import {property} from '@e22m4u/js-repository-decorators';

@model()
class Role {}

@model()
class User {
  @property(DataType.STRING)
  roleId?: string;

  @relation({
    type: RelationType.BELONGS_TO, // <=
    model: Role.name,
    foreignKey: 'roleId', // не обязательно
    // если "foreignKey" не указан, то название внешнего
    // ключа формируется по названию связи с добавлением
    // постфикса "Id"
  })
  role?: Role;
}
```

#### Has One

Целевая модель ссылается на текущую по принципу *один к одному*.  
(обратная сторона *Belongs To*)

```ts
import {RelationType} from '@e22m4u/js-repository';
import {model} from '@e22m4u/js-repository-decorators';
import {relation} from '@e22m4u/js-repository-decorators';
import {property} from '@e22m4u/js-repository-decorators';

@model()
class Profile {
  @property(DataType.STRING)
  userId?: string;

  @relation({
    type: RelationType.BELONGS_TO,
    model: User.name,
  })
  user?: User;
}

@model()
class User {
  @relation({
    type: RelationType.HAS_ONE, // <=
    model: Profile.name,
    foreignKey: 'userId',
  })
  profile?: Profile;
}
```

## Тесты

```bash
npm run test
```

## Лицензия

MIT
