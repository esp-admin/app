import { generateTailwindColorThemes } from '#naive-utils'

export default defineAppConfig({
  naiveui: {
    themeConfig: {
      shared: {
        common: {
          fontFamily: 'Rubik',
          fontWeight: '400',
          fontWeightStrong: '500',
          lineHeight: '1.5',
          borderRadius: '0.375rem',
          borderRadiusSmall: '0.125rem',
        },
        Form: {
          feedbackPadding: '0.5rem',
          labelFontWeight: '500',
        },
        Result: {
          titleFontSizeMedium: '1.3rem',
        },
        Menu: {
          titleFontSizeMedium: '1rem',
        },
        Statistic: {
          valueFontSize: '1rem',
          labelFontSize: '1rem',
        },
        Notification: {
          padding: '1rem',
          titleFontSize: '1.125rem',
        },
        Card: {
          titleFontSizeMedium: '1.25rem',
          titleFontSizeSmall: '1.125rem',
          titleFontWeight: '500',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        },
      },

      ...generateTailwindColorThemes({ neutral: 'zinc' }),
    },
  },
})
