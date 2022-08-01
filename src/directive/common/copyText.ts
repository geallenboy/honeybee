/**
* v-copyText 复制文本内容
*/

export default {
  beforeMount(el: { $copyCallback: (arg0: any) => void; $copyValue: any; addEventListener: (arg0: string, arg1: () => void) => void; $destroyCopy: () => any; removeEventListener: (arg0: string, arg1: () => void) => any; }, { value, arg }: any) {
    if (arg === "callback") {
      el.$copyCallback = value;
    } else {
      el.$copyValue = value;
      const handler = () => {
        copyTextToClipboard(el.$copyValue);
        if (el.$copyCallback) {
          el.$copyCallback(el.$copyValue);
        }
      };
      el.addEventListener("click", handler);
      el.$destroyCopy = () => el.removeEventListener("click", handler);
    }
  }
}

function copyTextToClipboard(input: string | any[], { target = document.body } = {}) {
  const element:any = document.createElement('textarea');
  const previouslyFocusedElement:any = document.activeElement;
  element.value = input;
  element.setAttribute('readonly', '');

  element.style.contain = 'strict';
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  element.style.fontSize = '12pt'; // Prevent zooming on iOS

  const selection:any = document.getSelection();
  const originalRange = selection.rangeCount > 0 && selection.getRangeAt(0);

  target.append(element);
  element.select();
  element.selectionStart = 0;
  element.selectionEnd = input.length;

  let isSuccess = false;
  try {
    isSuccess = document.execCommand('copy');
  } catch { }

  element.remove();

  if (originalRange) {
    selection.removeAllRanges();
    selection.addRange(originalRange);
  }
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
  }

  return isSuccess;
}
