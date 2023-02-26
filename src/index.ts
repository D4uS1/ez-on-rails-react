import { EzOnRailsHttp } from './http/EzOnRailsHttp';
import { EzOnRailsIntegrations } from './integrations/EzOnRailsIntegrations';

// All of EzOnRails in one object
export const EzOnRails = {
    http: EzOnRailsHttp,
    integrations: EzOnRailsIntegrations
};

// contexts
export * from './contexts';

// components
export * from './components';

// hooks
export * from './hooks';

// Types
export type { EzOnRailsAuthInfo, EzOnRailsUser, EzOnRailsUpdateUserParams } from './http/client/EzOnRailsHttpClient';
export type { RailsFileBlob } from './components/ActiveStorageDropzone/ActiveStorageDropzone';

