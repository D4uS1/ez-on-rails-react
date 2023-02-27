import { EzOnRailsRecord, SearchFilter, SearchFilterComposition } from './types';
/**
 * Describes the result of the useEzScaff hook.
 */
interface UseEzScaffResult<TModel extends EzOnRailsRecord, TProperties = Omit<TModel, keyof EzOnRailsRecord>> {
    record: TModel | null;
    records: TModel[] | null;
    inProgress: boolean;
    error: unknown | null;
    getAll: () => void;
    getOne: (id: number) => void;
    search: (query: SearchFilter | SearchFilterComposition) => void;
    create: (properties: TProperties) => void;
    update: (id: number, properties: Partial<TProperties>) => void;
    remove: (id: number) => void;
}
/**
 * Hook that returns several methods and data related to model scaffolds of an EzOnRails Backend application.
 * The pluralModelName is the pluralized name of the model.
 * This hooks makes it possible to request CRUD and additional actions to the EzOnRails backend, related to the specified model.
 * This hook returns the methods to trigger several requests to the backend, like getting all, getting one record,
 * creating a record, updating a record, searching for records or deleting a record.
 * It also provides the requested data and status for the current request.
 *
 * @param pluralModelName
 */
export declare const useEzScaff: <TModel extends EzOnRailsRecord, TProperties = Omit<TModel, keyof EzOnRailsRecord>>(pluralModelName: string) => UseEzScaffResult<TModel, TProperties>;
export {};
