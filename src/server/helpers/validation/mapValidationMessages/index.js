const mapValidationMessages = (validationResult = {}) => validationResult
  .details.map(({ message, context }) => ({
    label: context.label,
    message,
  }));

export default mapValidationMessages;
