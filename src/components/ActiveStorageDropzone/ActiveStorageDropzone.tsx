import React from 'react';
import * as ActiveStorage from '@rails/activestorage';
import { ReactNode, useState } from 'react';
import { ClipboardEvent, MouseEvent } from 'react';
import Dropzone, { Accept, ErrorCode, FileRejection } from 'react-dropzone';
import { useEzOnRails } from '../../hooks';
import { EzOnRailsHttpUtils } from '../../http/utils/EzOnRailsUtils';
import { EzOnRailsHttpClient } from '../../http/client/EzOnRailsHttpClient';
import styles from './ActiveStorageDropzone.module.css';

/**
 * Returns the relative url from the backend url to show the blob having the specified signedId and filename from the backend.
 *
 * @param signedId
 * @param filename
 */
export const blobShowPath = (signedId: string, filename: string): string => {
    return `rails/active_storage/blobs/${signedId}/${filename}`;
};

/**
 * Returns true if the file behind the specified filename is an image.
 *
 * @param filename
 */
const isImage = (filename: string): boolean => {
    return filename.match(/\.(jpeg|jpg|gif|png|bmp|tif|tiff)$/) !== null;
}

/**
 * Describes a rails file blob.
 */
export interface RailsFileBlob {
    signedId?: string;
    path?: string;
    filename?: string;
}

/**
 * Props for the ActiveStorageDropzone component.
 */
export interface ActiveStorageDropzoneProps {
    // Called if the files value changed.
    onChange: (files: RailsFileBlob[]) => void;

    // Used for edit action to initially load the existing files to the dropzone
    files: RailsFileBlob[];

    // The text shown in the dropzone component. Use empty string to show no text
    textDropzone?: string;

    // The text shown in the pastezone component
    textPastezone?: string;

    // Indicates whether multiple files are allowed.
    multiple: boolean;

    // If multiple is true, this is the maximum number of allowed files
    maxFiles: number;

    // Called if the user tried to insert more files than the limit to maxFiles
    onMaxFilesError: (maxFiles: number) => void;

    // The maximum size of a file allowed in bytes
    maxSize: number;

    // Called if the user tried to insert files having more than the limited maxSize
    onMaxSizeError: (maxSize: number) => void;

    // One media type to filter allowed files. This can be used to allow only images for instance
    accept?: Accept;

    // Called if the user tried to upload a file with a type that is not accepted
    onInvalidTypeError: (accept: Accept | undefined) => void;

    // Indicates if the paste zone should be available
    pasteZone?: boolean;

    // set custom icon for dropzone
    customIcon?: React.ReactNode;

    // set custom styling
    className?: string;
}

/**
 * Image Uploader component for active storage content having a React dropzone
 * and some input field for pasting content.
 */
