/**
 * Describes the base of an record on the backend side.
 * Each record should inherit from this interface.
 */
export interface EzOnRailsRecord {
    // The id of the record on the server side
    id: number;

    // The date the record was created
    createdAt: Date;

    // The date the record was last updated
    updatedAt: Date;

    // The user id of the owner of the record, if exists
    ownerId: number | null;
}

/**
 * Describes the available operators for the search filters that can be used for search actions of scaffolds.
 */
type SearchFilterOperator =
    | 'eq'
    | 'neq'
    | 'isnull'
    | 'isnotnull'
    | 'lt'
    | 'lte'
    | 'gt'
    | 'gte'
    | 'contains'
    | 'doesnotcontain'
    | 'isempty'
    | 'isnotempty';

/**
 * Describes a single search filter for a search action of a scaffold.
 */
export interface SearchFilter {
    // The name of the field the operator is applied to
    field: string | null;

    // The search operator
    operator: SearchFilterOperator;

    // The value to search for using the operator on the field
    value: string | number | boolean | null;
}

/**
 * Describes a search filter having multiple connected filters for a search action of a scaffold.
 */
export interface SearchFilterComposition {
    // The logical operator the filters are connected by
    logic: 'and' | 'or';

    // The filters that are connected
    filters: (SearchFilter | SearchFilterComposition)[];
}
