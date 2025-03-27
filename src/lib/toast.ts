type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
    duration?: number;
    type?: ToastType;
}

/**
 * Shows a toast message
 * @param message The message to display
 * @param options Toast options (duration, type)
 */
export function showToast(message: string, options: ToastOptions = {}) {
    const { duration = 5000, type = 'info' } = options;

    // Get the toast container
    const container = document.getElementById('toast-container');
    if (!container) return;

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `mb-3 p-4 rounded-md shadow-md text-sm font-medium transition-all transform translate-y-2 opacity-0 max-w-md`;

    // Set styles based on type
    switch (type) {
        case 'success':
            toast.className += ' bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
            break;
        case 'error':
            toast.className += ' bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
            break;
        case 'warning':
            toast.className += ' bg-yellow-50 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800';
            break;
        default:
            toast.className += ' bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
    }

    // Set content
    toast.textContent = message;

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => removeToast(toast);

    // Create a wrapper for the content and close button
    const wrapper = document.createElement('div');
    wrapper.className = 'flex justify-between items-center';

    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;

    wrapper.appendChild(messageSpan);
    wrapper.appendChild(closeButton);

    toast.textContent = '';
    toast.appendChild(wrapper);

    // Add to container
    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    }, 10);

    // Auto remove after duration
    const timeoutId = setTimeout(() => {
        removeToast(toast);
    }, duration);

    // Store timeout ID on the element
    (toast as any)._timeoutId = timeoutId;
}

/**
 * Removes a toast element with animation
 */
function removeToast(toast: HTMLElement) {
    // Clear any existing timeout
    if ((toast as any)._timeoutId) {
        clearTimeout((toast as any)._timeoutId);
    }

    // Animate out
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-2', 'opacity-0');

    // Remove after animation
    setTimeout(() => {
        toast.remove();
    }, 300);
}

/**
 * Shows a success toast
 */
export function showSuccess(message: string, options: Omit<ToastOptions, 'type'> = {}) {
    showToast(message, { ...options, type: 'success' });
}

/**
 * Shows an error toast
 */
export function showError(message: string, options: Omit<ToastOptions, 'type'> = {}) {
    showToast(message, { ...options, type: 'error' });
}

/**
 * Shows a warning toast
 */
export function showWarning(message: string, options: Omit<ToastOptions, 'type'> = {}) {
    showToast(message, { ...options, type: 'warning' });
}

/**
 * Shows an info toast
 */
export function showInfo(message: string, options: Omit<ToastOptions, 'type'> = {}) {
    showToast(message, { ...options, type: 'info' });
} 