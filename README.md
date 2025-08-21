# @e22m4u/js-repository-decorators

TypeScript декораторы для
[@e22m4u/js-repository](https://www.npmjs.com/package/@e22m4u/js-repository)

## Установка

```bash
npm install @e22m4u/js-repository-decorators
```

Модуль [js-repository](https://www.npmjs.com/package/@e22m4u/js-repository) также должен быть установлен.

```bash
npm install @e22m4u/js-repository
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

import {
  DataType,
  RelationType,
  DatabaseSchema,
} from '@e22m4u/js-repository';

// создание экземпляра DatabaseSchema
const dbs = new DatabaseSchema();

// объявление источника данных на примере MongoDB адаптера
// @e22m4u/js-repository-mongodb-adapter (устанавливается отдельно)
dbs.defineDatasource({
  name: 'myDatabase1', // название нового источника
  adapter: 'mongodb',  // название адаптера
  // параметры подключения
  host: '127.0.0.1',
  port: 27017,
  database: 'myDatabase',
});

// определение модели Role
@model({datasource: 'myDatabase1'})
class Role {
  @property({
    type: DataType.STRING,
    primaryKey: true,
  })
  id!: string;
  
  @property(DataType.STRING)
  name?: string;
}

// определение модели User
@model({datasource: 'myDatabase1'})
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
  roleId?: string;

  @relation({
    type: RelationType.BELONGS_TO,
    model: Role.name,
  })
  role?: Role;
}

const roleDef = getModelDefinitionFromClass(Role);
const userDef = getModelDefinitionFromClass(User);

console.log(userDef);
// {
//   "name": "User",
//   "datasource": "myDatabase1",
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

// регистрация моделей
dbs.defineModel(roleDef);
dbs.defineModel(userDef);

// получение репозиториев
const roleRep = dbs.getRepository(Role.name);
const userRep = dbs.getRepository(User.name);

// создание новых документов
const manager = await roleRep.create({name: 'Manager'});
const user = await userRep.create({name: 'John', roleId: manager.id})

// извлечение документа и связанных данных
const userWithRole = await userRep.findById(user.id, {
  include: 'role',
});

console.log(userWithRole);
// {
//   "id": "64f3454e5e0893c13f9bf47e",
//   "name": "John",
//   "roleId": "64f34549bf47e3c13fe5e089",
//   "role": {
//     "id": "64f34549bf47e3c13fe5e089",
//     "name": "Manager",
//   }
// }
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

Текущая модель ссылается на целевую используя внешний ключ.

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

#### Has Many

Целевая модель ссылается на текущую по принципу *один ко многим*.  
(обратная сторона *Belongs To*)

```ts
import {RelationType} from '@e22m4u/js-repository';
import {model} from '@e22m4u/js-repository-decorators';
import {relation} from '@e22m4u/js-repository-decorators';
import {property} from '@e22m4u/js-repository-decorators';

@model()
class Article {
  @property(DataType.STRING)
  authorId?: string;

  @relation({
    type: RelationType.BELONGS_TO,
    model: Author.name,
  })
  author?: Author;
}

@model()
class Author {
  @relation({
    type: RelationType.HAS_MANY, // <=
    model: Article.name,
    foreignKey: 'authorId',
  })
  articles?: Article[];
}
```

#### References Many

Связь через массив идентификаторов.

```ts
import {RelationType} from '@e22m4u/js-repository';
import {model} from '@e22m4u/js-repository-decorators';
import {relation} from '@e22m4u/js-repository-decorators';
import {property} from '@e22m4u/js-repository-decorators';

@model()
class City {}

@model()
class User {
  @property({
    type: DataType.ARRAY,
    itemType: DataType.STRING,
  })
  cityIds?: string[];

  @relation({
    type: RelationType.REFERENCES_MANY,
    model: City.name,
    foreignKey: 'cityIds',
  })
  cities?: City[];
}
```

## Тесты

```bash
npm run test
```

## Лицензия

MIT
