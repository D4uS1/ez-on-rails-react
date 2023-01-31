import { EzOnRailsHttpClient, EzOnRailsHttpError } from './client/EzOnRailsHttpClient';
import { EzOnRailsSwr } from './swr/EzOnRailsSwr';
import { EzOnRailsHttpUtils } from './utils/EzOnRailsUtils';

export const EzOnRailsHttp = {
    client: EzOnRailsHttpClient,
    swr: EzOnRailsSwr,
    utils: EzOnRailsHttpUtils
};

export { EzOnRailsHttpError };
