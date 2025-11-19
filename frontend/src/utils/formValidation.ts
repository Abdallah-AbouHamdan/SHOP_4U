const USERNAME_MIN_LENGTH = 3;
const PASSWORD_MIN_LENGTH = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isUsernameValid = (value: string) => value.trim().length >= USERNAME_MIN_LENGTH;
export const isPasswordValid = (value: string) => value.trim().length >= PASSWORD_MIN_LENGTH;
export const isEmailValid = (value: string) => EMAIL_REGEX.test(value.trim());

export const usernameRequirements = `at least ${USERNAME_MIN_LENGTH} characters`;
export const passwordRequirements = `at least ${PASSWORD_MIN_LENGTH} characters`;
