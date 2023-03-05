export const STATIC_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
]

export const useMenuLinks = () => {
  const links = [...STATIC_LINKS]

  return links
}
