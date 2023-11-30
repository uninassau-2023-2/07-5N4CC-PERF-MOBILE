type PokemomType = {
  abilities: string[]
  width: number
  height: number
  name: string
  image: string
  statistics: StatisticsType
}

type StatisticsType = {
  victories: number
  draws: number
  defeats: number
}

export type {
  PokemomType,
  StatisticsType
}