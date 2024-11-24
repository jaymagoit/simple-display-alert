import { delay, isDisplayAlertObject, joinStrings } from './helpers';
import { ALERT_POSITIONS, DisplayAlertProps } from './types';

declare global {
    interface Window {
        alertTimer: any;
    }
}

window.alertTimer = window.alertTimer || {};

const config = {
    parentId: 'simple-display-alert',
    icons: {
        loader: '<span class="sda-icon sda-loader-icon"></span> ',
        success: '<span class="sda-icon sda-success-icon"></span> ',
        danger: '<span class="sda-icon sda-danger-icon"></span> ',
        warning: '<span class="sda-icon sda-warning-icon"></span> ',
        info: '<span class="sda-icon sda-info-icon"></span> ',
    }
}

function isDisplayAlertTop(props: DisplayAlertProps): boolean {
    return props.position === 'top-left' || props.position === 'top-right'
}

/**
 * Create the alert DIV.
 *
 * @param {string} variant The class name
 * @param {string} message Text to display
 * @param {string|null} className Set class name identifier
 * @param {mixed|null} props Other properties, see `displayAlert()`
 * @returns {HTMLDivElement}
 */
export function createAlertElement(
    variant: string,
    message: string,
    className?: string,
    props: DisplayAlertProps = {}
): HTMLDivElement {
    const div: any = document.createElement('div')
    div.classList = joinStrings(
        `fade alert alert-response-all alert-${variant} `,
        `${className || ''} `,
        `${className ? 'has-identifier' : ''} ${props.icon ? 'has-icon' : ''} `,
        `fade-${props.fadeDirection ?? 'none'}`
    );

    div.id = 'simple-display-alert-items'
    div.innerHTML =
        joinStrings(
            '<div>',
            (props.icon ? config.icons[props.icon] : ''), 
            message, 
            (false === props.closeBtn
                ? ''
                : `<a class="close" title="close">&times;</a>`
            ),
            '</div>'
        )        

    // Remove alert when close btn is clicked.
    if (false !== props.closeBtn) {
        div.querySelector('.close').addEventListener('click', () => {
            // Remove existing alerts.
            removeResponseAlert(className, true)

            // Clear old timer for destoying alert.
            clearAlertTimeout(className)
        })
    }

    return div
}

/**
 * Display alert v2.
 * Indicate a className or set `multiple: true` for multiple alert.
 * Example usage:
 * `showAlert('success', 'Thanks!')` | 
 * `showAlert('success', 'Thanks!', 5000)` | 
 * `showAlert('success', { message: 'Thanks!'})` |
 * `showAlert({ variant: 'success', message: 'Thanks!' })`
 *
 * @param {string|object} variant `AlertProps` or The class name `primary`|`info`|`success`|`danger`|`warning`|`white`|`light`
|* @param {string|object} message `AlertProps` or Text to display in the alert element
 * @param {object|number} props Timeout (ms) or AlertProps: { `variant`: string, `message`: string, `timeout`: number|null, `className`: string|null, `closeBtn`: boolean, `multiple`: boolean, `loader`: string }
 * @returns {void}
 */
export function displayAlert(
    variant: DisplayAlertProps['variant'] | DisplayAlertProps = 'primary',
    message?: string | DisplayAlertProps,
    props: DisplayAlertProps | number = {}
): any {
    if (isDisplayAlertObject(variant)) {
        // ex. showAlert({ variant: 'success', message: 'Thanks!' })
        props = variant
    }

    if (isDisplayAlertObject(message)) {
        // ex. showAlert('success', { message: 'Thanks!' })
        props = message
        props.variant = variant
    }

    if (typeof props === 'number') {
        // ex. showAlert('success', 'Thanks!', 5000)
        const timer = props

        props = {
            variant,
            message,
            timeout: timer,
        }
    }

    // Create the parent div.
    const alertApp = document.getElementById(config.parentId)
    if (!alertApp) {
        const div = document.createElement('div')
        div.id = config.parentId
        div.classList.add(props.position ?? 'bottom-right');
        document.body.append(div)
    } else {
        alertApp.classList.remove(...ALERT_POSITIONS);
        alertApp.classList.add(props.position ?? 'bottom-right');
    }

    let _className = props.className || ''

    // Check if settings allow multiple alert to display in div
    // else override the existing alert with no className or identifier.
    if (true === props.multiple && !props.className) {
        _className = `alert-${Math.floor(Math.random() * 1000)}-${Math.floor(
            Math.random() * 1000
        )}`
    }

    const _variant = (props.variant || variant).toString()
    const _message = (props.message || message || 'Undefined').toString()

    // Set icon based on variant.
    if (null !== props.icon) {
        // @ts-ignore
        if (config.icons[_variant]) {
            // @ts-ignore
            props.icon = _variant
        }
    }

    const alertDiv: any = document.getElementById(config.parentId);
    const alert: any = createAlertElement(_variant, _message, _className, props)

    // Remove existing alerts.
    removeResponseAlert(_className)

    // Clear old timer for destoying alert.
    clearAlertTimeout(_className)

    const timeout = props.timeout ?? 5000

    // Let's now add the alert in the DOM.
    isDisplayAlertTop(props) && alertDiv.append(alert);
    !isDisplayAlertTop(props) && alertDiv.prepend(alert);

    delay(() => (alert.classList += ' show '), 150)

    if (props.backdrop === true) {
        alertDiv.classList += ' has-backdrop'
    }

    // Add custom timeout.
    if (timeout > 0) {
        const timerKey = _className ? _className : 0
        window.alertTimer[timerKey] = delay(() => {
            removeResponseAlert(_className, true)
        }, timeout)
    }

    return {
        remove: () => {
            removeResponseAlert(_className, true)
        }
    }
}

