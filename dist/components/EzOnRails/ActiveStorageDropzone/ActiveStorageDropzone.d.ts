import React from 'react';
import { Accept } from 'react-dropzone';
import './ActiveStorageDropzone.css';
import { EzOnRailsAuthInfo } from '../../../http/client/EzOnRailsHttpClient';
/**
 * Returns the relative url from the backend url to show the blob having the specified signedId and filename from the backend.
 *
 * @param signedId
 * @param filename
 */
export declare const blobShowPath: (signedId: string, filename: string) => string;
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
    authInfo: EzOnRailsAuthInfo;
    onChange: (files: RailsFileBlob[]) => void;
    files: RailsFileBlob[];
    textDropzone?: string;
    textPastezone?: string;
    multiple: boolean;
    maxFiles: number;
    onMaxFilesError: (maxFiles: number) => void;
    maxSize: number;
    onMaxSizeError: (maxSize: number) => void;
    accept?: Accept;
    onInvalidTypeError: (accept: Accept | undefined) => void;
    pasteZone?: boolean;
    customIcon?: React.ReactNode;
    className?: string;
    onHasPortraitPicture?: (value: boolean) => void;
}
/**
 * Image Uploader component for active storage content having a React dropzone
 * and some input field for pasting content.
 */
export declare const ActiveStorageDropzone: (props: ActiveStorageDropzoneProps) => JSX.Element;
