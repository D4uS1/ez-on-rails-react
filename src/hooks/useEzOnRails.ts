import { useContext } from 'react';
import { EzOnRailsContext, EzOnRailsContextValue } from '../contexts/EzOnRails/Context';

/**
 * Describes the result of the useEzOnRails hook.
 */
interface UseEzOnRailsResult extends EzOnRailsContextValue { }

/**
 * Hook that returns the context values including some methods to change it.
 */
export const useEzOnRails = (): UseEzOnRailsResult => {
    return useContext<EzOnRailsContextValue>(EzOnRailsContext);
}