/**
 * Remove timeout event on alerts.
 *
 * @param {string|null} _class The class identifier is the same as timer identifier.
 * @return {void}
 */
function clearAlertTimeout(_class?: string): void {
    if (_class && _class.length) {
        clearTimeout(window.alertTimer[_class])
    } else {
        if (Object.keys(window.alertTimer).length) {
            Object.keys(window.alertTimer).forEach((i: any) => {
                // Clear only those with number as key.
                // else there is a class identifier that has its own clearing time.
                if (0 === i || '0' === i) {
                    clearTimeout(window.alertTimer[i]);
                    delete window.alertTimer[i];
                }
            })
        }
    }
}

/**
 * Remove all existing response instance.
 *
 * @param {string|null} _className Specify alert with className
 * @param {boolean|number|null} _isFade Specify if animation is fade or not.
 * @param {boolean|number|null} _isAll Specify if all alert will be affected.
 * @return {void}
 */
export function removeResponseAlert(
    _className?: string,
    _isFade?: boolean | number,
    _isAll?: boolean | number
): void {
    const alertDiv: any = document.getElementById(config.parentId);
    // Get all alerts with no identifier or className.
    let alerts: any = alertDiv?.querySelectorAll(
        '.alert-response-all:not(.has-identifier)'
    )

    // Check if search only for specific alert elements with className.
    if (_className && _className.length) {
        // override alerts with specific class identifier.
        alerts = alertDiv.querySelectorAll('.' + _className)
    }

    if (_isAll) {
        alerts = alertDiv.querySelectorAll('.alert-response-all')
    }

    // Reset timer variable if there is no existing alert.
    function resetTimer() {
        const alerts: any = alertDiv.querySelectorAll('.alert-response-all')

        if (!alerts.length) {
            window.alertTimer = {}
        }
    }

    if (alerts && alerts.length) {
        // Remove backdrop
        alertDiv.classList.remove('has-backdrop')
        alerts.forEach((alert: any) => {
            if (_isFade) {
                alert.classList.remove('show')
                delay(() => {
                    alert.remove()
                    delay(resetTimer, 500)
                }, 150)
                return
            }

            alert.remove()
            delay(resetTimer, 500)
        })
    }
}

/**
 * This extends the `removeResponseAlert()`
 * Remove display alert.
 *
 * @param {string|null} className Specify alert with className
 * @param {boolean|number|null} isFade Specify if animation is fade or not.
 * @return {void}
 */
export function removeDisplayAlert(
    className?: string,
    isFade?: boolean | number
): void {
    removeResponseAlert(className, isFade)
}

/**
 * This extends the `removeResponseAlert()`
 * Remove ALL display alert.
 *
 * @return {void}
 */
export function clearDisplayAlert(): void {
    removeResponseAlert('', false, 1)
}

/**
 * Get the response error message.
 *
 * @param {mixed} response Reponse object.
 * @param {string} _default Default message.
 * @returns {string}
 */
function errorMessage(response: any, _default?: string): string {
    let message: any = _default || 'Oops! Something went wrong.'

    if (response.message) {
        message = response.message;
    }

    if (response.response && response.response.status !== 200) {
        message =
            404 === response.response.status
                ? 'Page not found.'
                : response.response.data.UserError ??
                  response.response.data.userError ??
                  response.message
    }

    if (typeof response === 'string' && !_default) {
        message = response.toString()
    }

    return message
}

/**
 * Get the response error message.
 *
 * @param {mixed} response Response object
 * @returns {number}
 */
function responseStatusCode(response: any): number {
    let stat = 500
    if (response.response && response.response.status) {
        stat = response.response.status
    }

    return stat
}

/**
 * Check if response has error.
 *
 * @param {mixed} response Reponse object.
 * @returns {boolean}
 */
