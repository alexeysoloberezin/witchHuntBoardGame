export interface Card {
  image: string;
  ava: string;
  type: string;
  id: number;
  name: string;
  name_en: string;
  linkCards: number[]; // Здесь тип зависит от того, что представляет linkCards
  info: string;
}