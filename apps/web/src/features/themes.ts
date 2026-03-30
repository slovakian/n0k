export interface Theme {
  id: string;
  label: string;
}

export const THEMES: Theme[] = [
  { id: 'dark', label: 'dark' },
  { id: 'catppuccin-mocha', label: 'catppuccin-mocha' },
  { id: 'catppuccin-macchiato', label: 'catppuccin-macchiato' },
  { id: 'catppuccin-frappe', label: 'catppuccin-frappe' },
  { id: 'catppuccin-latte', label: 'catppuccin-latte' },
  { id: 'gruvbox-dark-hard', label: 'gruvbox-dark-hard' },
  { id: 'gruvbox-dark-medium', label: 'gruvbox-dark-medium' },
  { id: 'gruvbox-dark-soft', label: 'gruvbox-dark-soft' },
  { id: 'gruvbox-light', label: 'gruvbox-light' },
  { id: 'nord', label: 'nord' },
  { id: 'vitesse-dark', label: 'vitesse-dark' },
  { id: 'vitesse-black', label: 'vitesse-black' },
  { id: 'vitesse-light', label: 'vitesse-light' },
  { id: 'everforest-dark', label: 'everforest-dark' },
  { id: 'everforest-dark-hard', label: 'everforest-dark-hard' },
  { id: 'everforest-light', label: 'everforest-light' },
];

export const DEFAULT_THEME = 'dark';
