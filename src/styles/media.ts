const sizes = {
    mobile: '320px',
    tablet: '768px',
  } as const;

export const media = {
    mobile: `@media screen and (min-width: ${sizes.mobile})`,
    tablet: `@media screen and (min-width: ${sizes.tablet})`, 
} as const;