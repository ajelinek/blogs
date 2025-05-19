/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | string | undefined): string {
  if (!date) {
    return 'No date'
  }

  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj)
  } catch (error) {
    console.error('Invalid date format:', date)
    return 'Invalid date'
  }
}

/**
 * Calculate reading time for content
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
