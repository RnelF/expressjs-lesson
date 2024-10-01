import { query } from "express";

export const queryValidationSchema = {
  query: {
    filter: {
      isString: true,
      notEmpty: {
        errorMessage: "Must not be empty",
      },
      isLength: {
        options: {
          min: 5,
          max: 32,
        },
        errorMessage: "must be atleast 3-10 Characters",
      },
    },
    value: {
      isString: true,
      notEmpty: {
        errorMessage: "value must not be Empty",
      },
    },
    isLength: {
      options: { min: 1, max: 32 },
      errorMessage: "Value must be 1 to 32 Characters",
    },
  },
};
