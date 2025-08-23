# @e22m4u/js-repository-decorators

TypeScript декораторы для
[@e22m4u/js-repository](https://www.npmjs.com/package/@e22m4u/js-repository)

## Оглавление

- [Установка](#установка)
  - [Поддержка декораторов](#поддержка-декораторов)
- [Пример](#пример)
- [Декораторы](#декораторы)
  - [@model](#model)
  - [@property](#property)
  - [@relation](#relation)
- [Тесты](#тесты)
- [Лицензия](#лицензия)

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
  DataType,
  RelationType,
  DatabaseSchema,
} from '@e22m4u/js-repository';

import {
  model,
  property,
  relation,
  getModelDefinitionFromClass,
} from '@e22m4u/js-repository-decorators';

// создание экземпляра DatabaseSchema
const dbs = new DatabaseSchema();

// объявление константы источника данных
const MY_DATABASE_1 = 'myDatabase1';

// объявление источника данных на примере MongoDB адаптера
// @e22m4u/js-repository-mongodb-adapter (устанавливается отдельно)
dbs.defineDatasource({
  name: MY_DATABASE_1, // название нового источника
  adapter: 'mongodb',  // название адаптера
  // параметры подключения
  host: '127.0.0.1',
  port: 27017,
  database: 'myDatabase',
});

// модель Role
@model({datasource: MY_DATABASE_1})
class Role {
  @property({
    type: DataType.STRING,
    primaryKey: true,
  })
  id!: string;
  
  @property(DataType.STRING)
  name?: string;
}

// модель User
@model({datasource: MY_DATABASE_1})
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

// получение репозиториев каждой модели
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

- [@model](#model) - объявление модели
- [@property](#property) - объявление свойства
- [@relation](#relation) - объявление связи

### <a id="model"></a> @model(options?: ModelOptions)

Декоратор применяется к классу, объявляя его моделью.

```ts
import {model} from '@e22m4u/js-repository-decorators';

@model() // <=
class User {}
```

Опции (свойства `ModelOptions`).

- [datasource](#ModelOptionsDatasource) - название источника данных;
- [tableName](#ModelOptionsTableName) - названия таблицы в базе данных;

#### <a id="ModelOptionsDatasource"></a> datasource

Определение [источника данных](https://www.npmjs.com/package/@e22m4u/js-repository#%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85).

```ts
import {model} from '@e22m4u/js-repository-decorators';

@model({datasource: 'mongo'}) // <=
class User {}
```

#### <a id="ModelOptionsTableName"></a> tableName

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

- `DataType.ANY` - разрешено любое значение;
- `DataType.STRING` - только значение типа `string`;
- `DataType.NUMBER` - только значение типа `number`;
- `DataType.BOOLEAN` - только значение типа `boolean`;
- `DataType.ARRAY` - только значение типа `array`;
- `DataType.OBJECT` - только значение типа `object`;

Пример:

```ts
import {DataType} from '@e22m4u/js-repository';
import {property} from '@e22m4u/js-repository-decorators';

@model()
class User {
  @property(DataType.STRING)
  name?: string;
}
```

Первым аргументом декоратора может быть передан объект со следующими свойствами.

- [type](#PropertyMetadataType) - тип допустимых значений;
- [itemType](#PropertyMetadataItemType) - тип элемента (для массива);
- [model](#PropertyMetadataModel) - название модели (для объекта);
- [primaryKey](#PropertyMetadataPrimaryKey) - первичный ключ;
- [columnName](#PropertyMetadataColumnName) - название колонки в базе данных;
- [required](#PropertyMetadataRequired) - исключение `null` и `undefined`;
- [default](#PropertyMetadataDefault) - значение по умолчанию;
- [validate](#PropertyMetadataValidate) - проверка формата;
- [unique](#PropertyMetadataUnique) - проверка уникальности;

#### <a id="PropertyMetadataType"></a> type

Тип передается первым аргументом или внутри объекта опций.

```ts
import {DataType} from '@e22m4u/js-repository';
import {property} from '@e22m4u/js-repository-decorators';

@model()
class User {
  @property({type: DataType.STRING}) // <=
  surname?: string;
}
```

#### <a id="PropertyMetadataItemType"></a> itemType

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

#### <a id="PropertyMetadataModel"></a> model

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

#### <a id="PropertyMetadataPrimaryKey"></a> primaryKey

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

#### <a id="PropertyMetadataColumnName"></a> columnName

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

#### <a id="PropertyMetadataRequired"></a> required

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

#### <a id="PropertyMetadataDefault"></a> default

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

#### <a id="PropertyMetadataValidate"></a> validate

Определение предустановленных валидаторов.

- `minLength: number` - минимальная длинна строки или массива;
- `maxLength: number` - максимальная длинна строки или массива;
- `regexp: string | RegExp` - проверка по регулярному выражению;

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

*i. Для регистрации пользовательских валидаторов
см. [Валидаторы](https://www.npmjs.com/package/@e22m4u/js-repository#Валидаторы).*

#### <a id="PropertyMetadataUnique"></a> unique

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

- [Belongs To](#RelationMetadataBelongsTo) - ссылка через внешний ключ;
- [Has One](#RelationMetadataHasOne) - обратная сторона Belongs To (*один к одному*);
- [Has Many](#RelationMetadataHasMany) - обратная сторона Belongs To (*один ко многим*);
- [References Many](#RelationMetadataReferencesMany) - ссылка через массив идентификаторов;
- [Belongs To (полиморфная версия)](#RelationMetadataPolyBelongsTo) - внешний ключ и дискриминатор;

#### <a id="RelationMetadataBelongsTo"></a> Belongs To

Текущая модель ссылается на целевую используя внешний ключ.

```ts
import {RelationType} from '@e22m4u/js-repository';
import {model} from '@e22m4u/js-repository-decorators';
import {relation} from '@e22m4u/js-repository-decorators';
import {property} from '@e22m4u/js-repository-decorators';

// модель Role
@model()
class Role {
  @property(DataType.STRING)
  name?: string;
}

// модель User
@model()
class User {
  @property(DataType.STRING)
  name?: string;

  @property(DataType.STRING)
  roleId?: string;

  @relation({
    type: RelationType.BELONGS_TO, // <=
    model: Role.name,
    foreignKey: 'roleId', // (не обязательно)
    // если "foreignKey" не указан, то название внешнего
    // ключа формируется по названию связи с добавлением
    // постфикса "Id"
  })
  role?: Role;
}
```

Документ *Role*.

```json
{
  "_id": "68a9c85f31f4414606e7da79",
  "name": "Manager"
}
```

Документ *User*.

```json
{
  "_id": "68a9c9b52eab80fa02ee6ccb",
  "name": "John Doe",
  "roleId": "68a9c85f31f4414606e7da79"
}
```

Извлечение документа *User* и разрешение связи `role`.

```ts
const user = userRep.findOne({include: 'role'});
console.log(user);
// {
//   id: '68a9c9b52eab80fa02ee6ccb',
//   name: 'John Doe',
//   roleId: '68a9c85f31f4414606e7da79',
//   role: {
//     id: '68a9c85f31f4414606e7da79',
//     name: 'Manager'
//   }
// }
```

#### <a id="RelationMetadataHasOne"></a> Has One

Целевая модель ссылается на текущую по принципу *один к одному*.  
(обратная сторона *Belongs To*)

```ts
import {RelationType} from '@e22m4u/js-repository';
import {model} from '@e22m4u/js-repository-decorators';
import {relation} from '@e22m4u/js-repository-decorators';
import {property} from '@e22m4u/js-repository-decorators';

// модель Profile
@model()
class Profile {
  @property(DataType.STRING)
  phone?: string;

  @property(DataType.STRING)
  address?: string;

  @property(DataType.STRING)
  userId?: string;

  @relation({
    type: RelationType.BELONGS_TO,
    model: User.name,
  })
  user?: User;
}

// модель User
@model()
class User {
  @property(DataType.STRING)
  name?: string;

  @relation({
    type: RelationType.HAS_ONE, // <=
    model: Profile.name,
    foreignKey: 'userId',
  })
  profile?: Profile;
}
```

Документ *Profile*.

```json
{
  "_id": "68a9c85f31f4414606e7da79",
  "phone": "+78005553535",
  "address": "101000, Moscow, Boulevard, 291",
  "userId": "68a9c9b52eab80fa02ee6ccb"
}
```

Документ *User*.

```json
{
  "_id": "68a9c9b52eab80fa02ee6ccb",
  "name": "John Doe"
}
```

Извлечение документа *User* и разрешение связи `profile`.

```ts
const user = userRep.findOne({include: 'profile'});
console.log(user);
// {
//   id: '68a9c9b52eab80fa02ee6ccb',
//   name: 'John Doe',
//   profile: {
//     id: '68a9c85f31f4414606e7da79',
//     phone: '+78005553535',
//     address: '101000, Moscow, Boulevard, 291',
//     userId: '68a9c9b52eab80fa02ee6ccb'
//   }
// }
```

#### <a id="RelationMetadataHasMany"></a> Has Many

Целевая модель ссылается на текущую по принципу *один ко многим*.  
(обратная сторона *Belongs To*)

```ts
import {RelationType} from '@e22m4u/js-repository';
import {model} from '@e22m4u/js-repository-decorators';
import {relation} from '@e22m4u/js-repository-decorators';
import {property} from '@e22m4u/js-repository-decorators';

// модель Article
@model()
class Article {
  @property(DataType.STRING)
  title?: string;

  @property(DataType.STRING)
  authorId?: string;

  @relation({
    type: RelationType.BELONGS_TO,
    model: Author.name,
  })
  author?: Author;
}

// модель Author
@model()
class Author {
  @property(DataType.STRING)
  name?: string;

  @relation({
    type: RelationType.HAS_MANY, // <=
    model: Article.name,
    foreignKey: 'authorId',
  })
  articles?: Article[];
}
```

Коллекция *Articles*.

```json
[
  {
    "_id": "68a9ccc43fe39dd49b4d283c",
    "title": "The Bottle and the Babe",
    "authorId": "68a9c9b52eab80fa02ee6ccb"
  },
  {
    "_id": "68a9cd32f06233bba3aeadfe",
    "title": "The History Logs",
    "authorId": "68a9c9b52eab80fa02ee6ccb"
  }
]
```

Документ *Author*.

```json
{
  "_id": "68a9c9b52eab80fa02ee6ccb",
  "name": "John Doe"
}
```

Извлечение документа *Author* и разрешение связи `articles`.

```ts
const author = authorRep.findOne({include: 'articles'});
console.log(author);
// {
//   id: '68a9c9b52eab80fa02ee6ccb',
//   name: 'John Doe',
//   articles: [
//     {
//       id: '68a9ccc43fe39dd49b4d283c',
//       title: 'The Bottle and the Babe',
//       authorId: '68a9c9b52eab80fa02ee6ccb'
//     },
//     {
//       id: '68a9cd32f06233bba3aeadfe',
//       title: 'The History Logs',
//       authorId: '68a9c9b52eab80fa02ee6ccb'
//     }
//   ]
// }
```

#### <a id="RelationMetadataReferencesMany"></a> References Many

Связь через массив идентификаторов.

```ts
import {RelationType} from '@e22m4u/js-repository';
import {model} from '@e22m4u/js-repository-decorators';
import {relation} from '@e22m4u/js-repository-decorators';
import {property} from '@e22m4u/js-repository-decorators';

// модель City
@model()
class City {
  @property(DataType.STRING)
  name?: string;
}

// модель User
@model()
class User {
  @property(DataType.STRING)
  name?: string;

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

Коллекция *Cities*.

```json
[
  {
    "_id": "68a9c79e0f69f169bd711d5d",
    "name": "Moscow"
  },
  {
    "_id": "68a9c839d0d046bcd43df978",
    "name": "Saint Petersburg"
  }
]
```

Документ *User*.

```json
{
  "_id": "68a9c85f31f4414606e7da79",
  "name": "John Doe",
  "cityIds": [
    "68a9c79e0f69f169bd711d5d",
    "68a9c839d0d046bcd43df978"
  ]
}
```

Извлечение документа *User* и разрешение связи `cities`.

```ts
const user = userRep.findOne({include: 'cities'});
console.log(user);
// {
//   id: '68a9c85f31f4414606e7da79',
//   name: 'John Doe',
//   cityIds: [
//     '68a9c79e0f69f169bd711d5d',
//     '68a9c839d0d046bcd43df978'
//   ],
//   cities: [
//     {
//       id: '68a9c79e0f69f169bd711d5d',
//       name: 'Moscow'
//     },
//     {
//       id: '68a9c839d0d046bcd43df978',
//       name: 'Saint Petersburg'
//     }
//   ]
// }
```

#### <a id="RelationMetadataPolyBelongsTo"></a> Belongs To (полиморфная версия)

Текущая модель ссылается на целевую, используя внешний ключ и дискриминатор.

```ts
import {RelationType} from '@e22m4u/js-repository';
import {model} from '@e22m4u/js-repository-decorators';
import {relation} from '@e22m4u/js-repository-decorators';
import {property} from '@e22m4u/js-repository-decorators';

// модель Author
@model()
class Author {
  @property(DataType.STRING)
  name?: string;

  @property(DataType.NUMBER)
  age?: number;
}

// модель Article
@model()
class Article {
  @property(DataType.STRING)
  title?: string;

  @property(DataType.STRING)
  content?: string;
}

// модель Image
@model()
class Image {
  @property(DataType.STRING)
  ownerId?: string;

  @property(DataType.STRING)
  ownerType?: string;

  @relation({
    type: RelationType.BELONGS_TO, // <=
    polymorphic: true,             // <=
    // полиморфный режим позволяет хранить название целевой модели
    // в свойстве-дискриминаторе, которое формируется согласно
    // названию связи с постфиксом "Type", и в данном случае
    // название целевой модели хранит "ownerId",
    // а идентификатор документа "ownerType"
    foreignKey: 'ownerId',     // (не обязательно)
    discriminator: 'ownerType' // (не обязательно)
  })
  owner?: Author | Article;
}
```

Документ *Author*.

```json
{
  "_id": "68a9c85f31f4414606e7da78",
  "name": "John Doe",
  "age": 24
}
```

Документ *Article*.

```json
{
  "_id": "68a9cfd16767b49624fd16d6",
  "title": "The History Logs",
  "content": "First published in 1912, History has been a..."
}
```

Коллекция *Images*.

```json
[
  {
    "_id": "68a9c9b52eab80fa02ee6ccb",
    "path": "/storage/upload/12.png",
    "ownerType": "Author",
    "ownerId": "68a9c85f31f4414606e7da78"
  },
  {
    "_id": "68a9cfdf43fb7961ad68af1b",
    "path": "/storage/upload/13.png",
    "ownerType": "Article",
    "ownerId": "68a9cfd16767b49624fd16d6"
  }
]
```

Извлечение документов *Image* и разрешение связи `owner`.

```ts
const images = imageRep.find({include: 'owner'});
console.log(images);
// [
//   {
//     id: '68a9c9b52eab80fa02ee6ccb',
//     path: '/storage/upload/12.png',
//     ownerType: 'Author',
//     ownerId: '68a9c85f31f4414606e7da78',
//     owner: {
//       id: '68a9c85f31f4414606e7da78',
//       name: 'John Doe',
//       age: 24
//     }
//   },
//   {
//     id: '68a9cfdf43fb7961ad68af1b',
//     path: '/storage/upload/13.png',
//     ownerType: 'Article',
//     ownerId: '68a9cfd16767b49624fd16d6',
//     owner: {
//       id: '68a9cfd16767b49624fd16d6',
//       title: 'The History Logs',
//       content: 'First published in 1912, History has been a...'
//     }
//   }
// ]
```

## Тесты

```bash
npm run test
```

## Лицензия

MIT
