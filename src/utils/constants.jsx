export const EMAIL_PATTERN = {
  required: {
    value: true,
    message: "This field is required.",
  },
  pattern: {
    value: /^\S+@\S+\.\S+$/i,
    message: "Invalid email address format",
  },
};

export const PASSWORD_PATTERN = {
  required: {
    value: true,
    message: "This field is required.",
  },
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters",
  },
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+|~=`{}[\]:";'<>?,./]).{8,}$/,
    message:
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
  },
};

export const PHONE_NUMBER_PATTERN = {
  required: {
    value: true,
    message: "This field is required.",
  },
  pattern: {
    value: /^.{5,15}$/,
    message: "Invalid field length",
  },
};

export const NAME_PATTERN = {
  required: {
    value: true,
    message: "This field is required.",
  },
  pattern: {
    value: /^.{3,55}$/,
    message: "Invalid field length",
  },
};
