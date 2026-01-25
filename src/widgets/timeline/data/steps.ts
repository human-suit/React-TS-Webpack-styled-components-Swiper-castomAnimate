export interface TimelineFact {
  year: number;
  title: string;
  description: string;
}

export interface TimelineStep {
  years: [number, number]; // диапазон годов
  facts: TimelineFact[];
}

export const steps: TimelineStep[] = [
  {
    years: [2015, 2022],
    facts: [
      {
        year: 2015,
        title: "Исторический факт 1",
        description: "Описание события 1",
      },
      {
        year: 2016,
        title: "Исторический факт 2",
        description: "Описание события 2",
      },
      {
        year: 2017,
        title: "Исторический факт 3",
        description: "Описание события 3",
      },
      {
        year: 2018,
        title: "Исторический факт 4",
        description: "Описание события 4",
      },
      {
        year: 2019,
        title: "Исторический факт 5",
        description: "Описание события 5",
      },
      {
        year: 2020,
        title: "Исторический факт 6",
        description: "Описание события 6",
      },
      {
        year: 2021,
        title: "Исторический факт 7",
        description: "Описание события 7",
      },
      {
        year: 2022,
        title: "Исторический факт 8",
        description: "Описание события 8",
      },
    ],
  },
  {
    years: [2000, 2010],
    facts: [
      {
        year: 2000,
        title: "Исторический факт 1",
        description: "Описание события 1",
      },
      {
        year: 2001,
        title: "Исторический факт 2",
        description: "Описание события 2",
      },
      {
        year: 2002,
        title: "Исторический факт 3",
        description: "Описание события 3",
      },
      // ...
      {
        year: 2010,
        title: "Исторический факт 11",
        description: "Описание события 11",
      },
    ],
  },
  {
    years: [1990, 1999],
    facts: [
      {
        year: 1990,
        title: "Исторический факт 1",
        description: "Описание события 1",
      },
      {
        year: 1995,
        title: "Исторический факт 2",
        description: "Описание события 2",
      },
      {
        year: 1999,
        title: "Исторический факт 3",
        description: "Описание события 3",
      },
    ],
  },
];
