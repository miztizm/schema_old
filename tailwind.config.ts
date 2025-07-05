import defaultTheme from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'
import { join } from 'pathe'

export default <Partial<Config>>{
  content: [join(__dirname, `/utils/**/*.ts`)], // Parse the utils folder for demo
 safelist: [
    // Other safelist entries you already have:
    'transition-all', 'duration-200', 'duration-75', 'ease-out', 'ease-in', 'opacity-0', 'opacity-100',
    // Add your dynamic color classes:
    '!bg-red-500/20', '!border-red-500/20', '!text-red-500',

    '!bg-red-500/10', '!border-red-500/10', '!text-white', // schema

    '!bg-green-500/20', '!border-green-500/20', '!text-green-500',

    '!bg-blue-500/20', '!border-blue-500/20', '!text-blue-500',

    '!bg-primary-500/20', '!border-primary-500/20', '!text-primary-500',

    '!bg-muted-500/20', '!border-muted-500/20', '!text-muted-500',

    '!bg-snowy-500/20', '!border-snowy-500/20', '!text-snowy-500',

    '!bg-light-500/20', '!border-light-500/20', '!text-light-500',

    '!bg-dark-500/20', '!border-dark-500/20', '!text-dark-500',

    '!bg-slate-500/20', '!border-slate-500/20', '!text-slate-500',

    '!bg-gray-500/20', '!border-gray-500/20', '!text-gray-500',

    '!bg-zinc-500/20', '!border-zinc-500/20', '!text-zinc-500',

    '!bg-hub-500/20', '!border-hub-500/20', '!text-hub-500',

    '!bg-maroon-flush-500/20', '!border-maroon-flush-500/20', '!text-maroon-flush-500',

    '!bg-endeavour-500/20', '!border-endeavour-500/20', '!text-endeavour-500',

    '!bg-purple-500/20', '!border-purple-500/20', '!text-purple-500',

    '!bg-violet-500/20', '!border-violet-500/20', '!text-violet-500',

    '!bg-indigo-500/20', '!border-indigo-500/20', '!text-indigo-500',

    '!bg-sky-500/20', '!border-sky-500/20', '!text-sky-500',

    '!bg-cyan-500/20', '!border-cyan-500/20', '!text-cyan-500',

    '!bg-teal-500/20', '!border-teal-500/20', '!text-teal-500',

    '!bg-emerald-500/20', '!border-emerald-500/20', '!text-emerald-500',

    '!bg-lime-500/20', '!border-lime-500/20', '!text-lime-500',

    '!bg-yellow-500/20', '!border-yellow-500/20', '!text-yellow-500',

    '!bg-amber-500/20', '!border-amber-500/20', '!text-amber-500',

    '!bg-orange-500/20', '!border-orange-500/20', '!text-orange-500',

    '!bg-gold-500/20', '!border-gold-500/20', '!text-gold-500',

    '!bg-bronze-500/20', '!border-bronze-500/20', '!text-bronze-500',

    '!bg-brown-500/20', '!border-brown-500/20', '!text-brown-500',

    '!bg-chocolate-500/20', '!border-chocolate-500/20', '!text-chocolate-500',

    '!bg-coffee-500/20', '!border-coffee-500/20', '!text-coffee-500',

    '!bg-khaki-500/20', '!border-khaki-500/20', '!text-khaki-500',

    '!bg-olive-500/20', '!border-olive-500/20', '!text-olive-500',

    '!bg-lime-green-500/20', '!border-lime-green-500/20', '!text-lime-green-500',

    '!bg-forest-500/20', '!border-forest-500/20', '!text-forest-500',

    '!bg-mint-500/20', '!border-mint-500/20', '!text-mint-500',

    '!bg-teal-green-500/20', '!border-teal-green-500/20', '!text-teal-green-500',

    '!bg-aqua-500/20', '!border-aqua-500/20', '!text-aqua-500',

    '!bg-turquoise-500/20', '!border-turquoise-500/20', '!text-turquoise-500',

    '!bg-cerulean-500/20', '!border-cerulean-500/20', '!text-cerulean-500',

    '!bg-sky-blue-500/20', '!border-sky-blue-500/20', '!text-sky-blue-500',

    '!bg-success-500/20', '!border-success-500/20', '!text-success-500',
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px'
      },
      colors: {
        background: 'rgb(var(--ui-background) / <alpha-value>)',
        foreground: 'rgb(var(--ui-foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'var(--color-secondary-DEFAULT)',
          50: 'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
          950: 'var(--color-secondary-950)',
        },
        sred: {
          DEFAULT: 'var(--color-sred-500)',
          50: 'var(--color-sred-50)',
          100: 'var(--color-sred-100)',
          200: 'var(--color-sred-200)',
          300: 'var(--color-sred-300)',
          400: 'var(--color-sred-400)',
          500: 'var(--color-sred-500)',
          600: 'var(--color-sred-600)',
          700: 'var(--color-sred-700)',
          800: 'var(--color-sred-800)',
          900: 'var(--color-sred-900)',
          950: 'var(--color-sred-950)'
        },
        sblack: {
          DEFAULT: 'var(--color-sblack-500)',
          50: 'var(--color-sblack-50)',
          100: 'var(--color-sblack-100)',
          200: 'var(--color-sblack-200)',
          300: 'var(--color-sblack-300)',
          400: 'var(--color-sblack-400)',
          500: 'var(--color-sblack-500)',
          600: 'var(--color-sblack-600)',
          700: 'var(--color-sblack-700)',
          800: 'var(--color-sblack-800)',
          900: 'var(--color-sblack-900)',
        },
        muted: {
          50: 'var(--color-muted-50)',
          100: 'var(--color-muted-100)',
          200: 'var(--color-muted-200)',
          300: 'var(--color-muted-300)',
          400: 'var(--color-muted-400)',
          500: 'var(--color-muted-500)',
          600: 'var(--color-muted-600)',
          700: 'var(--color-muted-700)',
          800: 'var(--color-muted-800)',
          900: 'var(--color-muted-900)',
          950: 'var(--color-muted-950)',
          DEFAULT: 'var(--color-muted-DEFAULT)',
        },
        info: {
          50: 'var(--color-info-50)',
          100: 'var(--color-info-100)',
          200: 'var(--color-info-200)',
          300: 'var(--color-info-300)',
          400: 'var(--color-info-400)',
          500: 'var(--color-info-500)',
          600: 'var(--color-info-600)',
          700: 'var(--color-info-700)',
          800: 'var(--color-info-800)',
          900: 'var(--color-info-900)',
          950: 'var(--color-info-950)',
        },
        success: {
          50: 'var(--color-success-50)',
          100: 'var(--color-success-100)',
          200: 'var(--color-success-200)',
          300: 'var(--color-success-300)',
          400: 'var(--color-success-400)',
          500: 'var(--color-success-500)',
          600: 'var(--color-success-600)',
          700: 'var(--color-success-700)',
          800: 'var(--color-success-800)',
          900: 'var(--color-success-900)',
          950: 'var(--color-success-950)',
        },
        warning: {
          50: 'var(--color-warning-50)',
          100: 'var(--color-warning-100)',
          200: 'var(--color-warning-200)',
          300: 'var(--color-warning-300)',
          400: 'var(--color-warning-400)',
          500: 'var(--color-warning-500)',
          600: 'var(--color-warning-600)',
          700: 'var(--color-warning-700)',
          800: 'var(--color-warning-800)',
          900: 'var(--color-warning-900)',
          950: 'var(--color-warning-950)',
        },
        danger: {
          50: 'var(--color-danger-50)',
          100: 'var(--color-danger-100)',
          200: 'var(--color-danger-200)',
          300: 'var(--color-danger-300)',
          400: 'var(--color-danger-400)',
          500: 'var(--color-danger-500)',
          600: 'var(--color-danger-600)',
          700: 'var(--color-danger-700)',
          800: 'var(--color-danger-800)',
          900: 'var(--color-danger-900)',
          950: 'var(--color-danger-950)',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', ...defaultTheme.fontFamily.sans],
        heading: ['Inter Variable', ...defaultTheme.fontFamily.mono],
        alt: ['Inter Variable', ...defaultTheme.fontFamily.sans],
        mono: ['Inter Variable', ...defaultTheme.fontFamily.mono],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            'h1, h2, h3, h4': {
              fontWeight: theme('fontWeight.bold'),
              scrollMarginTop: 'var(--scroll-mt)'
            },
            'h1 a, h2 a, h3 a, h4 a': {
              borderBottom: 'none !important',
              color: 'inherit',
              fontWeight: 'inherit'
            },
            a: {
              fontWeight: theme('fontWeight.medium'),
              textDecoration: 'none',
              borderBottom: '1px solid transparent'
            },
            'a:hover': {
              borderColor: 'var(--tw-prose-links)'
            },
            'a:has(> code)': {
              borderColor: 'transparent !important'
            },
            'a code': {
              color: 'var(--tw-prose-code)',
              border: '1px dashed var(--tw-prose-pre-border)'
            },
            'a:hover code': {
              color: 'var(--tw-prose-links)',
              borderColor: 'var(--tw-prose-links)'
            },
            pre: {
              borderRadius: '0.375rem',
              border: '1px solid var(--tw-prose-pre-border)',
              color: 'var(--tw-prose-pre-code) !important',
              backgroundColor: 'var(--tw-prose-pre-bg) !important',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            },
            code: {
              backgroundColor: 'var(--tw-prose-pre-bg)',
              padding: '0 0.375rem',
              display: 'inline-block',
              borderRadius: '0.375rem',
              border: '1px solid var(--tw-prose-pre-border)'
            },
            'code::before, code::after': {
              content: '""'
            },
            'blockquote p:first-of-type::before, blockquote p:last-of-type::after': {
              content: '""'
            },
            'input[type="checkbox"]': {
              color: 'rgb(var(--color-primary-500))',
              borderRadius: theme('borderRadius.DEFAULT'),
              borderColor: 'rgb(var(--color-gray-300))',
              height: theme('spacing.4'),
              width: theme('spacing.4'),
              marginTop: '-3.5px !important',
              marginBottom: '0 !important',
              '&:focus': {
                '--tw-ring-offset-width': 0
              }
            },
            'input[type="checkbox"]:checked': {
              borderColor: 'rgb(var(--color-primary-500))'
            },
            'input[type="checkbox"]:disabled': {
              opacity: 0.5,
              cursor: 'not-allowed'
            },
            'ul.contains-task-list': {
              marginLeft: '-1.625em'
            },
            'ul ul, ul ol': {
              paddingLeft: theme('padding.6')
            },
            'ul > li.task-list-item': {
              paddingLeft: '0 !important',
              '> ul.contains-task-list': {
                marginLeft: 'initial'
              },
              '> p': {
                margin: 0
              }
            },
            'ul > li.task-list-item input': {
              marginRight: '7px'
            },
            'ul > li.task-list-item a, p > span.issue-badge': {
              margin: '0 !important'
            },
            'ul > li > button': {
              verticalAlign: 'baseline !important'
            },
            table: {
              display: 'block',
              overflowX: 'auto',
              code: {
                display: 'inline-flex'
              }
            }
          }
        },
        primary: {
          css: {
            '--tw-prose-body': 'rgb(var(--color-gray-700))',
            '--tw-prose-headings': 'rgb(var(--color-gray-900))',
            '--tw-prose-lead': 'rgb(var(--color-gray-600))',
            '--tw-prose-links': 'rgb(var(--color-primary-500))',
            '--tw-prose-bold': 'rgb(var(--color-gray-900))',
            '--tw-prose-counters': 'rgb(var(--color-gray-500))',
            '--tw-prose-bullets': 'rgb(var(--color-gray-300))',
            '--tw-prose-hr': 'rgb(var(--color-gray-200))',
            '--tw-prose-quotes': 'rgb(var(--color-gray-900))',
            '--tw-prose-quote-borders': 'rgb(var(--color-gray-200))',
            '--tw-prose-captions': 'rgb(var(--color-gray-500))',
            '--tw-prose-code': 'rgb(var(--color-gray-900))',
            '--tw-prose-pre-code': 'rgb(var(--color-gray-900))',
            '--tw-prose-pre-bg': 'rgb(var(--color-gray-50))',
            '--tw-prose-pre-border': 'rgb(var(--color-gray-200))',
            '--tw-prose-th-borders': 'rgb(var(--color-gray-300))',
            '--tw-prose-td-borders': 'rgb(var(--color-gray-200))',
            '--tw-prose-invert-body': 'rgb(var(--color-gray-200))',
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': 'rgb(var(--color-gray-400))',
            '--tw-prose-invert-links': 'rgb(var(--color-primary-400))',
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': 'rgb(var(--color-gray-400))',
            '--tw-prose-invert-bullets': 'rgb(var(--color-gray-600))',
            '--tw-prose-invert-hr': 'rgb(var(--color-gray-800))',
            '--tw-prose-invert-quotes': 'rgb(var(--color-gray-100))',
            '--tw-prose-invert-quote-borders': 'rgb(var(--color-gray-700))',
            '--tw-prose-invert-captions': 'rgb(var(--color-gray-400))',
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.white'),
            '--tw-prose-invert-pre-bg': 'rgb(var(--color-gray-800))',
            '--tw-prose-invert-pre-border': 'rgb(var(--color-gray-700))',
            '--tw-prose-invert-th-borders': 'rgb(var(--color-gray-700))',
            '--tw-prose-invert-td-borders': 'rgb(var(--color-gray-800))'
          }
        },
        invert: {
          css: {
            '--tw-prose-pre-border': 'var(--tw-prose-invert-pre-border)',
            'input[type="checkbox"]': {
              backgroundColor: 'rgb(var(--color-gray-800))',
              borderColor: 'rgb(var(--color-gray-700))'
            },
            'input[type="checkbox"]:checked': {
              backgroundColor: 'rgb(var(--color-primary-400))',
              borderColor: 'rgb(var(--color-primary-400))'
            }
          }
      }
      })
    }
  }
}
