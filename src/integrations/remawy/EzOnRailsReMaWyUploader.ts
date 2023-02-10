import { EzOnRailsAuthInfo, EzOnRailsHttpClient } from '../../http/client/EzOnRailsHttpClient';
import { AbstractUploader } from '@d4us1/remawy';
import * as ActiveStorage from '@rails/activestorage';
import { Blob as ActiveStorageBlob } from '@rails/activestorage';

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
        const upload = new ActiveStorage.DirectUpload(
            file,
            `${this.baseUrl}api/active_storage/blobs/create_direct_upload`,
            {
                directUploadWillCreateBlobWithXHR: (request: XMLHttpRequest) => {
                    const httpHeader: { [key: string]: string } = EzOnRailsHttpClient.defaultHttpHeader(
                        this.authInfo,
                        this.apiVersion
                    );

                    Object.keys(httpHeader).forEach((key) => {
                        request.setRequestHeader(key, httpHeader[key]);
                    });

                    request.upload.addEventListener('progress', this.onDirectUploadProgress);
                }
            }
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
