export default defineAppConfig({
  ui: {
    primary: 'sred',
    gray: 'zinc', 
    variables: {
      light: {
        background: '255 255 255',
        foreground: 'var(--color-gray-700)',
      },
      dark: {
        background: 'var(--color-sblack-800)',
        foreground: 'var(--color-gray-200)',
      },
      header: {
        height: '3rem'
      }
    },
    icons: {
      dark: 'i-heroicons-moon-20-solid',
      light: 'i-heroicons-sun-20-solid',
      system: 'i-heroicons-computer-desktop-20-solid',
      search: 'i-heroicons-magnifying-glass-20-solid',
      external: 'i-heroicons-arrow-up-right-20-solid',
      chevron: 'i-heroicons-chevron-down-20-solid',
      hash: 'i-heroicons-hashtag-20-solid',
      menu: 'i-heroicons-bars-3-20-solid',
      close: 'i-heroicons-x-mark-20-solid',
      check: 'i-heroicons-check-circle-20-solid'
    },
    presets: {
      button: {
        primary: {
          color: 'white',
          variant: 'solid'
        },
        secondary: {
          color: 'gray',
          variant: 'ghost'
        },
        input: {
          color: 'white',
          variant: 'outline',
          ui: {
            font: '',
            color: {
              white: {
                outline: 'ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:ring-gray-300 dark:hover:ring-gray-700 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400'
              }
            }
          }
        }
      }
    },
    avatar: {
      default: {
        icon: 'i-ph-image'
      }
    },
    button: {
      base: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0',
  font: 'font-medium',
  rounded: 'rounded-md',
  truncate: 'text-left break-all line-clamp-1',
  block: 'w-full flex justify-center items-center',
  inline: 'inline-flex items-center',
  size: {
    '2xs': 'text-xs',
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-sm',
    xl: 'text-base'
  },
  gap: {
    '2xs': 'gap-x-1',
    xs: 'gap-x-1.5',
    sm: 'gap-x-1.5',
    md: 'gap-x-2',
    lg: 'gap-x-2.5',
    xl: 'gap-x-2.5'
  },
  padding: {
    '2xs': 'px-2 py-1',
    xs: 'px-2.5 py-1.5',
    sm: 'px-2.5 py-1.5',
    md: 'px-3 py-2',
    lg: 'px-3.5 py-2.5',
    xl: 'px-3.5 py-2.5'
  },
  square: {
    '2xs': 'p-1',
    xs: 'p-1.5',
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
    xl: 'p-2.5'
  },
  color: {
    white: {
      solid: 'shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white aria-disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 dark:aria-disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
      ghost: 'text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-900 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400'
    },
    gray: {
      solid: 'shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 aria-disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 dark:aria-disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
      ghost: 'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/60 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
      link: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400'
    },
    black: {
      solid: 'shadow-sm text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 aria-disabled:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:disabled:bg-white dark:aria-disabled:bg-white focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
      link: 'text-gray-900 dark:text-white underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400'
    }
  },
  variant: {
    solid: 'shadow-sm text-white dark:text-gray-900 bg-{color}-500 hover:bg-{color}-600 disabled:bg-{color}-500 aria-disabled:bg-{color}-500 dark:bg-{color}-400 dark:hover:bg-{color}-500 dark:disabled:bg-{color}-400 dark:aria-disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 dark:focus-visible:outline-{color}-400',
    outline: 'ring-1 ring-inset ring-current text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent aria-disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
    soft: 'text-{color}-500 dark:text-{color}-400 bg-{color}-50 hover:bg-{color}-100 disabled:bg-{color}-50 aria-disabled:bg-{color}-50 dark:bg-{color}-950 dark:hover:bg-{color}-900 dark:disabled:bg-{color}-950 dark:aria-disabled:bg-{color}-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
    ghost: 'text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent aria-disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
    link: 'text-{color}-500 hover:text-{color}-600 disabled:text-{color}-500 aria-disabled:text-{color}-500 dark:text-{color}-400 dark:hover:text-{color}-500 dark:disabled:text-{color}-400 dark:aria-disabled:text-{color}-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400'
  },
  icon: {
    base: 'flex-shrink-0',
    loading: 'animate-spin',
    size: {
      '2xs': 'h-4 w-4',
      xs: 'h-4 w-4',
      sm: 'h-5 w-5',
      md: 'h-5 w-5',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6'
    }
  },
  default: {
    size: 'sm',
    variant: 'solid',
    color: 'black',
    loadingIcon: 'i-ph-spinner'
  }
    },
    input: {
      default: {
        loadingIcon: 'i-ph-spinner',
        color: 'white', // Always use black
        size: 'sm',
        rounded: 'md',
        variant: 'outline', // Ensure the variant supports color
      },
      color: {
        white: {
          outline: "px-3 py-2 text-sm transition-all shadow-none bg-white dark:bg-transparent text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-800 focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-800 placeholder-gray-400 dark:placeholder-gray-400 focus-within:ring-gray-400 dark:focus-within:ring-gray-400 focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400"
        }
      }
    },
    select: {
      default: {
        loadingIcon: 'i-ph-spinner',
        trailingIcon: 'i-ph-caret-down'
      }
    },
    selectMenu: {
      default: {
        selectedIcon: 'i-ph-check'
      }
    },
    notification: {
      default: {
        closeButton: {
          icon: 'i-ph-x'
        }
      }
    },
    commandPalette: {
      default: {
        icon: 'i-ph-magnifying-glass',
        loadingIcon: 'i-ph-spinner',
        selectedIcon: 'i-ph-check',
        emptyState: {
          icon: 'i-ph-magnifying-glass'
        },
        closeButton: {
          icon: 'i-ph-x'
        }
      }
    },
    table: {
      default: {
        sortAscIcon: 'i-ph-sort-ascending',
        sortDescIcon: 'i-ph-sort-descending',
        sortButton: {
          icon: 'i-ph-list'
        },
        loadingState: {
          icon: 'i-ph-spinner'
        },
        emptyState: {
          icon: 'i-ph-database'
        }
      }
    },
    pagination: {
      default: {
        prevButton: {
          icon: 'i-ph-arrow-left'
        },
        nextButton: {
          icon: 'i-ph-arrow-right'
        }
      }
    },
    card: {
      base: '',
      background: 'bg-white dark:bg-gray-800/30 bg-clip-padding backdrop-filter backdrop-blur-lg no-backdrop',
      divide: 'divide-y divide-gray-200 dark:divide-gray-800',
      ring: 'ring-1 ring-gray-200 dark:ring-gray-800/70',
      rounded: 'rounded-md',
      shadow: 'shadow-lg',
      body: {
        base: '',
        background: '',
        padding: 'p-4 sm:p-6'
      },
      header: {
        base: '',
        background: '',
        padding: 'px-4 py-5 sm:px-6'
      },
      footer: {
        base: '',
        background: '',
        padding: 'px-4 py-4 sm:px-6'
      }
    },
    tooltip: {
      background: '!bg-background',
      popper: {
        strategy: 'absolute'
      }
    },
    divider: {
      label: 'uppercase text-xs text-gray-400 dark:text-gray-500', // Label-specific class
    },
    breadcrumb: {
      divider: {
        base: 'w-4 h-4'
      },
      default: {
        divider: 'i-ph-caret-right'
      }
    },
    header: {
      wrapper: 'lg:mb-0 lg:border-0',
      links: {
        trailingIcon: {
          base: 'w-4 h-4'
        },
        popover: {
          popper: {
            strategy: 'absolute'
          },
          ui: {
            width: 'w-[16rem]'
          }
        }
      },
      popover: {
        links: {
          active: 'dark:bg-gray-950/50',
          inactive: 'dark:hover:bg-gray-950/50'
        }
      },
      button: {
        icon: {
          open: 'i-ph-list',
          close: 'i-ph-x'
        }
      }
    },
    navigation: {
      accordion: {
        button: {
          trailingIcon: {
            base: 'w-4 h-4'
          }
        }
      }
    },
    page: {
      card: {
        to: 'dark:hover:bg-gray-900/50'
      }
    },
    content: {
      search: {
        fileIcon: {
          name: 'i-ph-file-text'
        }
      },
      toc: {
        button: {
          trailingIcon: {
            base: 'w-4 h-4'
          }
        }
      },
      surround: {
        icon: {
          prev: 'i-ph-arrow-left',
          next: 'i-ph-arrow-right'
        }
      },
      collapsible: {
        button: {
          icon: {
            base: 'w-3 h-3'
          }
        }
      },
      prose: {
        code: {
          button: {
            icon: {
              copy: 'i-ph-copy',
              copied: 'i-ph-check-square'
            }
          },
          icon: {
            terminal: 'i-ph-terminal-window'
          }
        }
      }
    }
  }/* ,
  nui: {
    // #region base
    BaseAccordion: {
      action: 'dot',
      color: 'default',
      dotColor: 'primary',
      rounded: 'sm',
    },
    BaseAvatar: {
      color: 'muted',
      rounded: 'full',
      size: 'sm',
    },
    BaseAvatarGroup: {
      limit: 4,
      size: 'sm',
    },
    BaseBreadcrumb: {
      color: 'primary',
    },
    BaseButton: {
      color: 'default',
      rounded: 'sm',
      size: 'md',
      variant: 'solid',
    },
    BaseButtonAction: {
      color: 'default',
      rounded: 'sm',
    },
    BaseButtonClose: {
      color: 'default',
      rounded: 'full',
      size: 'sm',
    },
    BaseButtonGroup: {},
    BaseButtonIcon: {
      color: 'default',
      rounded: 'sm',
      size: 'md',
    },
    BaseCard: {
      color: 'default',
      rounded: 'sm',
    },
    BaseDropdown: {
      buttonColor: 'default',
      buttonSize: 'md',
      color: 'default',
      placement: 'bottom-start',
      rounded: 'sm',
      size: 'md',
      variant: 'button',
    },
    BaseDropdownDivider: {},
    BaseDropdownItem: {
      color: 'primary',
      contrast: 'default',
      rounded: 'sm',
    },
    BaseHeading: {
      as: 'p',
      lead: 'normal',
      size: 'xl',
      weight: 'semibold',
    },
    BaseIconBox: {
      color: 'default',
      rounded: 'sm',
      size: 'xs',
      variant: 'solid',
    },
    BaseKbd: {
      color: 'default',
      rounded: 'sm',
      size: 'sm',
    },
    BaseLink: {},
    BaseList: {},
    BaseListItem: {},
    BaseMessage: {
      color: 'default',
      rounded: 'sm',
      defaultIcons: {
        muted: 'akar-icons:info-fill',
        'muted-contrast': 'akar-icons:info-fill',
        default: 'akar-icons:info-fill',
        'default-contrast': 'akar-icons:info-fill',
        info: 'akar-icons:info-fill',
        success: 'carbon:checkmark-filled',
        warning: 'ci:warning',
        danger: 'ph:warning-octagon-fill',
        primary: 'akar-icons:info-fill',
      },
    },
    BasePagination: {
      color: 'primary',
      rounded: 'sm',
    },
    BaseParagraph: {
      as: 'p',
      lead: 'normal',
      size: 'md',
      weight: 'normal',
    },
    BasePlaceholderPage: {
      imageSize: 'xs',
    },
    BasePlaceload: {},
    BaseProgress: {
      color: 'primary',
      contrast: 'default',
      rounded: 'full',
      size: 'sm',
    },
    BaseProgressCircle: {
      color: 'primary',
    },
    BaseProse: {
      rounded: 'none',
    },
    BaseSnack: {
      color: 'default',
      size: 'md',
    },
    BaseTabs: {
      color: 'primary',
      justify: 'start',
      type: 'tabs',
    },
    BaseTabSlider: {
      color: 'default',
      justify: 'start',
      rounded: 'lg',
      size: 'md',
    },
    BaseTag: {
      color: 'default',
      rounded: 'lg',
      size: 'md',
      variant: 'solid',
    },
    BaseText: {
      lead: 'normal',
      size: 'md',
      weight: 'normal',
    },
    BaseThemeSwitch: {
      disableTransitions: false,
    },
    BaseThemeToggle: {
      disableTransitions: false,
    },
    // #endregion

    // #region form
    BaseAutocomplete: {
      contrast: 'default',
      i18n: {
        empty: 'Nothing found.',
        pending: 'Loading ...',
      },
      rounded: 'sm',
      size: 'md',
    },
    BaseAutocompleteItem: {
      rounded: 'sm',
    },
    BaseCheckbox: {
      color: 'default',
      rounded: 'sm',
    },
    BaseCheckboxAnimated: {
      color: 'primary',
    },
    BaseCheckboxHeadless: {},
    BaseFullscreenDropfile: {
      color: 'primary',
    },
    BaseInput: {
      contrast: 'default',
      rounded: 'sm',
      size: 'md',
    },
    BaseInputFile: {
      contrast: 'default',
      rounded: 'sm',
      size: 'md',
      i18n: {
        empty: 'No file chosen',
        invalid: 'Invalid file selected',
        multiple: '{count} files selected',
      },
    },
    BaseInputFileHeadless: {},
    BaseInputNumber: {
      contrast: 'default',
      rounded: 'sm',
      size: 'md',
    },
    BaseInputHelpText: {
      color: 'default',
    },
    BaseListbox: {
      contrast: 'default',
      placement: 'bottom-start',
      rounded: 'sm',
      size: 'md',
    },
    BaseListboxItem: {},
    BaseRadio: {
      color: 'default',
    },
    BaseRadioHeadless: {},
    BaseSelect: {
      contrast: 'default',
      rounded: 'sm',
      size: 'md',
    },
    BaseSwitchBall: {
      color: 'primary',
    },
    BaseSwitchThin: {
      color: 'primary',
    },
    BaseTextarea: {
      contrast: 'default',
      rounded: 'sm',
      size: 'md',
    },
    BaseTreeSelect: {},
    BaseTreeSelectItem: {
      rounded: 'sm',
    },
    // #endregion
  }, */
})
