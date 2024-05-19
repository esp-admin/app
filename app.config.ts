// import { theme } from '#tailwind-config'

export default defineAppConfig({
  naiveui: {
    themeConfig: {
      shared: {
        common: {
          fontFamily: 'Rubik', // theme.fontFamily.sans[0]

          fontWeight: '400', // theme.fontWeight.light
          fontWeightStrong: '500', // theme.fontWeight.medium

          lineHeight: '1.5', // theme.lineHeight.normal

          borderRadius: '0.375rem', // theme.borderRadius.md
          borderRadiusSmall: '0.125rem', // theme.borderRadius.sm
        },
        Form: {
          feedbackPadding: '0.5rem', // theme.padding[2]
          labelFontWeight: '500', // theme.fontWeight.medium
        },
        Result: {
          titleFontSizeMedium: '1.3rem', // theme.fontSize.lg[0]
        },
        Menu: {
          titleFontSizeMedium: '1rem', // theme.fontSize.base[0]
        },
        Statistic: {
          valueFontSize: '1rem', // theme.fontSize.base[0]
          labelFontSize: '1rem', // theme.fontSize.base[0]
        },
        Notification: {
          padding: '1rem', // theme.padding[4]
          titleFontSize: '1.125rem', // theme.fontSize.lg
        },
        Card: {
          titleFontSizeMedium: '1.25rem', // theme.fontSize.xl[0]
          titleFontSizeSmall: '1.125rem', // theme.fontSize.lg[0]
          titleFontWeight: '500', // theme.fontWeight.medium
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', // theme.boxShadow.lg
        },
      },

      light: {
        common: {
          textColorBase: '#27272a', // theme.colors.zinc[800]
          textColor1: '#3f3f46', // theme.colors.zinc[700]
          textColor2: '#52525b', // theme.colors.zinc[600]
          textColor3: '#a1a1aa', // theme.colors.zinc[400]
          textColorDisabled: '#52525b', // theme.colors.zinc[600]

          bodyColor: '#fff', // theme.colors.white
          borderColor: '#d4d4d8', // theme.colors.zinc[300]
          cardColor: '#fafafa', // theme.colors.zinc[50]
          inputColor: '#fafafa', // theme.colors.zinc[50]

          primaryColor: '#2563eb', // theme.colors.blue[600]
          primaryColorHover: '#3b82f6', // theme.colors.blue[500]
          primaryColorPressed: '#1d4ed8', // theme.colors.blue[700]
          primaryColorSuppl: '#1e40af', // theme.colors.blue[800]

          errorColor: '#dc2626', // theme.colors.red[600]
          errorColorHover: '#ef4444', // theme.colors.red[500]
          errorColorPressed: '#b91c1c', // theme.colors.red[700]
          errorColorSuppl: '#991b1b', // theme.colors.red[800]

          successColor: '#16a34a', // theme.colors.green[600]
          successColorHover: '#22c55e', // theme.colors.green[500]
          successColorPressed: '#15803d', // theme.colors.green[700]
          successColorSuppl: '#166534', // theme.colors.green[800]

          warningColor: '#d97706', // theme.colors.amber[600]
          warningColorHover: '#f59e0b', // theme.colors.amber[500]
          warningColorPressed: '#b45309', // theme.colors.amber[700]
          warningColorSuppl: '#92400e', // theme.colors.amber[800]
        },
        Card: {
          borderColor: '#d4d4d8', // theme.colors.zinc[300]
        },
        List: {
          color: '#fff', // theme.colors.white
        },
        Tooltip: {
          color: '#fafafa', // theme.colors.zinc[50]
          textColor: '#3f3f46', // theme.colors.zinc[700]
        },
        Pagination: {
          itemColorActiveHover: '#2563eb', // theme.colors.blue[600]
          itemColorActive: '#2563eb', // theme.colors.blue[600]
          itemTextColorActive: '#fff', // theme.colors.white
        },
        Divider: {
          color: '#e4e4e7', // theme.colors.zinc[200]
        },
        Layout: {
          siderColor: '#fff', // theme.colors.white
          headerColor: '#fff', // theme.colors.white
        },
      },

      dark: {
        common: {
          textColorBase: '#e4e4e7', // theme.colors.zinc[200]
          textColor1: '#e4e4e7', // theme.colors.zinc[200]
          textColor2: '#d4d4d8', // theme.colors.zinc[300]
          textColor3: '#a1a1aa', // theme.colors.zinc[400]
          textColorDisabled: '#71717a', // theme.colors.zinc[500]

          bodyColor: '#18181b', // theme.colors.zinc[900]
          borderColor: '#3f3f46', // theme.colors.zinc[700]
          cardColor: '#27272a', // theme.colors.zinc[800]
          inputColor: '#27272a', // theme.colors.zinc[800]

          primaryColor: '#60a5fa', // theme.colors.blue[400]
          primaryColorHover: '#93c5fd', // theme.colors.blue[300]
          primaryColorPressed: '#2563eb', // theme.colors.blue[600]
          primaryColorSuppl: '#1d4ed8', // theme.colors.blue[700]

          errorColor: '#f87171', // theme.colors.red[400]
          errorColorHover: '#fca5a5', // theme.colors.red[300]
          errorColorPressed: '#dc2626', // theme.colors.red[600]
          errorColorSuppl: '#b91c1c', // theme.colors.red[700]

          successColor: '#4ade80', // theme.colors.green[400]
          successColorHover: '#86efac', // theme.colors.green[300]
          successColorPressed: '#16a34a', // theme.colors.green[600]
          successColorSuppl: '#15803d', // theme.colors.green[700]

          warningColor: '#fbbf24', // theme.colors.amber[400]
          warningColorHover: '#fcd34d', // theme.colors.amber[300]
          warningColorPressed: '#d97706', // theme.colors.amber[600]
          warningColorSuppl: '#b45309', // theme.colors.amber[700]
        },
        Card: {
          borderColor: '#3f3f46', // theme.colors.zinc[700]
          textColor: '#e4e4e7', // theme.colors.zinc[200]
        },
        Tooltip: {
          color: '#27272a', // theme.colors.zinc[800]
        },
        List: {
          color: '#18181b', // theme.colors.zinc[900]
        },
        Pagination: {
          itemColorActiveHover: '#60a5fa', // theme.colors.blue[400]
          itemColorActive: '#60a5fa', // theme.colors.blue[400]
          itemTextColorActive: '#18181b', // theme.colors.zinc[900]
        },
        Layout: {
          siderColor: '#18181b', // theme.colors.zinc[900]
          headerColor: '#18181b', // theme.colors.zinc[900]
        },
      },
    },
  },
})
