export const ALERT_POSITIONS: string[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
export type AlertPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface DisplayAlertProps {
    /** 
     * Alert variant/type that determines the style and icon
     * @default 'primary'
     */
    variant?: 'primary' | 'info' | 'success' | 'danger' | 'warning' | 'white' | 'light' | DisplayAlertProps;
    
    /** 
     * Text message to be displayed in the alert
     * @default 'Undefined'
     */
    message?: string | DisplayAlertProps;
    
    /** 
     * Unique identifier for the alert element
     * Important when using multiple alerts simultaneously
     * @default ''
     */
    className?: string 

    /** 
     * Duration in milliseconds before the alert is automatically removed
     * @default 5000
     */
    timeout?: number
    
    /** 
     * Whether to show a close button on the alert
     * @default false
     */
    closeBtn?: boolean | number 
    
    /** 
     * Allow multiple alerts to be displayed simultaneously
     * @default false
     */
    multiple?: boolean | number
    
    /** 
     * Icon to be displayed in the alert
     * Set to null to remove the icon
     * @default Based on variant
     */
    icon?: 'loader' | 'success' | 'danger' | 'warning' | 'info' | null
    
    /** 
     * Whether to show a backdrop behind the alert
     * @default false
     */ 
    backdrop?: boolean | number

    /** 
     * Animation style for the alert's appearance and disappearance
     * @default 'none'
     */
    fadeDirection?: 'none' | 'top' | 'bottom' | 'left' | 'right';

    /** 
     * Position of the alert in the window
     * @default 'bottom-right'
     */
    position?: AlertPosition;
}

export interface DisplayAlertReturnProps {
    remove: () => void;
}