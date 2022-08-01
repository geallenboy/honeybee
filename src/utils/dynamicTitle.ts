import defaultSettings from '@/settings';

/**
 * 动态修改标题
 */
export function useDynamicTitle() {
  const settingsStore = { title: '', dynamicTitle: '' };
  if (settingsStore.dynamicTitle) {
    document.title = settingsStore.title + ' - ' + defaultSettings.title;
  } else {
    document.title = defaultSettings.title;
  }
}
