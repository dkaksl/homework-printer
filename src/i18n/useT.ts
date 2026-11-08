import { useTranslation } from 'react-i18next'
import { Translate } from '../blocks/types'

export const useT = () => {
  const { t, i18n } = useTranslation()
  const translate: Translate = (key, options) => String(options ? t(key, options) : t(key))
  return { t: translate, lang: i18n.language }
}
