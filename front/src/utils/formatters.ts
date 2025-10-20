/**
 * Formata o ano de publicação
 */
export const formatYear = (year: number): string => {
  return year.toString()
}

/**
 * Formata o número de páginas
 */
export const formatPages = (pages: number): string => {
  return `${pages} páginas`
}

/**
 * Formata a avaliação (rating)
 */
export const formatRating = (rating: number): string => {
  return rating.toFixed(1)
}

/**
 * Trunca texto longo
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}
