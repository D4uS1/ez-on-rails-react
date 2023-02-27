import React, { useState } from 'react';
import styles from './DevelopmentHint.module.css';

/**
 * Props for the DevelopmentHint component.
 */
export interface DevelopmentHintProps {
    // Indicates whether the hint should be dispalyed
    visible: boolean;

    // A timeout that indicates after what amount of time the component should be shown again after dismiss
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
export const DevelopmentHint = (props: DevelopmentHintProps) => {
    const [visible, setVisible] = useState<boolean>(props.visible);

    /**
     * Called after the last dismiss timeout triggers.
     * Sets the visibility for the compoonent to true.
     */
    const dismissTimeout = () => {
        setVisible(true);
    };

    /**
     * Called if the user clicks on the container.
     * Sets the visible state to false and starts a timeout that shows the component again
     * after a while. Those timeout is set to the props dismissTimeout or 20 seconds, if the
     * dismissTimeout is not given.
     */
    const onClickContainer = () => {
        setVisible(false);
        setTimeout(dismissTimeout, props.dismissTimeout || 20000);
    };

    return visible ? (
        <div onClick={onClickContainer} className={styles.container}>
            <span className={styles.text}>development</span>
        </div>
    ) : null;
};
