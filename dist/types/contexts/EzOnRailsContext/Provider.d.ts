import { ReactNode } from 'react';
import { EzOnRailsContextValue } from './Context';
/**
 * Props for the EzOnRailsContextProvider.
 */
interface EzOnRailsContextProviderProps {
    value: EzOnRailsContextValue;
    children: ReactNode;
}
/**
 * Context provider for the CustomStyle value.
 */
export declare const EzOnRailsContextProvider: (props: EzOnRailsContextProviderProps) => EzOnRailsContext.Provider;
export {};
