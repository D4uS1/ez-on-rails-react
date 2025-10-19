import { EzOnRailsAuthInfo, EzOnRailsHttpClient } from '../../http/client/EzOnRailsHttpClient';
import { AbstractUploader } from '@d4us1/remawy';
import * as ActiveStorage from '@rails/activestorage';
import { Blob as ActiveStorageBlob } from '@rails/activestorage';

/**
 * Helper class to upload files using the active storage package.
 * This class holds the directUploadWillCreateBlobWithXHR that is used by the active storage direct upload.
 */
class ActiveStorageUploaderDelegate {
    private uploader: EzOnRailsReMaWyUploader;
    private authInfo: EzOnRailsAuthInfo;
    private apiVersion: string;

    /**
     * Constructor takes the uploader that uses the delegate. This is used in directUploadWillCreateBlobWithXHR
     * to bind the onProgress callback of the uploader to the upload process.
     * The authInfo are the credentials for the current user.
     * The apiVersion is the backends api version that must match.
     *
     * @param uploader
     * @param authInfo
     * @param apiVersion
     */
    constructor(uploader: EzOnRailsReMaWyUploader, authInfo: EzOnRailsAuthInfo, apiVersion: string) {
        this.uploader = uploader;
        this.authInfo = authInfo;
        this.apiVersion = apiVersion;
    }

    /**
     * Called by the active storage to start the upload.
     * Appends the authInfo and apiVersion that was given in the constructor.
     * Binds the onDirectUploadProgress method of the uploader to the progress of the upload.
     *
     * @param request
     */
    directUploadWillCreateBlobWithXHR(request: XMLHttpRequest) {
        const httpHeader: { [key: string]: string } = EzOnRailsHttpClient.defaultHttpHeader(
            this.authInfo,
            null,
            this.apiVersion
        );

        Object.keys(httpHeader).forEach((key) => {
            request.setRequestHeader(key, httpHeader[key]);
        });

        request.upload.addEventListener('progress', (event) => this.uploader.onDirectUploadProgress(event));
    }
}

/**
 * Uploader to upload images or other assets to an ez-on-rails backend.
 */
class EzOnRailsReMaWyUploader extends AbstractUploader {
    private baseUrl: string;
    private authInfo: EzOnRailsAuthInfo;
    private apiVersion: string;

    /**
     * Constructor takes the baseUrl (the url that was already used at initializing the ez-on-rails-react component),
     * the authInfo of the current user and the apiVersion of the backend that is needed to accept the request.
     *
     * @param baseUrl
     * @param authInfo
     * @param apiVersion
     */
    constructor(baseUrl: string, authInfo: EzOnRailsAuthInfo, apiVersion: string) {
        super();

        if (!baseUrl.endsWith('/')) {
            baseUrl = `${baseUrl}/`;
        }

        this.baseUrl = baseUrl;
        this.authInfo = authInfo;
        this.apiVersion = apiVersion;
    }

    /**
     * Starts to upload the specified file to the backend.
     *
     * @param file
     */
    public override startUpload(file: File): Promise<void> {
        const delegate = new ActiveStorageUploaderDelegate(this, this.authInfo, this.apiVersion);

        const upload = new ActiveStorage.DirectUpload(
            file,
            `${this.baseUrl}api/active_storage/blobs/create_direct_upload`,
            delegate
        );

        upload.create((error: Error, blob: ActiveStorageBlob) => {
            if (error) {
                this.onError(error);
            } else {
                const url = `${this.baseUrl}rails/active_storage/blobs/${blob.signed_id}/${blob.filename}`;
                const metadata = {
                    signedId: blob.signed_id,
                    fileName: blob.filename
                };

                this.onFinish(url, file, metadata);
            }
        });

        return Promise.resolve(undefined);
    }

    /**
     * Called if some direct upload updates its progress.
     * Calls the onProgress callback of the uploader that should update the view.
     *
     * @param event
     */
    onDirectUploadProgress(event: ProgressEvent<XMLHttpRequestEventTarget>) {
        this.onProgress(event.loaded / event.total);
    }
}

export { EzOnRailsReMaWyUploader };
