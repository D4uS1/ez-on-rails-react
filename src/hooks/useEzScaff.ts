import { useCallback, useMemo, useState } from 'react';
import { EzOnRailsHttpClient } from '../http/client/EzOnRailsHttpClient';
import { EzOnRailsHttpUtils } from '../http/utils/EzOnRailsUtils';
import { EzOnRailsRecord, SearchFilter, SearchFilterComposition } from './types';
import { useEzOnRails } from './useEzOnRails';

/**
 * Describes the result of the useEzScaff hook.
 */
interface UseEzScaffResult<TModel extends EzOnRailsRecord, TProperties = Omit<TModel, keyof EzOnRailsRecord>> {
    // Result record for requests related to a single record, like show, create or update
    record: TModel | null;

    // Result records for requests related to multiple records, like index or search
    records: TModel[] | null;

    // Indicates that some request is currently in Progress
    inProgress: boolean;

    // Holds the error of the last request, if exists
    error: unknown | null;

    // Requests the index action of the record to receive all available records
    // The result will be saved in the records that are also returned by the hook.
    getAll: () => void;

    // Requests the show action of the record having the specified id.
    // Saves the result in the record that is also returned by the hook.
    getOne: (id: number) => void;

    // Requests records matching the specified query.
    // Saves the result in the records that are also returned by the hook.
    search: (query: SearchFilter | SearchFilterComposition) => void;

    // Requests to create a record having the specified properties.
    // Saves the result in the record that is also returned by the hook.
    create: (properties: TProperties) => void;

    // Requests to update a record having the specified id by the specified properties.
    // Saves the result in the record that is also returned by the hook.
    update: (id: number, properties: Partial<TProperties>) => void;

    // Requests to delete the record having the specified id.
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
export const useEzScaff = <TModel extends EzOnRailsRecord, TProperties = Omit<TModel, keyof EzOnRailsRecord>>(
    pluralModelName: string
): UseEzScaffResult<TModel, TProperties> => {
    const { backendUrl, authInfo, apiVersion } = useEzOnRails();

    const [record, setRecord] = useState<TModel | null>(null);
    const [records, setRecords] = useState<TModel[] | null>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<unknown | null>(null);

    /**
     * Converts the modelName to underscore, because the paths to the scaff actions are written in underscore.
     */
    const pluralModelNameUnderscore: string = useMemo(() => {
        return EzOnRailsHttpUtils.toSnakeCaseString(pluralModelName);
    }, [pluralModelName]);

    /**
     * Calls the specified requestFunc asynchronous.
     * Automatically sets the error and inProgress state, hence the only thing the requestFunc needs to do is
     * to start the request and set the result states after it was successful.
     */
    const requestHttp = useCallback((requestFunc: () => Promise<void>) => {
        (async () => {
            setError(null);
            setInProgress(true);

            try {
                await requestFunc();

                setInProgress(false);
            } catch (err: unknown) {
                setInProgress(false);
                setError(err);
            }
        })();
    }, []);

    /**
     * Requests the index action related to the defined model on the backend side.
     * Saves the result to the records that are returned by the hook.
     * If some error occurs, the error will be saved in the error that is returned by the hook.
     */
    const getAll = useCallback(() => {
        requestHttp(async () => {
            const result = await EzOnRailsHttpClient.get<null, TModel[]>(
                backendUrl,
                pluralModelNameUnderscore,
                null,
                authInfo,
                apiVersion
            );

            setRecords(result);
        });
    }, [backendUrl, authInfo, apiVersion, pluralModelNameUnderscore]);

    /**
     * Requests the show action with the specified id related to the defined model on the backend side.
     * Saves the result to the record that is returned by the hook.
     * If some error occurs, the error will be saved in the error that is returned by the hook.
     */
    const getOne = useCallback(
        (id: number) => {
            requestHttp(async () => {
                const result = await EzOnRailsHttpClient.get<null, TModel>(
                    backendUrl,
                    `${pluralModelNameUnderscore}/${id}`,
                    null,
                    authInfo,
                    apiVersion
                );

                setRecord(result);
            });
        },
        [backendUrl, authInfo, apiVersion, pluralModelNameUnderscore]
    );

    /**
     * Requests the search action related to the defined model on the backend side.
     * Saves the result to the records that are returned by the hook.
     * If some error occurs, the error will be saved in the error that is returned by the hook.
     */
    const search = useCallback(
        (query: SearchFilter | SearchFilterComposition) => {
            requestHttp(async () => {
                const result = await EzOnRailsHttpClient.get<SearchFilter | SearchFilterComposition, TModel[]>(
                    backendUrl,
                    pluralModelNameUnderscore,
                    query,
                    authInfo,
                    apiVersion
                );

                setRecords(result);
            });
        },
        [backendUrl, authInfo, apiVersion, pluralModelNameUnderscore]
    );

    /**
     * Requests the create action with the specified properties related to the defined model on the backend side.
     * Saves the result to the record that is returned by the hook.
     * If some error occurs, the error will be saved in the error that is returned by the hook.
     */
    const create = useCallback(
        (properties: TProperties) => {
            requestHttp(async () => {
                const result = await EzOnRailsHttpClient.post<TProperties, TModel>(
                    backendUrl,
                    pluralModelNameUnderscore,
                    properties,
                    authInfo,
                    apiVersion
                );

                setRecord(result);
            });
        },
        [backendUrl, authInfo, apiVersion, pluralModelNameUnderscore]
    );

    /**
     * Requests the update action with the specified id and properties related to the defined model on the backend side.
     * Saves the result to the record that is returned by the hook.
     * If some error occurs, the error will be saved in the error that is returned by the hook.
     */
    const update = useCallback(
        (id: number, properties: Partial<TProperties>) => {
            requestHttp(async () => {
                const result = await EzOnRailsHttpClient.patch<Partial<TProperties>, TModel>(
                    backendUrl,
                    `${pluralModelNameUnderscore}/${id}`,
                    properties,
                    authInfo,
                    apiVersion
                );

                setRecord(result);
            });
        },
        [backendUrl, authInfo, apiVersion, pluralModelNameUnderscore]
    );

    /**
     * Requests the delete action with the specified id related to the defined model on the backend side.
     * If some error occurs, the error will be saved in the error that is returned by the hook.
     */
    const remove = useCallback(
        (id: number) => {
            requestHttp(async () => {
                await EzOnRailsHttpClient.delete(
                    backendUrl,
                    `${pluralModelNameUnderscore}/${id}`,
                    null,
                    authInfo,
                    apiVersion
                );

                setRecord(null);
            });
        },
        [backendUrl, authInfo, apiVersion, pluralModelNameUnderscore]
    );

    return {
        record: record,
        records: records,
        inProgress: inProgress,
        error: error,
        getAll: getAll,
        getOne: getOne,
        search: search,
        create: create,
        update: update,
        remove: remove
    };
};