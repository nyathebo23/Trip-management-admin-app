import { SchemaPath, validate } from "@angular/forms/signals";

export function shouldNotStartWithSpace(path: SchemaPath<string>, options?: {message?: string}) {
  validate(path, ({value}) => {
    if (value().length > 0 && !/^\S/.test(value())) {
      return {
        kind: 'textField',
        message: options?.message || "This field shouldn' t start with space"
      };
    }
    return null;    
  });
}

export function shouldStartWithLetter(path: SchemaPath<string>, options?: { message?: string }) {
  validate(path, ({ value }) => {
    const v = value() || '';
    if (v.length === 0) return null;
    if (!/^[A-Za-z].*$/.test(v)) {
      return { 
        kind: 'username', 
        message: options?.message || 'Must start with a letter' 
      };
    }
    return null;
  });
}

export function shouldBeAlphanumeric(path: SchemaPath<string>, options?: { message?: string }) {
  validate(path, ({ value }) => {
    const v = value() || '';
    if (v.length === 0) return null;
    if (!/^[A-Za-z0-9]+$/.test(v)) {
      return { 
        kind: 'username', 
        message: options?.message || 
        'Must contain only alphanumeric characters' 
      };
    }
    return null;
  });
}

export function passwordsShouldmatch(confirmPath: SchemaPath<string>, 
  passwordPath: SchemaPath<string>, options?: { message?: string }) {
  validate(confirmPath, ({ value, valueOf }) => {
      const confirmPassword = value();
      const password = valueOf(passwordPath);
      if (confirmPassword !== password) {
        return {
          kind: 'passwordMismatch',
          message: options?.message || 'Passwords do not match',
        };
      }
      return null;
  });
}

export function requireDigit(path: SchemaPath<string>, options?: { message?: string }) {
  validate(path, ({ value }) => {
    const v = value() || '';
    if (v.length === 0) return null;
    if (!/[0-9]/.test(v)) return { 
      kind: 'requireDigit', 
      message: options?.message || 'Must contain at least one digit' 
    };
    return null;
  });
}

export function requireLowercase(path: SchemaPath<string>, options?: { message?: string }) {
  validate(path, ({ value }) => {
    const v = value() || '';
    if (v.length === 0) return null;
    if (!/[a-z]/.test(v)) return { 
      kind: 'requireLowercase',
      message: options?.message || 'Must contain at least one lowercase letter' 
    };
    return null;
  });
}

export function requireUppercase(path: SchemaPath<string>, options?: { message?: string }) {
  validate(path, ({ value }) => {
    const v = value() || '';
    if (v.length === 0) return null;
    if (!/[A-Z]/.test(v)) return { 
      kind: 'requireUppercase', 
      message: options?.message || 'Must contain at least one uppercase letter' 
    };
    return null;
  });
}

export function requireNonAlphanumeric(path: SchemaPath<string>, options?: { message?: string }) {
  validate(path, ({ value }) => {
    const v = value() || '';
    if (v.length === 0) return null;
    if (!/[^a-zA-Z0-9]/.test(v)) return { 
      kind: 'requireNonAlphanumeric', 
      message: options?.message || 'Must contain at least one non-alphanumeric character' 
    };
    return null;
  });
}

export function requireNoSpaces(path: SchemaPath<string>, options?: { message?: string }) {
  validate(path, ({ value }) => {
    const v = value() || '';
    if (v.length === 0) return null;
    if (/\s/.test(v)) return { 
      kind: 'requireNoSpaces', 
      message: options?.message || 'Must not contain spaces' 
    };
    return null;
  });
}

export function minLength(path: SchemaPath<string>, length: number, options?: { message?: string }) {
  validate(path, ({ value }) => {
    const v = value() || '';
    if (v.length === 0) return null;
    if (v.length < length) return { 
      kind: 'minLength', 
      message: options?.message || `Must be at least ${length} characters long` 
    };
    return null;
  });
}

export function futureDateConstraint(path: SchemaPath<Date | null>, options?: { message?: string }) {
  validate(path, ({value}) => {
    const v = value();
    if (v == null) {
      return null;
    }
    if (v < new Date()) {
      return { 
        kind: 'futureDateConstraint', 
        message: options?.message || `The date you choose must be in the future` 
      };
    }
    return null;
  });
}

export function rangeDateValidity(startDatePath: SchemaPath<Date | null>, 
  endDatepath: SchemaPath<Date | null>,  options?: { message?: string }) {
  validate(endDatepath, ({value, valueOf}) => {
    const end = value();
    const start = valueOf(startDatePath);
    if (!end || !start)
      return null;
    if ( start >= end) {
      return { 
        kind: 'rangeDateValidity', 
        message: options?.message || `End date must be later than start date` 
      };
    }
    return null;
  });
}

export function validateDatetime(path: SchemaPath<Date | null>, options?: { message?: string }) {
  validate(path, ({ value }) => {
    const v = value();
    if (v == null) return null;
    if (isNaN(v.getTime())) {
      return {  
        kind: 'validateDatetime',
        message: options?.message || 'Date or time invalid'
      };
    } 
    return null;
  });
}
