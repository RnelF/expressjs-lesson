export const queryValidationSchema = {
  filter: {
    isString: {
      errorMessage: "Filter must be a string",
    },
    notEmpty: {
      errorMessage: "Filter must not be empty",
    },
    isLength: {
      options: { min: 1, max: 10 },
      errorMessage: "Filter must be between 1 and 10 characters",
    },
  },
  value: {
    optional: true,
    isString: {
      errorMessage: "Value must be a string",
    },
    notEmpty: {
      errorMessage: "Value must not be empty",
    },
    isLength: {
      options: { min: 1, max: 32 },
      errorMessage: "Value must be between 1 and 32 characters",
    },
  },
};