function hasError(response: any): boolean {
    response = response || {}
    if (response.response && response.response.status !== 200) {
        return true
    }

    return false
}

/**
 * @var {any} timer
 */
let timer: any

/**
 * Returns the reponse error message.
 *
 * @param {mixed} error Error object
 * @param {mixed} _default Default error message
 * @returns mixed
 */
export function getErrorMessage(error: any, _default?: string) {
    console.error(error)

    return errorMessage(error, _default)
}

/**
 * Returns the reponse error message.
 *
 * @param {mixed} response Response object
 * @returns mixed
 */
export function getStatusCode(response: any) {
    return responseStatusCode(response)
}

/**
 * Display alert loader with backdrop.
 *
 * @param {string} message The loading message.
 * @param {DisplayAlertProps} variant Alert style.
 * @param {boolean} backdrop Has backdrop
 * @return {void}
 */
export function displayAlertLoader(
    message?: string,
    variant: DisplayAlertProps['variant'] = 'white',
    backdrop = true,
    props: DisplayAlertProps = {}
): void {
    displayAlert(variant || 'light', {
        message: message ? `${message}<span class="dot-load" />` : 'Loading information. Please wait<span class="dot-load"></span>',
        icon: 'loader',
        timeout: -1,
        closeBtn: false,
        backdrop,
        ...props,
    })
}

/**
 * Remove/hide alert loader with backdrop.
 *
 * @return {void}
 */
export function hideAlertLoader(): void {
    removeResponseAlert()
}

/**
 * Display alert for errors.
 *
 * @param {Array<any>} errors Array error object
 * @return {void}
 */
export function displayErrors(errors?: Array<any>): void {
    if (errors && errors.length) {
        for (const error of errors) {
            displayAlertError({
                message: getErrorMessage(error.error) + error.append,
                className: `alert-${Math.floor(
                    Math.random() * 1000
                )}-${Math.floor(Math.random() * 1000)}`,
                timeout: 7000,
            })
        }
    }
}

/**
 * Extend DisplayAlert for error alert.
 * Indicate a className or set `multiple: true` for multiple alert.
 * Example usage:
 * `displayAlertError('Thanks!')` |
 * `displayAlertError('Thanks!', 5000)` |
 * `displayAlertError({ message: 'Thanks!'})`
 *
 * @param {string|object} message `DisplayAlertProps` or Text to display in the alert element
 * @param {object|number} props Timeout (ms) or `DisplayAlertProps`
 * @returns {void}
 */
export function displayAlertError(
    message?: string | DisplayAlertProps,
    props: DisplayAlertProps | number = {}
): void {
    return displayAlert('danger', message, props)
}

/**
 * Extend DisplayAlert for success alert.
 * Indicate a className or set `multiple: true` for multiple alert.
 * Example usage:
 * `displayAlertSuccess('Thanks!')` |
 * `displayAlertSuccess('Thanks!', 5000)` |
 * `displayAlertSuccess({ message: 'Thanks!'})`
 *
 * @param {string|object} message `DisplayAlertProps` or Text to display in the alert element
 * @param {object|number} props Timeout (ms) or `DisplayAlertProps`
 * @returns {void}
 */
export function displayAlertSuccess(
    message?: string | DisplayAlertProps,
    props: DisplayAlertProps | number = {}
): void {
    return displayAlert('success', message, props)
}

/**
 * Extend DisplayAlert for success alert.
 * Indicate a className or set `multiple: true` for multiple alert.
 * Example usage:
 * `displayAlertSuccess('Thanks!')` |
 * `displayAlertSuccess('Thanks!', 5000)` |
 * `displayAlertSuccess({ message: 'Thanks!'})`
 *
 * @param {string|object} message `DisplayAlertProps` or Text to display in the alert element
 * @param {object|number} props Timeout (ms) or `DisplayAlertProps`
 * @returns {void}
 */
export function displayAlertWarning(
    message?: string | DisplayAlertProps,
    props: DisplayAlertProps | number = {}
): void {
    return displayAlert('warning', message, props)
}

/**
 * Extend DisplayAlert for success alert.
 * Indicate a className or set `multiple: true` for multiple alert.
 * Example usage:
 * `displayAlertSuccess('Thanks!')` |
 * `displayAlertSuccess('Thanks!', 5000)` |
 * `displayAlertSuccess({ message: 'Thanks!'})`
 *
 * @param {string|object} message `DisplayAlertProps` or Text to display in the alert element
 * @param {object|number} props Timeout (ms) or `DisplayAlertProps`
 * @returns {void}
 */
export function displayAlertInfo(
    message?: string | DisplayAlertProps,
    props: DisplayAlertProps | number = {}
): void {
    return displayAlert('info', message, props)
}
