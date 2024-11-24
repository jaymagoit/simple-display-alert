import { displayAlert, displayAlertError, displayAlertInfo, displayAlertLoader, displayAlertSuccess, displayAlertWarning } from '../src/index';

// Basic Alerts
window.showSuccessAlert = () => {
    return displayAlertSuccess('Operation completed successfully!', {
        fadeDirection: 'none',
        position: 'bottom-right'
    });
};

window.showErrorAlert = () => {
    return displayAlertError('An error occurred while processing your request.', {
        fadeDirection: 'right',
        position: 'bottom-right'
    });
};

window.showWarningAlert = () => {
    return displayAlertWarning('Please review your input before proceeding.', {
        fadeDirection: 'bottom',
        position: 'bottom-right'
    });
};

window.showInfoAlert = () => {
    return displayAlertInfo('This is an informational message.', {
        fadeDirection: 'top',
        position: 'bottom-right'
    });
};

// Position Demos
window.showTopLeftAlert = () => {
    return displayAlert({
        variant: 'success',
        message: 'Alert in top-left position',
        fadeDirection: 'left',
        position: 'top-left',
        timeout: 0
    });
};

window.showTopRightAlert = () => {
    return displayAlert({
        variant: 'warning',
        message: 'Alert in top-right position',
        fadeDirection: 'right',
        position: 'top-right',
        timeout: 0
    });
};

window.showBottomLeftAlert = () => {
    return displayAlert({
        variant: 'info',
        message: 'Alert in bottom-left position',
        fadeDirection: 'left',
        position: 'bottom-left',
        timeout: 0
    });
};

window.showBottomRightAlert = () => {
    return displayAlert({
        variant: 'error',
        message: 'Alert in bottom-right position',
        fadeDirection: 'right',
        position: 'bottom-right',
        timeout: 0
    });
};

// Multiple Alerts Demo
window.showMultipleAlerts = () => {
    displayAlert({
        variant: 'success',
        message: 'First Alert: Operation successful!',
        position: 'top-right',
        fadeDirection: 'right',
        multiple: true,
        timeout: 0
    });

    displayAlert({
        variant: 'info',
        message: 'Second Alert: Processing next step...',
        position: 'top-right',
        fadeDirection: 'left',
        multiple: true,
        timeout: 0
    });

    displayAlert({
        variant: 'warning',
        message: 'Third Alert: Almost done!',
        position: 'top-right',
        fadeDirection: 'top',
        multiple: true,
        timeout: 0
    });
};

window.showStackedAlerts = () => {
    // Different positions
    displayAlert({
        variant: 'success',
        message: 'This is the first alert',
        position: 'bottom-right',
        fadeDirection: 'bottom',
        multiple: true,
        timeout: 0
    });

    displayAlert({
        variant: 'warning',
        message: 'This is the second alert',
        position: 'bottom-left',
        fadeDirection: 'right',
        multiple: true,
        timeout: 0
    });

    displayAlert({
        variant: 'info',
        message: 'This is the third alert',
        position: 'top-right',
        fadeDirection: 'left',
        multiple: true,
        timeout: 0
    });

    displayAlert({
        variant: 'error',
        message: 'This is the fourth alert',
        position: 'top-left',
        fadeDirection: 'top',
        multiple: true,
        timeout: 0
    });
};

window.showOneForMultipleAlerts = () => {
    // Different positions
    displayAlert({
        variant: ['success', 'info', 'warning', 'error'][Math.floor(Math.random() * 4)],
        message: 'This is the first alert',
        position: 'bottom-right',
        fadeDirection: ['left', 'bottom', 'right', 'top', 'none'][Math.floor(Math.random() * 4)],
        multiple: true,
        timeout: 0
    });
};

// Special Alerts
window.showLoaderAlert = () => {
    return displayAlertLoader('Processing your request. reload the page to cancel', {
        position: 'bottom-right',
        closeBtn: false
    });
};

window.showAlertWithBackdrop = () => {
    return displayAlert({
        variant: 'white',
        message: 'This alert has a backdrop effect',
        icon: 'info',
        position: 'bottom-right',
        backdrop: true,
        timeout: 0
    });
};
