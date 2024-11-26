export function checkPasswordStrength(password: string) {
  const strengthRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return strengthRegex.test(password);
}
