// ── Core palette ─────────────────────────────────────────────────────────────
export const COLOR_BG_PRIMARY    = '#161711';
export const COLOR_BG_SURFACE    = '#45362C';
export const COLOR_ACCENT        = '#A8977A';
// Aliases used in CSS_VARIABLES
export const COLOR_BACKGROUND    = COLOR_BG_PRIMARY;
export const COLOR_SURFACE       = COLOR_BG_SURFACE;
export const COLOR_ACCENT_DARK   = '#7D6E57';
export const COLOR_TOOLBAR       = '#1A1710';
export const COLOR_CARD          = '#2A1F17';
export const COLOR_INPUT         = '#1D1812';
export const COLOR_OVERLAY       = 'rgba(0, 0, 0, 0.60)';
export const COLOR_TINT          = 'rgba(168, 151, 122, 0.12)';

// ── Text ──────────────────────────────────────────────────────────────────────
export const COLOR_TEXT_PRIMARY   = '#F0E8D6';
export const COLOR_TEXT_SECONDARY = '#8A7F6A';
export const COLOR_TEXT_TERTIARY  = '#5E5548';
export const COLOR_TEXT_DISABLED  = COLOR_TEXT_TERTIARY;
export const COLOR_TEXT_ON_ACCENT = '#1A1710';

// ── Borders ───────────────────────────────────────────────────────────────────
export const COLOR_BORDER         = 'rgba(168, 151, 122, 0.18)';
export const COLOR_BORDER_STRONG  = 'rgba(168, 151, 122, 0.35)';
export const COLOR_SURFACE_TINT   = COLOR_TINT;

// ── Semantics ─────────────────────────────────────────────────────────────────
export const COLOR_DANGER      = '#C75250';
export const COLOR_ERROR       = COLOR_DANGER;
export const COLOR_ERROR_BG    = 'rgba(199, 82, 80, 0.15)';
export const COLOR_WARNING     = '#D0923A';
export const COLOR_INFO        = '#6492C8';
export const COLOR_SUCCESS     = '#5E8A52';
export const COLOR_SUCCESS_BG  = 'rgba(94, 138, 82, 0.15)';
export const COLOR_LOADING     = COLOR_ACCENT;

// ── Priority flags ────────────────────────────────────────────────────────────
export const COLOR_P1 = COLOR_DANGER;
export const COLOR_P2 = COLOR_WARNING;
export const COLOR_P3 = COLOR_INFO;
export const COLOR_P4 = COLOR_TEXT_TERTIARY;

export const PROJECT_COLORS = {
  red:    '#C75250',
  amber:  '#D0923A',
  green:  '#5E8A52',
  blue:   '#6492C8',
  purple: '#8B73B0',
  teal:   '#4D9A8A',
} as const;

// ── Typography ────────────────────────────────────────────────────────────────
export const FONT_FAMILY_DISPLAY = "'Lora', Georgia, serif";
export const FONT_FAMILY_BODY    = "'DM Sans', system-ui, sans-serif";
export const FONT_FAMILY_SANS    = FONT_FAMILY_BODY;
export const FONT_FAMILY_SERIF   = FONT_FAMILY_DISPLAY;
export const FONT_FAMILY_MONO    = "'DM Mono', 'Fira Code', monospace";

export const FONT_SIZE_XS  = 9;
export const FONT_SIZE_SM  = 11;
export const FONT_SIZE_MD  = 13;
export const FONT_SIZE_LG  = 15;
export const FONT_SIZE_XL  = 18;
export const FONT_SIZE_2XL = 22;

// ── Spacing ───────────────────────────────────────────────────────────────────
export const SPACING_XS  = 4;
export const SPACING_SM  = 8;
export const SPACING_MD  = 12;
export const SPACING_LG  = 16;
export const SPACING_XL  = 20;
export const SPACING_2XL = 28;

// ── Border radius ─────────────────────────────────────────────────────────────
export const RADIUS_SM   = 6;
export const RADIUS_MD   = 10;
export const RADIUS_LG   = 14;
export const RADIUS_XL   = 20;
export const RADIUS_FULL = 999;

// ── Shadows ───────────────────────────────────────────────────────────────────
export const SHADOW_SM    = '0 1px 4px rgba(0,0,0,0.35)';
export const SHADOW_MD    = '0 4px 16px rgba(0,0,0,0.40)';
export const SHADOW_LG    = '0 8px 32px rgba(0,0,0,0.60)';
export const SHADOW_SHEET = '0 -4px 24px rgba(0,0,0,0.50)';
export const SHADOW_ACCENT= '0 4px 20px rgba(168,151,122,0.25)';

