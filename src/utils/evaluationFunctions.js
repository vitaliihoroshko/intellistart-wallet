export const evaluatePasswordProgress = (value, dataCallback, visibilityCallback) => {
  if (value.length === 6) {
    dataCallback({ progress: 10, tooltip: 'Password is very weak' });
  } else if (value.length === 7) {
    dataCallback({ progress: 20, tooltip: 'Password is weak' });
  } else if (value.length === 8) {
    dataCallback({ progress: 30, tooltip: 'Password is weak' });
  } else if (value.length === 9) {
    dataCallback({ progress: 50, tooltip: 'Password is average' });
  } else if (value.length === 10) {
    dataCallback({ progress: 70, tooltip: 'Password is average' });
  } else if (value.length === 11) {
    dataCallback({ progress: 90, tooltip: 'Password is strong enough' });
  } else if (value.length === 12) {
    dataCallback({ progress: 100, tooltip: 'Password is strong' });
  }
  if (value.length >= 6 && value.length <= 12) visibilityCallback(true);
  else visibilityCallback(false);
};
