const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,20}$/;

export const usernameRequirements = "3-20 characters consisting of letters, numbers, or underscores";
export const passwordRequirements = "at least 8 characters";

export const isEmailValid = (value: string) => EMAIL_PATTERN.test(value.trim());
export const isPasswordValid = (value: string) => value.trim().length >= 8;
export const isUsernameValid = (value: string) => USERNAME_PATTERN.test(value.trim());
