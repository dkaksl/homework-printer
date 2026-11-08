import { defineBlock } from './types'

export const pageBreakBlock = defineBlock<Record<string, never>, null>({
  type: 'page-break',
  kind: 'page-break',
  titleKey: 'Page Break',
  icon: '⤓',
  hasDifficulty: false,
  defaultConfig: () => ({}),
  sampleConfigs: () => [{}],
  generate: () => null,
  problemCount: () => 0,
  layout: (_config, _data, { t }) => [
    {
      key: 'marker',
      heightMm: 0,
      render: ({ mode }) =>
        mode === 'editor' ? (
          <div className="page-break-marker">
            <span>
              {t('Page Break')} · {t('page-break-hint')}
            </span>
          </div>
        ) : null
    }
  ]
})
