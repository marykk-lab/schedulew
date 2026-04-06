// core
export const COLOR_BG_PRIMARY    = '#161711'; 
export const COLOR_BG_SURFACE    = '#45362C'; 
export const COLOR_ACCENT        = '#A8977A'; 
// text
export const COLOR_TEXT_PRIMARY   = '#F0E8D6'; 
export const COLOR_TEXT_SECONDARY = '#8A7F6A'; 
export const COLOR_TEXT_TERTIARY  = '#5E5548'; 

// borders and surfaces
export const COLOR_BORDER         = 'rgba(168, 151, 122, 0.18)'; 
export const COLOR_BORDER_STRONG  = 'rgba(168, 151, 122, 0.35)'; 
export const COLOR_SURFACE_TINT   = 'rgba(168, 151, 122, 0.10)'; 

// sematincs
export const COLOR_DANGER   = '#C75250'; 
export const COLOR_WARNING  = '#D0923A'; 
export const COLOR_INFO     = '#6492C8'; 
export const COLOR_SUCCESS  = '#5E8A52'; 

// priority flags
export const COLOR_P1 = COLOR_DANGER;  // urgent
export const COLOR_P2 = COLOR_WARNING; // high
export const COLOR_P3 = COLOR_INFO;    // normal
export const COLOR_P4 = COLOR_TEXT_TERTIARY; // low

// 
export const PROJECT_COLORS = {
  red:    '#C75250',
  amber:  '#D0923A',
  green:  '#5E8A52',
  blue:   '#6492C8',
  purple: '#8B73B0',
  teal:   '#4D9A8A',
} as const;

// typography
export const FONT_FAMILY_SANS  = "'DM Sans', system-ui, sans-serif";
export const FONT_FAMILY_SERIF = "'Lora', Georgia, serif";
export const FONT_FAMILY_MONO  = "'DM Mono', 'Fira Code', monospace";

export const FONT_SIZE_XS  = 9;   // tags, status labels
export const FONT_SIZE_SM  = 11;  // section headers, meta
export const FONT_SIZE_MD  = 13;  // body, task titles
export const FONT_SIZE_LG  = 15;  // sheet inputs, list items
export const FONT_SIZE_XL  = 18;  // detail titles
export const FONT_SIZE_2XL = 22;  // screen headings

// spacing
export const SPACING_XS  = 4;
export const SPACING_SM  = 8;
export const SPACING_MD  = 12;
export const SPACING_LG  = 16;
export const SPACING_XL  = 20;
export const SPACING_2XL = 28;

// radius border
export const RADIUS_SM   = 6;   // tags, badges
export const RADIUS_MD   = 10;  // buttons, inputs
export const RADIUS_LG   = 14;  // cards
export const RADIUS_XL   = 20;  // bottom sheets
export const RADIUS_FULL = 999; // pills, avatars


// shadow
export const SHADOW_SM   = '0 1px 4px rgba(0,0,0,0.35)';
export const SHADOW_MD   = '0 4px 16px rgba(0,0,0,0.40)';
export const SHADOW_SHEET = '0 -4px 24px rgba(0,0,0,0.50)';

// animation
export const DURATION_FAST   = 150; 
export const DURATION_NORMAL = 260; 
export const DURATION_SLOW   = 400; 
export const EASING_DEFAULT  = 'cubic-bezier(0.22, 1, 0.36, 1)';

// theme
const theme = {
  colors: {
    background: {
      primary:  COLOR_BG_PRIMARY,
      surface:  COLOR_BG_SURFACE,
      tint:     COLOR_SURFACE_TINT,
    },
    text: {
      primary:   COLOR_TEXT_PRIMARY,
      secondary: COLOR_TEXT_SECONDARY,
      tertiary:  COLOR_TEXT_TERTIARY,
    },
    accent:  COLOR_ACCENT,
    border:  COLOR_BORDER,
    danger:  COLOR_DANGER,
    warning: COLOR_WARNING,
    info:    COLOR_INFO,
    success: COLOR_SUCCESS,
    priority: { p1: COLOR_P1, p2: COLOR_P2, p3: COLOR_P3, p4: COLOR_P4 },
    project: PROJECT_COLORS,
  },
  typography: {
    fontSans:  FONT_FAMILY_SANS,
    fontSerif: FONT_FAMILY_SERIF,
    fontMono:  FONT_FAMILY_MONO,
    size: {
      xs: FONT_SIZE_XS, sm: FONT_SIZE_SM, md: FONT_SIZE_MD,
      lg: FONT_SIZE_LG, xl: FONT_SIZE_XL, xxl: FONT_SIZE_2XL,
    },
  },
  spacing: {
    xs: SPACING_XS, sm: SPACING_SM, md: SPACING_MD,
    lg: SPACING_LG, xl: SPACING_XL, xxl: SPACING_2XL,
  },
  radius: {
    sm: RADIUS_SM, md: RADIUS_MD, lg: RADIUS_LG,
    xl: RADIUS_XL, full: RADIUS_FULL,
  },
  shadow: { sm: SHADOW_SM, md: SHADOW_MD, sheet: SHADOW_SHEET },
  animation: {
    fast:   DURATION_FAST,
    normal: DURATION_NORMAL,
    slow:   DURATION_SLOW,
    easing: EASING_DEFAULT,
  },
} as const;

export type Theme = typeof theme;
export default theme;