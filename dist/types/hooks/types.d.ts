/**
 * Describes the base of an record on the backend side.
 * Each record should inherit from this interface.
 */
export interface EzOnRailsRecord {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    ownerId: number | null;
}
/**
 * Describes the available operators for the search filters that can be used for search actions of scaffolds.
 */
type SearchFilterOperator = 'eq' | 'neq' | 'isnull' | 'isnotnull' | 'lt' | 'lte' | 'gt' | 'gte' | 'contains' | 'doesnotcontain' | 'isempty' | 'isnotempty';
/**
 * Describes a single search filter for a search action of a scaffold.
 */
export interface SearchFilter {
    field: string | null;
    operator: SearchFilterOperator;
    value: string | number | boolean | null;
}
/**
 * Describes a search filter having multiple connected filters for a search action of a scaffold.
 */
export interface SearchFilterComposition {
    logic: 'and' | 'or';
    filters: (SearchFilter | SearchFilterComposition)[];
}
export {};
