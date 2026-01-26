export interface TimelineFact {
  year: number;
  title: string;
  description: string;
}

export interface TimelineStep {
  years: [number, number];
  facts: TimelineFact[];
}

export const steps: TimelineStep[] = [
  {
    years: [2015, 2022],
    facts: [
      {
        year: 2015,
        title: "LAUNCH",
        description: "Запуск первого прототипа проекта Alpha.",
      },
      {
        year: 2016,
        title: "DISCOVERY",
        description: "Обнаружение нового космического объекта.",
      },
      {
        year: 2017,
        title: "TESLA SEMI",
        description: "Презентация первого электрического грузовика Tesla Semi.",
      },
      {
        year: 2018,
        title: "ECLIPSE",
        description: "Частное солнечное затмение в Южной Африке.",
      },
      {
        year: 2019,
        title: "INNOVATION",
        description: "Выпуск нового инновационного продукта на рынке.",
      },
      {
        year: 2020,
        title: "RESEARCH",
        description: "Начало крупного исследовательского проекта.",
      },
      {
        year: 2021,
        title: "EXPANSION",
        description: "Расширение команды и выход на международный рынок.",
      },
      {
        year: 2022,
        title: "MILESTONE",
        description: "Достижение ключевой цели проекта.",
      },
    ],
  },
  {
    years: [2000, 2010],
    facts: [
      {
        year: 2000,
        title: "Y2K",
        description: "Переход в новое тысячелетие без глобальных сбоев.",
      },
      {
        year: 2001,
        title: "SPACE",
        description: "Запуск нового космического телескопа.",
      },
      {
        year: 2002,
        title: "TECH",
        description:
          "Выход первой версии популярного программного обеспечения.",
      },
      {
        year: 2005,
        title: "GADGET",
        description: "Презентация первого смартфона с сенсорным экраном.",
      },
      {
        year: 2008,
        title: "FINANCE",
        description: "Мировой финансовый кризис.",
      },
      {
        year: 2010,
        title: "REVOLUTION",
        description:
          "Начало технологической революции в мобильных устройствах.",
      },
    ],
  },
  {
    years: [1990, 1999],
    facts: [
      {
        year: 1990,
        title: "INTERNET",
        description: "Появление первых коммерческих интернет-сервисов.",
      },
      {
        year: 1993,
        title: "WEB",
        description: "Запуск первых веб-браузеров для широкой аудитории.",
      },
      {
        year: 1995,
        title: "WINDOWS 95",
        description: "Выпуск операционной системы Windows 95.",
      },
      {
        year: 1997,
        title: "TECH BOOM",
        description: "Начало бума IT-компаний.",
      },
      {
        year: 1999,
        title: "Y2K PREP",
        description: "Подготовка к переходу в новое тысячелетие.",
      },
    ],
  },
  {
    years: [1980, 1989],
    facts: [
      {
        year: 1980,
        title: "COMPUTER",
        description: "Широкий выход персональных компьютеров на рынок.",
      },
      {
        year: 1984,
        title: "APPLE",
        description: "Презентация первого компьютера Macintosh.",
      },
      {
        year: 1986,
        title: "SPACE SHUTTLE",
        description: "Первый полёт шаттла Challenger после реконструкции.",
      },
      {
        year: 1989,
        title: "WORLD WIDE WEB",
        description: "Изобретение Всемирной паутины Тимом Бернерсом-Ли.",
      },
    ],
  },
  {
    years: [1970, 1979],
    facts: [
      {
        year: 1970,
        title: "ENVIRONMENT",
        description: "Начало экологического движения.",
      },
      {
        year: 1972,
        title: "TECH START",
        description: "Основание первых крупных IT-компаний.",
      },
      {
        year: 1975,
        title: "MICROSOFT",
        description: "Основание компании Microsoft.",
      },
      {
        year: 1978,
        title: "SPACE",
        description: "Запуск новых исследовательских космических программ.",
      },
      {
        year: 1979,
        title: "REVOLUTION",
        description: "Начало технологических изменений в промышленности.",
      },
    ],
  },
  {
    years: [1960, 1969],
    facts: [
      {
        year: 1960,
        title: "SPACE RACE",
        description: "Начало гонки вооружений в космосе.",
      },
      {
        year: 1963,
        title: "MOON PREP",
        description: "Начало подготовки к первой миссии на Луну.",
      },
      {
        year: 1966,
        title: "TECH",
        description: "Развитие вычислительной техники и первых компьютеров.",
      },
      {
        year: 1969,
        title: "MOON LANDING",
        description: "Первое высадка человека на Луну — Apollo 11.",
      },
    ],
  },
];
