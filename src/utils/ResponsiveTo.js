import { css } from 'styled-components'

const ResponsiveTo = (size = 'sm') => {
  const range = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px'
  }
  return (css`@media only screen and (min-width: ${range[size] || size} )`)
}

export default ResponsiveTo
