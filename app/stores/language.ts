// stores/languageStore.ts

/* 
export const languageStore = reactive({
    currentLanguage: 'en',
    page: null, // Initialize page as null or with a default value
  
    refreshContent: async () => {
      try {
        const route = useRoute()
        const currentPageSegment = route.path.split('/')[1]
        const localizedPath = `/${languageStore.currentLanguage}/${currentPageSegment}`
        console.log('Refreshing content for:', localizedPath)
  
        const content = await queryContent(localizedPath).findOne()
        console.log('Content:', content)
        if (!content) {
          throw createError({ statusCode: 404, statusMessage: 'Page not found' })
        }
        languageStore.page = content // Update the page data in the store
      } catch (error) {
        console.error('Error refreshing content:', error)
        // Handle the error as needed
      }
    },
    changeLanguage: async (newLocale: string) => {
      languageStore.currentLanguage = newLocale
      await languageStore.refreshContent()
    }
  }) */