export const ActiveStorageDropzone = (props: ActiveStorageDropzoneProps) => {
    const { backendUrl, authInfo, apiKey, apiVersion, additionalHttpHeaders } = useEzOnRails();
    const [uploadsInProgress, setUploadsInProgress] = useState<number>(0);

    // standard upload icon for dropzone (from boostrap icons)
    const standardUploadIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-cloud-arrow-up"
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
            />
            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
        </svg>
    );

    /**
     * Removes the file having the given signedId from the server.
     *
     * @param signedId
     */
    const removeFileFromServer = async (signedId: string) => {
        await EzOnRailsHttpClient.delete(backendUrl, `active_storage/blobs/${signedId}`, null, authInfo, apiKey, apiVersion, undefined, additionalHttpHeaders);
    };

    /**
     * Removes the file having the specified signedId from the server and the dropzone,
     *
     * @param event The javascript event to stop other onclick callbacks.
     * @param signedId The signed id of the image.
     */
    const removeFile = async (event: MouseEvent, signedId: string) => {
        // remove file from server to prevent garbage
        await removeFileFromServer(signedId);

        // Remove from this component
        let newFiles = [...props.files];
        newFiles = newFiles.filter((file) => signedId !== file.signedId);
        props.onChange(newFiles);

        // Supress dropzones onclick callback
        event.stopPropagation();
        event.preventDefault();
    };

    /**
     * Called if some direct upload updates its progress.
     * Updates the state to rerender the view.
     *
     * @param event
     */
    const onDirectUploadProgress = (event: ProgressEvent<XMLHttpRequestEventTarget>) => {
        if (event.loaded / event.total >= 0.9999999) {
            // console.log('Upload finished');
        }
    };

    /**
     * Called by the dropzone if some file is dropped into it.
     * Uploads the file to the active storage.
     *
     * @param acceptedFiles The dropped files.
     */
    const onDropAccepted = (acceptedFiles: File[]) => {
        // if we have no acceptedFiles, just leave
        if (!acceptedFiles.length) return;

        // Only allow as many acceptedFiles as specified
        // This check is necessary, since there is no rejection callback from the dropzone,
        //   if there is already a file in the dropzone and another file with the correct size and type was added,
        //   but the total number of files would exceed the allowed number.
        // However, the rejection callback is invoked, if the dropzone is initially empty and
        //   too many files (with the correct size and type) were dropped.
        if (props.maxFiles) {
            const maxNewFiles = props.maxFiles - (props.files.length + uploadsInProgress);

            if (maxNewFiles < acceptedFiles.length) {
                props.onMaxFilesError(props.maxFiles);
            }

            if (maxNewFiles <= 0) return;

            acceptedFiles = acceptedFiles.slice(0, maxNewFiles);
        }

        // Only allow files with limited size
        if (props.maxSize) {
            const sizeFilteredFiles = acceptedFiles.filter((file) => file.size <= props.maxSize);
            if (sizeFilteredFiles.length < acceptedFiles.length) {
                // TODO: Is this callback ever called?
                props.onMaxSizeError(props.maxSize);
            }

            acceptedFiles = sizeFilteredFiles;
        }

        // Update the number of uploads for feedback
        setUploadsInProgress((uploadsInProgress) => uploadsInProgress + acceptedFiles.length);

        // try to upload every file
        acceptedFiles.forEach((acceptedFile) => {
            // upload the file to the active storage
            // let uploader = new ActiveStorageUploader(onDirectUploadProgress, props.authInfo)
            const upload = new ActiveStorage.DirectUpload(
                acceptedFile,
                EzOnRailsHttpUtils.toApiUrl(backendUrl, 'active_storage/blobs/create_direct_upload'),
                {
                    directUploadWillCreateBlobWithXHR: (request: XMLHttpRequest) => {
                        const httpHeader: { [key: string]: string } = EzOnRailsHttpClient.defaultHttpHeader(
                            authInfo,
                            apiKey,
                            apiVersion
                        );

                        Object.keys(httpHeader).forEach((key) => {
                            request.setRequestHeader(key, httpHeader[key]);
                        });

                        request.upload.addEventListener('progress', onDirectUploadProgress);
                    }
                }
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            upload.create((error: Error | null, blob: any) => {
                setUploadsInProgress((uploadsInProgress) => uploadsInProgress - 1);
                // if some error occurs, just print it to the console and do nothing else
                if (error) {
                    // console.log('Image Error:', error);
                } else {
                    const file: RailsFileBlob = { signedId: blob.signed_id };
                    // create preview image, if this is an image, otherwise, just create a preview Text
                    if (acceptedFile.type.includes('image')) {
                        file.path = blobShowPath(blob.signed_id, blob.filename);
                    } else {
                        file.filename = blob.filename;
                    }

                    // Set current files to render them
                    const newFiles = props.files;
                    newFiles.push(file);
                    props.onChange([...newFiles]);
                }
            });
        });
    };

    /**
     * Called if some value is pasted into the input paste field.
     * Tries to catch the value. If it is a file, it will be pasted into
     * the dropzone.
     *
     * @param event The javascript event.
     */
    const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
        // if no clipboard was detected
        if (!event.clipboardData) return;

        // catch all clipboard items, if exists
        const items = event.clipboardData.items;
        if (items === undefined) return;

        const pastedFiles = [];
        // @ts-ignore this is nonsense, it is iterable...
        for (const item of items) {
            // this item is no image
            if (props.accept && !Object.keys(props.accept).some((type) => item.type.match(type))) continue;

            const file = item.getAsFile();

            if (file) {
                pastedFiles.push(file);
            }
        }

        onDropAccepted(pastedFiles);
    };

    // preview of the current stated files
    const previews = props.files.map((file) => (
        <div
            key={file.signedId}
            className="card w-25 animate__animated animate__fadeIn mb-4"
            style={{ flex: '0 0 auto' }}
        >
            <div className={'card-header p-1'}>
                <button
                    onClick={(event) => removeFile(event, file.signedId || '')}
                    type="button"
                    className="close"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className={'d-flex justify-content-center align-items-center w-100 h-100'}>
                { isImage(file.filename || '') ? (
                    <img
                        src={EzOnRailsHttpUtils.toBaseUrl(backendUrl, file.path || '')}
                        alt={file.filename}
                        className={'d-block mw-100 m-auto m-0 rounded p-1'}
                    />
                ) : (
                    <span>{file.filename}</span>
                )}
            </div>
        </div>
    ));

    // shows some indicator for some incoming files
    const progressSpinners: ReactNode[] = [];

    for (let i = 0; i < uploadsInProgress; i++) {
        progressSpinners.push(
            <div key={i} className="card w-25 mb-4" style={{ flex: '0 0 auto' }}>
                <div className={'d-flex justify-content-center align-items-center w-100 h-100'}>
                    <div className="p-4 text-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Called if one or more files were rejected by the dropzone.
     * Checks why the files were rejected and calls the related callbacks in the props.
     *
     * @param fileRejections
     */
    const onDropzoneRejection = (fileRejections: FileRejection[]) => {
        // too many files ?
        if (fileRejections.some((fileRejection) => fileRejection.errors[0].code === ErrorCode.TooManyFiles)) {
            props.onMaxFilesError(props.maxFiles);
        }

        // invalid type ?
        if (fileRejections.some((fileRejection) => fileRejection.errors[0].code === ErrorCode.FileInvalidType)) {
            props.onInvalidTypeError(props.accept);
        }

        // file too large ?
        if (fileRejections.some((fileRejection) => fileRejection.errors[0].code === ErrorCode.FileTooLarge)) {
            props.onMaxSizeError(props.maxSize);
        }
    };

    // dropzone having a drop area
    return (
        <div>
            {props.pasteZone && (
                <input
                    type="text"
                    className={`w-100 p-2 ${styles.pastezoneContainer}`}
                    value={props.textPastezone || 'Copy and paste some files here'}
                    onPaste={onPaste}
                    readOnly
                />
            )}
            <Dropzone
                onDropAccepted={onDropAccepted}
                multiple={props.multiple}
                maxFiles={props.maxFiles}
                maxSize={props.maxSize}
                onDropRejected={onDropzoneRejection}
                accept={props.accept}
            >
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps()} className={`${styles.dropzoneContainer} p-4 ${props.className}`}>
                            {/* the file input field, but invisible */}
                            <input {...getInputProps()} />

                            <p className={'m-0'}>
                                {props.textDropzone || "Drag 'n' drop some files here, or click to select files"}
                            </p>

                            {/* The preview of the current uploaded files */}
                            {previews.length > 0 ? (
                                <aside className={'card-deck justify-content-center w-100 m-4'}>{previews}</aside>
                            ) : (
                                <div className={'m-0'}>{props.customIcon || standardUploadIcon}</div>
                            )}
                            {progressSpinners.length > 0 && (
                                <aside className={'card-deck justify-content-center w-100 m-4'}>
                                    {progressSpinners}
                                </aside>
                            )}
                        </div>
                    </section>
                )}
            </Dropzone>
        </div>
    );
};
