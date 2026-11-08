import { ComponentType } from 'react'
import { Difficulty } from '../difficulty'
import { BlockKind, LayoutUnit } from '../layout/page'
import { Rng } from '../util/random'

export type Translate = (key: string, options?: Record<string, string | number>) => string

export interface GenerateContext {
  difficulty: Difficulty
  rng: Rng
  t: Translate
  lang: string
}

export interface LayoutContext {
  /** 1-based, counted over sections (flow blocks) across the whole document. */
  sectionNumber: number
  /** 1-based, continues from the previous section's problems. */
  firstProblemNumber: number
  t: Translate
}

export interface SettingsProps<Config> {
  config: Config
  onChange: (config: Config) => void
}

export interface BlockDefinition<Config, Data> {
  type: string
  kind: BlockKind
  titleKey: string
  icon: string
  hasDifficulty: boolean
  defaultConfig: () => Config
  /** Extreme settings (max counts, every option) the layout contract tests run at every difficulty. */
  sampleConfigs: () => Config[]
  generate: (config: Config, context: GenerateContext) => Data
  problemCount: (data: Data) => number
  layout: (config: Config, data: Data, context: LayoutContext) => LayoutUnit[]
  Settings?: ComponentType<SettingsProps<Config>>
}

// The registry holds blocks with different config types; each definition only
// ever sees the config it created, so the erasure is confined to the registry.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyBlockDefinition = BlockDefinition<any, any>

export const defineBlock = <Config, Data>(definition: BlockDefinition<Config, Data>) =>
  definition
