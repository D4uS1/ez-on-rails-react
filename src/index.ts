import { EzOnRailsConfig } from './config/EzOnRailsConfig';
import { EzOnRailsHttp } from './http/EzOnRailsHttp';
import { EzOnRailsComponents } from './components/EzOnRailsComponents';
import { EzOnRailsIntegrations } from './integrations/EzOnRailsIntegrations';

// All of EzOnRails in one object
export const EzOnRails = {
    config: EzOnRailsConfig,
    http: EzOnRailsHttp,
    components: EzOnRailsComponents,
    integrations: EzOnRailsIntegrations
};

// Only config
export { EzOnRailsConfig } from './config/EzOnRailsConfig';

// Only http
export { EzOnRailsHttp, EzOnRailsHttpError } from './http/EzOnRailsHttp';

// Only components
export { EzOnRailsComponents } from './components/EzOnRailsComponents';

// Specific components
export { ActiveStorageDropzone } from './components/EzOnRails/ActiveStorageDropzone/ActiveStorageDropzone';
export { LoginForm } from './components/EzOnRails/LoginForm/LoginForm';
export { RegistrationForm } from './components/EzOnRails/RegistrationForm/RegistrationForm';
export { LostPasswordForm } from './components/EzOnRails/LostPasswordForm/LostPasswordForm';
export { UpdateUserForm } from './components/EzOnRails/UpdateUserForm/UpdateUserForm';
export { ProtectedPage } from './components/EzOnRails/ProtectedPage/ProtectedPage';
export { ResetPasswordForm } from './components/EzOnRails/ResetPasswordForm/ResetPasswordForm';
export { ResendConfirmationForm } from './components/EzOnRails/ResendConfirmationForm/ResendConfirmationForm';
export { DevelopmentHint } from './components/EzOnRails/DevelopmentHint/DevelopmentHint';

// specific functions
export { defaultHttpHeader } from './http/client/EzOnRailsHttpClient';

// Types
export type { EzOnRailsAuthInfo, EzOnRailsUser, EzOnRailsUpdateUserParams } from './http/client/EzOnRailsHttpClient';
export type { RailsFileBlob } from './components/EzOnRails/ActiveStorageDropzone/ActiveStorageDropzone';