// ── Transitions ───────────────────────────────────────────────────────────────
export const TRANSITION_FAST   = 'all 0.15s cubic-bezier(0.22, 1, 0.36, 1)';
export const TRANSITION_NORMAL = 'all 0.26s cubic-bezier(0.22, 1, 0.36, 1)';
export const TRANSITION_SLOW   = 'all 0.40s cubic-bezier(0.4, 0, 0.2, 1)';
export const DURATION_FAST     = 150;
export const DURATION_NORMAL   = 260;
export const DURATION_SLOW     = 400;
export const EASING_DEFAULT    = 'cubic-bezier(0.22, 1, 0.36, 1)';

// ── Layout (Web) ──────────────────────────────────────────────────────────────
export const SIDEBAR_WIDTH      = 260;
export const TOOLBAR_HEIGHT     = 56;
export const BOTTOM_NAV_HEIGHT  = 60;
export const TIME_COLUMN_WIDTH  = 56;
export const HOUR_ROW_HEIGHT    = 72;

// ── Z-index ───────────────────────────────────────────────────────────────────
export const Z = {
  base:    0,
  card:    10,
  sticky:  100,
  overlay: 200,
  modal:   300,
  toast:   400,
} as const;

// ── CSS Custom Properties (inject into :root) ─────────────────────────────────
export const CSS_VARIABLES = `
  --color-bg:              ${COLOR_BACKGROUND};
  --color-surface:         ${COLOR_SURFACE};
  --color-accent:          ${COLOR_ACCENT};
  --color-accent-dark:     ${COLOR_ACCENT_DARK};
  --color-toolbar:         ${COLOR_TOOLBAR};
  --color-card:            ${COLOR_CARD};
  --color-input:           ${COLOR_INPUT};
  --color-border:          ${COLOR_BORDER};
  --color-overlay:         ${COLOR_OVERLAY};
  --color-text:            ${COLOR_TEXT_PRIMARY};
  --color-text-secondary:  ${COLOR_TEXT_SECONDARY};
  --color-text-disabled:   ${COLOR_TEXT_DISABLED};
  --color-text-on-accent:  ${COLOR_TEXT_ON_ACCENT};
  --color-success:         ${COLOR_SUCCESS};
  --color-success-bg:      ${COLOR_SUCCESS_BG};
  --color-error:           ${COLOR_ERROR};
  --color-error-bg:        ${COLOR_ERROR_BG};
  --color-loading:         ${COLOR_LOADING};
  --color-warning:         ${COLOR_WARNING};
  --font-display:          ${FONT_FAMILY_DISPLAY};
  --font-body:             ${FONT_FAMILY_BODY};
  --font-mono:             ${FONT_FAMILY_MONO};
  --shadow-sm:             ${SHADOW_SM};
  --shadow-md:             ${SHADOW_MD};
  --shadow-lg:             ${SHADOW_LG};
  --shadow-accent:         ${SHADOW_ACCENT};
  --sidebar-width:         ${SIDEBAR_WIDTH}px;
  --toolbar-height:        ${TOOLBAR_HEIGHT}px;
  --bottom-nav-height:     ${BOTTOM_NAV_HEIGHT}px;
  --hour-height:           ${HOUR_ROW_HEIGHT}px;
`;

// ── Theme object ──────────────────────────────────────────────────────────────
const theme = {
  colors: {
    background: {
      primary: COLOR_BG_PRIMARY,
      surface: COLOR_BG_SURFACE,
      tint:    COLOR_TINT,
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
    fontDisplay: FONT_FAMILY_DISPLAY,
    fontBody:    FONT_FAMILY_BODY,
    fontMono:    FONT_FAMILY_MONO,
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
  shadow: { sm: SHADOW_SM, md: SHADOW_MD, lg: SHADOW_LG, sheet: SHADOW_SHEET, accent: SHADOW_ACCENT },
  animation: {
    fast: DURATION_FAST, normal: DURATION_NORMAL, slow: DURATION_SLOW,
    easing: EASING_DEFAULT,
    transition: { fast: TRANSITION_FAST, normal: TRANSITION_NORMAL, slow: TRANSITION_SLOW },
  },
  layout: { sidebar: SIDEBAR_WIDTH, toolbar: TOOLBAR_HEIGHT, hourHeight: HOUR_ROW_HEIGHT },
  z: Z,
} as const;

export type Theme = typeof theme;
export default theme;
