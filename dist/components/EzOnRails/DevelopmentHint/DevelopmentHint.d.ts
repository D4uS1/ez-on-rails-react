import './DevelopmentHint.css';
/**
 * Props for the DevelopmentHint component.
 */
export interface DevelopmentHintProps {
    visible: boolean;
    dismissTimeout?: number;
}
/**
 * Component that shows a sticky hint that the app is running in development mode.
 * The environment is only shown if the prop show is true.
 * This prop can e.g. be set by comparing the root apps NODE_ENV variable against not being in production.
 * The components is dismissable if it is clicked.
 * If it is dismissed, a timer is running. After the timer elapsed, it will be shown again.
 * If the dismissTimeout prop is not set, the component will respawn after 20 seconds.
 *
 * @constructor
 */
export declare const DevelopmentHint: (props: DevelopmentHintProps) => JSX.Element | null;
