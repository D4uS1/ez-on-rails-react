import {
    EzOnRailsHttpClient,
    EzOnRailsAuthInfo,
    EzOnRailsUser,
    EzOnRailsUpdateUserParams
} from './client/EzOnRailsHttpClient';
import { EzOnRailsSwr } from './swr/EzOnRailsSwr';
import { EzOnRailsHttpUtils } from './utils/EzOnRailsUtils';

export const EzOnRailsHttp = {
    client: EzOnRailsHttpClient,
    swr: EzOnRailsSwr,
    utils: EzOnRailsHttpUtils
};

export { EzOnRailsAuthInfo, EzOnRailsUser, EzOnRailsUpdateUserParams };

export { EzOnRailsHttpError } from './client/EzOnRailsHttpError';
