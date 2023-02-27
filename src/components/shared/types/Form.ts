/**
 * Holds props available for all forms.
 */
export interface DefaultFormProps {
    // The css class for the container holding all form elements
    containerClassName?: string;

    // The css class for the container holding one form field
    fieldContainerClassName?: string;

    // The css class for the container holding one checkbox field
    fieldCheckboxContainerClassName?: string;

    // The css class for a field label
    fieldLabelClassName?: string;

    // The css class for one field input
    fieldInputClassName?: string;

    // The css class for one field being a checkbox
    fieldCheckboxInputClassName?: string;

    // The css class for some info related to the info field
    fieldInfoClassName?: string;

    // The css class for the container holding the error text for a form field
    fieldErrorClassName?: string;

    // The css class for the submit button container
    submitButtonContainerClassName?: string;

    // The css class for the submit button
    submitButtonClassName?: string;

    // The text shown in the submit button
    labelSubmitButton?: string;
}
