export namespace Validator {
  export const isEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  };

  export const isUUID = (uuid: string): boolean => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    return uuidRegex.test(uuid);
  };

  /*
  1. The password must contain at least one digit.
  2. The total length of the password must be at least six characters.
  3. The password must include at least one non-alphanumeric character (special character).
  4. The password should not contain the character '\n'.
  5. There must be at least one uppercase letter.
  6. There must be at least one lowercase letter.
  */
  export const isStrongPassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*\d)(?=^.{6,}$)((?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    return passwordRegex.test(password);
  };

  // The date must in the iso format '2000-01-25T10:00:00.929Z'
  export const isISODate = (date: string): boolean => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    return dateRegex.test(date);
  };
}
