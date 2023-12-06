
// const names = {
//   "": ""
// }

const cards = [
  {
    image: require('../assets/cards/v1.png'),
    ava: require('../assets/ava/Property 1=Default.png'),
    type: 'guard',
    id: 1,
    name: "Старая дама",
    name_en: "Benevolent Old Dame",
    linkCards: [],
    info: `
    <h3> Один раз за игру, когда объявляется о вашей смерти, вы можете дать
    <router-link to="">дополнительную жизнь</router-link> цели, отличной от вас самих.
    [Смотрите Общие часто задаваемые вопросы о дополнительной жизни на стр. 19]</h3>
    <b>Должен ли B.O.D. давать кому-либо дополнительную жизнь?</b>
    <p>Нет. Если они этого не делают, то они тихо умирают, и Деревня не
    узнает, что они были B.O.D.</p>
    <b> Как быстро должен принять решение B.O.D.?</b>
    <p>Довольно быстро, по усмотрению модератора. Не должно быть никаких
    комментариев от других игроков.</p>
    <b>Является ли решение B.O.D. публичным?</b>
    <p>Да</p>
    `
  },
  {
    image: require('../assets/cards/v2.png'),
    ava: require('../assets/ava/Property 1=Variant2.png'),
    id: 2,
    type: 'info',
    name: "Могильщик",
    linkCards: [13],
    name_en: "Gravedigger",
    info: `
      <h3>В начале каждой ночи вы изучаете карты всех, кто
      умер в тот день.</h3>
      <b>Видит ли Могильщик карты игроков, которые были
      убиты ночью?</b>
      <p>Нет, только тех, кто был убит днем.</p>
      <b>Видит ли Могильщик обе карты: персонажа и команду?</b>
      <p>Да.</p>
     <b> Разве Могильщик не является приоритетной целью для ведьм?</b>
      <p>Возможно, но часто они сосредоточены на устранении Священника. 
      Могильщик также является очень легкой мишенью для защиты Ангелов,
      поскольку они видят Могильщика даже до своей первой защиты</p>
    `
  },
  {
    image: require('../assets/cards/v3.png'),
    ava: require('../assets/ava/Property 1=Variant3.png'),
    id: 3,
    type: 'attack',
    name: "Ассасин",
    linkCards: [],
    name_en: "Assassin",
    info: `
      <h3>Один раз за игру до конца любого дня вы можете раскрыть эту
      карту и угадать характер цели. Если верно, цель
      убита. Если неверно, вы убиты.</h3>
      <b>Как активируется Ассасин?</b>
      <p>Ассасин просто объявляет о своем официальном действии и
      просит модератора разрешить его.</p>
      <b>Может ли Ассасин активироваться по истечении дневного времени голосования или ночью?</b>
     <p> Нет.</p>
     <b> Сможет ли убийца когда-нибудь угадать снова, по той же или другой
      цели?</b>
      
     <p> Нет, это происходит один раз за игру.</p>
      <b>Может ли Ассасин назвать Ведьму или жителя деревни?</b>
      <p>Ассасин выбирает конкретного персонажа —
      например, судью или священника, — а не тип команды.</p>
      <b>Что, если Ассасин угадает
      правильно, но у цели будет
      дополнительная жизнь?</b>
      <p>Затем
      объявляется, что цель выжила, и
      все знают
      , что предположение было правильным.</p>
     <b> Что, если Ассасин
      угадает неправильно, но у
      Ассасина будет дополнительная жизнь?</b>
      <p>Затем
      объявляется, что убийца выжил, и все
      понимают, что предположение было неверным</p>
    `
  },
  {
    image: require('../assets/cards/v4.png'),
    ava: require('../assets/ava/Property 1=Variant4.png'),
    id: 4,
    type: 'attack',
    name: "Охотник",
    linkCards: [],
    info: `
      <h3>
      В первый раз, когда игрок выживает после убийства, вы можете убить цель
      следующей ночью.
</h3>
      <b>Активируется ли Охотник каждую ночь после выживания?</b>
      <p>Нет, только в первую.</p>
     <b> Может ли Охотник нацелиться на кого-то, на кого уже нацелено
      убийство, например, на Ведьм?</b>
      <p>Да. Этот человек был бы убит дважды, что привело бы к смерти, даже если
      бы он был защищен от (одиночного) убийства.</p>
     <b> Может ли Охотник выбрать никого не убивать? Что, если Охотник мертв?</b>
      <p>Охотник никого не может убить. Как и с Судьей и другими персонажами,
      это происходит по умолчанию, если Охотник мертв.</p>
    `,
    name_en: "Hunter"
  },
  {
    image: require('../assets/cards/v5.png'),
    ava: require('../assets/ava/Property 1=Variant5.png'),
    id: 5,
    type: 'guard',
    name: "Медсестра",
    linkCards: [],
    info: `
      <h3>Один раз за игру до конца 
      любого дня вы можете 
      раскрыть эту
      карту и назвать любого
       несвятого персонажа. 
      Если игрок с таким
      персонажем все еще жив, 
      этот игрок получает дополнительную жизнь.<br/> Медсестра просто объявляет о своем официальном действии и
      просит модератора подтвердить его.</h3>
      
      <b>
      Может ли медсестра активироваться по истечении дневного времени голосования или ночью?</b>
      <p>Нет.</p>
      
      <b>Сможет ли медсестра когда-нибудь действовать снова, с той же или другой целью?</b>
      <p>Нет, это один раз за игру.</p>
      
      <b>Может ли медсестра назвать Ведьму или жителя деревни?</b>
      <p>Медсестра выбирает конкретного персонажа (например, судью или медсестру), а не
      тип команды.</p>
      
      <b>Подождите, может ли Медсестра назвать медсестру?</b>
        <p>Да — но никаких обещаний относительно того, как отреагирует Деревня!</p>
        <b>Может ли Медсестра дать дополнительную жизнь Священнику или послушнику?</b>
        <p>Нет, указанный персонаж не может быть Святым</p>
    `,
    name_en: "Nurse"
  },
  {
    image: require('../assets/cards/v6.png'),
    ava: require('../assets/ava/Property 1=Variant6.png'),
    id: 6,
    type: 'guard',
    name: "Азартный игрок",
    linkCards: [], info: `
     <h3> В начале игры вы можете выбрать четное или нечетное число. В эти
      ночи (но не дни) вы защищены от убийств.</h3>
      <b>Выживает ли Игрок после деревенских повешений?</b>
      <p>Нет, игрок выживает после убийств только ночью.</p>
      <b>Остается ли Игрок защищенным в четные / нечетные ночи после того, как он
      выжил один раз?</b>
      <p>Да, Игрок защищен в ночи по своему выбору навсегда,
      хотя всего от одного убийства за ночь.</p>
      <b>Какой смысл быть Азартным игроком-Ведьмой?</b>
      <p>Не волнуйся, ты во всем разберешься.</p>
    `,
    name_en: "Gambler"
  },
  {
    image: require('../assets/cards/v7.png'),
    ava: require('../assets/ava/Property 1=Variant7.png'),
    id: 7,
    type: 'attack',
    name: "Судья",
    linkCards: [13], info: `
      <h3>В конце любого дня, когда игроки не могут выбрать мишень для подвешивания,
      вы можете решить это самостоятельно. Это подвешивание всегда работает,
      независимо от защиты.</h3>
     <b> Узнают ли другие игроки, кто судья?</b>
      <p>Нет, деревня рано ложится спать, хотя технически еще
      день. Их решение остается секретным и объявляется модератором.</p>
     <b> Должен ли судья выбрать кого-то для повешения?</b>
      <p>Нет.</p>
      <b>Что, если судья мертв?</b>
      <p>Если Судьи нет (и нет Ученика, который преследует Судью), то
      никто не меняется. Это неотличимо от того факта, что живой судья
      сознательно решил никого не вешать.</p>
      
      <hr class="mb-4"/>
      <p>Если большинство не будет достигнуто вовремя, в том числе при равенстве
      голосов или деревня согласится никого не убивать, судье предоставляется
      возможность принять решение.
      Деревня рано ложится спать, и игрок с
      персонажем Судьи может проснуться и решить, кого повесить в частном порядке. Любое
      повешение судьей также игнорирует дополнительные жизни, что является распространенной
      формой защиты, которой пользуются некоторые персонажи.
      Судья может принять решение никого не убивать. Если судья мертв, это
      произойдет автоматически.
      Несмотря на то, что деревня рано легла спать,
      это все еще деревенская казнь; это все еще день,
      еще не ночь</p>
    `,
    name_en: "Judge"
  },
  {
    image: require('../assets/cards/v8.png'),
    ava: require('../assets/ava/Property 1=Variant8.png'),
    id: 8,
    type: 'guard',
    name: "Выжившый",
    linkCards: [], info: `
      <h3>У вас +1 жизнь! <span>Усё, пара пара пам</span></h3>
    `,
    name_en: "Survivalist"
  },
  {
    image: require('../assets/cards/v9.png'),
    ava: require('../assets/ava/Property 1=Variant9.png'),
    id: 9,
    type: 'info',
    name: "Инквизитор",
    linkCards: [], info: `
      <h3>
      Каждую ночь вы можете проверять категорию персонажа цели (например
        , Святой, Нападение, Защита или Информация).
    </h3>
      <b>Меняется ли эта проверка при вмешательстве Демона, как у Священника?
      Запускает ли она Фанатика?</b>
      <p>Нет и нет.</p>
      <b>В качестве кого отображается персонаж Ученик?</b>
      <p>Ученик рассматривается как категория выбранного ими персонажа, Могильщик (Информация), Судья (Нападение)</p>
    `,
    name_en: "Inquisitor"
  },
  {
    image: require('../assets/cards/v10.png'),
    ava: require('../assets/ava/Property 1=Variant10.png'),
    id: 10,
    type: 'info',
    name: "Подглядывающий Том",
    linkCards: [], info: `
      <h3> Один раз за игру вы можете проснуться
      с любым несвятым персонажем. Если
      этот персонаж мертв, вы можете
      принимать решения вместо него.</h3>
      <b>Как Подглядывающий Том использует
      свои способности?</b>
      <p>Они просто... просыпаются и наблюдают.
      Оба игрока могут видеть друг
      друга, и подглядывающий
      делится любой
      показанной информацией. Они должны
      убедиться, что модератор видит и
      подтверждает их решение
      использовать свои способности.</p>
      <b>Может ли Подглядывающий Том проснуться, чтобы понаблюдать за Послушником, священником,
      Ведьмами, Ангелами или Демонами?</b>
      <p>Нет, Подглядывающий Том может проснуться только с несвятыми персонажами
      , такими как Судья, Игрок, Охотник, Сторож или другие.</p>
      <b>Может ли "Подглядывающий том" подсматривать за "Пробуждением пролога", как "Ученик",
      "Игрок" и "Оракул"?</b>
      <p>Да, хотя эти варианты, как правило, стратегически сомнительны.</p>
     <b> Подсматривает ли "Подглядывающий том" за информацией спиритуалиста?</b>
      <p>Нет, только люди, которые просыпаются ночью или в прологе.</p>
      <b>За каких персонажей может принимать решения "Подглядывающий том", если они
      мертвы?</b>
     <p> Подглядывающий Том может принять решение за Судью, Охотника
      или Подрывника.</p>
      <b>Может ли Подглядывающий Том когда-нибудь действовать снова, по той же или другой
      цели?</b>
     <p> Нет, это один раз за игру.</p>
    `,
    name_en: "Peeping Tom"
  },
  {
    image: require('../assets/cards/v11.png'),
    ava: require('../assets/ava/Property 1=Variant11.png'),
    id: 11,
    type: 'info',
    name: "Оракул",
    linkCards: [], info: `
      <h3>В начале игры вы узнаете личность
       случайного Деревенского крестьянина.</h3>
      <b>То есть они просто узнают, что 
      кто-то не ведьма?</b>
      <p>Да, а также, что этот кто-то также 
      не является одним из деревенских священнослужителей.</p>
      <b>Разве Оракул не должен немедленно сообщать свою информацию?</b>
     <p> Не всегда. Подумайте, как это может повлиять на
      стратегию команды Ведьм, и рассмотрите случаи, когда более позднее раскрытие может оказать
      большее влияние.</p>
      <b>Разве Оракул ведьм не очень полезен?</b>
      <p>Зависит от вашей способности лгать!</p>
    `,
    name_en: "Oracle"
  },
  {
    image: require('../assets/cards/v12.png'),
    ava: require('../assets/ava/Property 1=Variant12.png'),
    id: 12,
    type: 'holy',
    name: "Священник",
    linkCards: [21, 20], info: `
      <h3>Каждую ночь вы можете проверять, состоит ли цель в Шабаше ведьм.</h3>
      <b>Может ли священник быть Ведьмой?</b>
      <p>Нет, священник - это Святой персонаж, и его всегда назначают
      деревенскому духовенству.</p>
     <b> Бывают ли когда-нибудь неправильные проверки священника?</b>
      <p>Смотрите раздел "Назойливые демоны" на стр. 6.</p>
    `,
    name_en: "Priest"
  },
  {
    image: require('../assets/cards/v13.png'),
    ava: require('../assets/ava/Property 1=Variant13.png'),
    id: 13,
    type: 'attack|info',
    name: "Ученик",
    linkCards: [2, 7], info: `
      <h3>В начале игры вы можете выбрать судью или могильщика. <br/>
      Вы узнаете, у кого этот персонаж, и принимаете на себя его обязанности, если
он умрет.</h3>
     <b>Как Ученик узнает, когда ему следует приступить к выбранной работе?</b>
        <p>Ученику изначально показывают, у какого игрока есть
выбранный им персонаж, и он может просто проснуться, чтобы выполнить эту роль, когда это
потребуется, после того, как этот игрок умрет.</p>
    `,
    name_en: "Apprentice"
  },
  {
    image: require('../assets/cards/v14.png'),
    ava: require('../assets/ava/Property 1=Variant14.png'),
    id: 14,
    type: 'info',
    name: "Гадалка",
    linkCards: [], info: `
     <h3> В начале игры выберите персонажа. Вы узнаете, что
      скажет ведущий, если этот персонаж умрет ночью.</h3>
      <p>...ладно, я просто не понимаю.</p>
      <p>
      Модератор будет каждое утро рассказывать какую-нибудь историю для
      каждого, кого объявят мертвым, например: “Жители деревни нашли
      их тело в доках”. Модератор просто
      заранее сообщает Гадалке, что они скажут, если выбранный
      персонаж умрет.</p>
      <p>...извините, я все еще не понимаю.</p>
      <p>Допустим, Гадалка выбрала Священника, а Ведущий
      сказал, что они умрут запихнутыми внутрь Чучела. И вот однажды, когда
      группа просыпается, и Ведущий говорит: “Деревня
      пришла в ужас, обнаружив, что Райли был найден мертвым, их тело
      засунули внутрь чучела!”, Гадалка тайно узнает:
      “Райли был священником, и священник теперь мертв!”</p>
      <p>О, я понял! Это действительно умно!
      Не так ли?</p>
    `,
    name_en: "Fortune Teller"
  },
  {
    image: require('../assets/cards/v16.png'),
    ava: require('../assets/ava/Property 1=Variant15.png'),
    id: 15,
    type: 'attack',
    name: "Бомбардировщик",
    linkCards: [], info: `
      <h3>В начале игры вы можете выбрать цель, в которой будет находиться
бомба. Один раз за игру в конце любой ночи вы можете подать сигнал на
взрыв бомбы. Бомба удаляется из игры, а игрок
, держащий ее, погибает.</h3>
<p>Бомба: Бомба находится в открытом доступе у живого игрока. В
конце каждого дня человек, держащий бомбу, может передать ее
новой цели — даже если человек, держащий ее, умер в тот день или
предыдущей ночью.</p>
Я не понимаю.
<b>Бомба - это горячая картошка, которую игроки могут раздавать по кругу после
каждого дневного повешения. Подрывник решает, в какую ночь он взорвется
и убьет кого-нибудь.</b>
<b>Может ли террорист сам подложить себе бомбу?</b>
<p>Да.</p>
<b>Что, если Подрывник умрет до того, как взорвет бомбу?</b>
<p>Бомбу все еще можно передавать по кругу как обычно, поскольку живые
игроки могут не знать, что Подрывник мертв.</p>
<b>Может ли игрок оставить бомбу себе, а не передавать ее?</b><b> Смогут
ли они пройти его, даже если они умерли в тот день?</b>
<p>Да и да</p>
<b>Что если игрок с Бомбой умрет и не выберет цель?
передать его в тот день?
</b>
<p>Затем они забирают с собой Бомбу, и ее просто убирают.
из игры.</p>
    `,
    name_en: "Bomber"
  },
  {
    image: require('../assets/cards/v18.png'),
    ava: require('../assets/ava/Property 1=Variant16.png'),
    id: 16,
    type: 'info',
    name: "Спиритуалист",
    linkCards: [], info: `
      <h3>Один раз за игру до конца любого дня вы можете
раскрыть эту карту и назвать имя любого умершего игрока. Вы узнаете карты этого игрока конфиденциально.</h3>
        <b>Как активируется Спиритуалист?</b>
    <p>Спиритуалист просто объявляет о своем официальном действии и
просит Ведущего немедленно показать ему карты выбранного игрока в частном порядке</p>

<b>Может ли Спиритуалист активироваться по истечении дневного времени голосования или
ночью?</b>
<p>Нет.</p>
<b>Может ли Спиритуалист когда-нибудь действовать снова, с той же или другой
целью?</b>
<p>Нет, это один раз за игру.</p>
<b>Видит ли Спиритуалист обе карты: персонажа и команду?</b>
<p>Да.</p>
<b>Может ли Спиритуалист рассказать людям, что это были за карты?</b>
<p>Конечно, хотя на самом деле они не могут показать карты.</p>
    `,
    name_en: "Spiritualist"
  },
  {
    image: require('../assets/cards/v19.png'),
    ava: require('../assets/ava/Property 1=Variant17.png'),
    id: 17,
    type: 'attack',
    name: "Cтарый ублюдок",
    linkCards: [], info: `
      <h3>Один раз за игру, когда объявляется о вашей смерти, вы можете убить
      цель.</h3>
     <b> Должен ли D.O.B. убивать цель?</b>
     <p> Нет. Если они этого не сделают, 
      то умрут тихо (так, чтобы Деревня не
      узнала, что они были D.O.B.).</p>
      <b>Как быстро должен принять решение D.O.B.?</b>
      <p>Довольно быстро, на усмотрение модератора. Не должно быть никакой
      информации от других игроков.</p>
     <b> Что, если цель выживет после убийства?</b>
     <p> Тогда это действительно неловко и/ или весело.</p>
    `,
    name_en: "(D.O.B.) Dirty Old Bastard"
  },
  {
    image: require('../assets/cards/v20.png'),
    ava: require('../assets/ava/Property 1=Variant18.png'),
    id: 18,
    type: 'info',
    name: "Сторож",
    linkCards: [], info: `
   <h3> В конце первой ночи вы
узнаете, кто такой случайный деревенский житель
Крестьянин, который не проснулся.</h3>
<b>Так это что-то вроде Оракула?</b>
<p>Да, но это происходит позже, и несколько
дополнительных персонажей (например, Могильщик) также исключаются из пула.</p>
<b>Может ли Сторож узнать личность
кого-то, убитого той ночью?</b>
<p>Нет, Модератор должен исключить убитые
цели из случайного пула.</p>
<b>Узнает ли Сторож случайного
Жителя деревни каждую ночь?</b>
<p>Только первый. (Учить по одному за ночь
было бы сильнее, чем у священника!)</p>
`,
    name_en: "Watchman"
  },
  {
    image: require('../assets/cards/v21.png'),
    ava: require('../assets/ava/Property 1=Variant19.png'),
    id: 19,
    type: 'attack',
    name: "Свободная пушка",
    linkCards: [], info: `
<h3>До конца любого дня вы можете раскрыть эту карту. Пожертвуйте
собой, чтобы закончить день и решить, кого повесить.</h3>
<b>Как активируется Loose Cannon?</b>
<p>Loose Cannon просто объявляет о своем официальном действии и
просит модератора подтвердить это. Они должны сделать это как можно более драматично.</p>
<b>Может ли Loose Cannon активироваться по истечении дневного времени голосования или
ночью?</b>
<p>Нет.</p>
<b>Что, если цель Loose Cannon выживет?</b>
<p>Тогда Loose Cannon все равно умрет, и это забавно.
Выживут ли The Loose Cannon, если у них будет дополнительная жизнь?</p>
<p>Да — тогда это действительно весело.</p>
<b>Могут ли "Свободные стрелки" снова использовать свою способность, если они выжили
при первом использовании благодаря дополнительной жизни?</b>
<p>Да, и пик веселья достигнут.</p>
    `,
    name_en: "Loose Cannon"
  },
  {
    image: require('../assets/cards/v22.png'),
    ava: require('../assets/ava/Property 1=Variant20.png'),
    id: 20,
    type: 'info',
    name: "Фанатик",
    linkCards: [12], info: `
      <h3> Всякий раз, когда Священник проверяет вас, вы тайно уведомляетесь и
      получаете дополнительную жизнь.
      [Смотрите Общие вопросы о дополнительной жизни на стр. 19]</h3>
      <b> Как уведомляется Фанатик?</b>
      <p> Модератор просто молча постукивает его по голове после того,
      как Священник возвращается спать.</p>
      <b>Знает ли священник, что они проверили Фанатика? <br/>
      Узнает ли Фанатик, кто такой Священник?</b>
      <p>Нет и нет.</p>
      <b>Что, если священник проверит Фанатика 
      еще раз?</b>
      <p>Тогда Фанатик получит еще одну 
      дополнительную жизнь, и все станет
      по-настоящему весело.</p>
    `,
    name_en: "Fanatic"
  },
  {
    image: require('../assets/cards/v23.png'),
    ava: require('../assets/ava/Property 1=Variant21.png'),
    id: 21,
    type: 'holy',
    name: "Послушник",
    linkCards: [12],
    info: `
      <h3>В начале игры вы узнаете, у кого есть персонаж Священника.</h3>
      <b>Может ли Послушник быть Ведьмой?</b>
      <p>Нет, Послушник является Святым персонажем и всегда сочетается с
      картой команды деревенского духовенства.</p>
      <b>Знает ли священник, кто такой Послушник?</b>
      <p>Нет.</p>
    `,
    name_en: "Acolyte"
  },
  {
    image: require('../assets/cards/v24.png'),
    ava: require('../assets/ava/Property 1=Variant22.png'),
    id: 22,
    type: 'guard',
    name: "Эмиссар",
    linkCards: [], info: `
      <h3>Первые три дня и ночи
вы пользуетесь неограниченной защитой
от всех убийств другими игроками.</h3>
<b>Включает ли это повешение?</b>
<p>Да — Эмиссар переживает
все, даже судью!</p>
<b>Выживет ли Эмиссар
после голосования Деревни или Ведьмы, даже если
они проголосовали за себя?</b>
<p>Да, другие игроки по-прежнему считают это
групповым убийством.</p>
    `,
    name_en: "Emissary"
  },
]

export const getCardById = (id) => cards.find(el => el.id === +id)

export const getLinks = (ids) => cards.filter(a => ids.some(id => +id === a.id))

export const getByNames = (names) => cards.filter(a => names.some(name => name === a.name))

export default cards;