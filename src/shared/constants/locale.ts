export enum ELocales {
  RU = 'ru-RU',
  EN = 'en-US',
}

export const isRuLocale = (locale?:  ELocales): boolean =>
  !!locale && locale === ELocales.RU

export const defaultLocale = ELocales.RU
