// utils/npctoaster.js
import { createApp, h } from 'vue';
import NpcToaster from '../components/global/NpcToaster.vue'; // Adjust the path to your NpcToaster component

let toastQueue = [];
let isShowingToast = false;

function showToaster(options = {}) {
  return new Promise((resolve) => {
    toastQueue.push({ ...options, resolve });

    if (!isShowingToast) {
      showNextToast();
    }
  });
}

function showNextToast() {
  if (toastQueue.length === 0) {
    isShowingToast = false;
    return;
  }

  isShowingToast = true;
  const {
    title,
    subtitle,
    message,
    avatar,
    color,
    icon,
    closable,
    position,
    actions,
    duration = 5000,
    resolve,
  } = toastQueue.shift();

  const app = createApp({
    render() {
      return h(NpcToaster, {
        title,
        subtitle,
        message,
        avatar,
        color,
        icon,
        closable,
        position,
        actions,
        onClose: () => {
          app.unmount();
          if (container.parentNode) {
            document.body.removeChild(container); // Remove container only if it's still a child of body
          }
          resolve(); // Resolve the promise to show the next toast
          showNextToast(); // Show the next toast in the queue
        },
      });
    },
  });

  // Create a container to mount the toaster
  const container = document.createElement('div');
  document.body.appendChild(container);
  app.mount(container);

  if (duration > 0) {
    // Set the timeout to automatically close the toast
    setTimeout(() => {
        app.unmount();
        if (container.parentNode) {
          document.body.removeChild(container); // Ensure container is still a child of body
        }
        resolve(); // Resolve the promise to show the next toast
        showNextToast(); // Show the next toast in the queue
    }, duration);
  }
}


export default showToaster;
