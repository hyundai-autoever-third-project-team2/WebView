import { DefaultTheme } from "styled-components";
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    fontSize: typeof fontSize;
    fontWeight: typeof fontWeight;
    borderRadius: typeof borderRadius;
  }
}

const colors = {
    primary: '#FF9D00',
    primaryLight: '#FFB84D',
    primaryDark: '#CC7E00',
    grayLight: '#84868D',
    grayDark: '#303133',
    success: '#10B981',
    warning: '#FBBF24',
    error: '#EF4444',
    neutral50: '#F8FAFC',
    neutral100: '#F1F5F9',
    neutral200: '#E2E8F0',
    neutral300: '#CBD5E1',
    neutral400: '#94A3B8',
    neutral500: '#64748B',
    neutral600: '#475569',
    neutral700: '#334155',
    neutral800: '#1E293B',
    neutral900: '#0F172A',
    modalBackground: '#00000048',
    diamond: '#06CBBA',
    master: '#FF033E',
    kakao: '#FEE500',
    text: '#f0f0f0',
} as const;
  
const fontSize = {
    xs: '10px',
    sm: '13px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    h4: '20px',
    h3: '24px',
    h2: '28px',
    h1: '36px',
} as const;
  
const fontWeight = {
    light: 200,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    header: 800,
} as const;
  
const borderRadius = {
    xs: '10px',
    sm: '15px',
    md: '30px',
} as const;

export const theme: DefaultTheme = {
    colors,
    fontSize,
    fontWeight,
    borderRadius,
};