import { EzOnRailsRecord, SearchFilter, SearchFilterComposition } from './types';
/**
 * Describes the result of the useEzScaff hook.
 */
interface UseEzScaffResult<TModel extends EzOnRailsRecord, TProperties = Omit<TModel, keyof EzOnRailsRecord>> {
    record: TModel | null;
    records: TModel[] | null;
    inProgress: boolean;
    error: unknown | null;
    getAll: () => Promise<TModel[] | null>;
    getOne: (id: number) => Promise<TModel | null>;
    search: (query: SearchFilter | SearchFilterComposition) => Promise<TModel[] | null>;
    create: (properties: TProperties) => Promise<TModel | null>;
    update: (id: number, properties: Partial<TProperties>) => Promise<TModel | null>;
    remove: (id: number) => Promise<void | null>;
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
