/**
 * Represents a way to access a field from an object.
 * Can be either:
 * - A key of the object (e.g., "name", "id")
 * - A function that takes the object and returns a computed value
 *
 * @template T - The type of the object being accessed
 * @template R - The return type when accessing the field (defaults to any)
 *
 * @example
 * By key
 * const accessor: FieldAccessor<User, string> = "name";
 *
 * By a function
 * const accessor: FieldAccessor<User, string> = (user) => `${user.firstName} ${user.lastName}`;
 */
export type FieldAccessor<T, R = unknown> = keyof T | ((item: T) => R);

/**
 * Resolves a field value from an object using either a key or a function.
 *
 * @template T - The type of the object
 * @template R - The expected return type (defaults to any)
 *
 * @param item - The object to extract the value from
 * @param accessor - Either a property key or a function to compute the value
 *
 * @returns The resolved value from the object
 *
 * @example
 * const user = { id: 1, firstName: "John", lastName: "Doe" };
 *
 * // Using a key
 * resolveField(user, "firstName"); // "John"
 *
 * // Using a function
 * resolveField(user, (u) => `${u.firstName} ${u.lastName}`); // "John Doe"
 */
export function resolveField<T, R extends React.ReactNode>(
  item: T,
  accessor: FieldAccessor<T, R>,
): R {
  return typeof accessor === "function"
    ? accessor(item)
    : (item[accessor] as R);
}

/**
 * Resolves a URL pattern into an actual URL string.
 * Supports both static functions and pattern replacement.
 *
 * @template T - The type of the object
 *
 * @param item - The object containing data for URL generation
 * @param pattern - Either:
 *   - A function that generates the URL from the item
 *   - A string pattern with `:id` placeholder (e.g., "/users/:id")
 * @param keyAccessor - Optional accessor to get the ID value for pattern replacement
 *
 * @returns The resolved URL string
 *
 * @example
 * const user = { id: 123, role: "admin" };
 *
 * // Using a pattern string
 * resolvePattern(user, "/users/:id", "id"); // "/users/123"
 *
 * // Using a function
 * resolvePattern(user, (u) => `/users/${u.role}/${u.id}`); // "/users/admin/123"
 */
export function resolvePattern<T>(
  item: T,
  pattern: string | ((item: T) => string),
  keyAccessor?: FieldAccessor<T, string | number>,
): string {
  // If pattern is a function, call it with the item
  if (typeof pattern === "function") {
    return pattern(item);
  }

  // If pattern contains :id placeholder and we have a key accessor, replace it
  if (keyAccessor && pattern.includes(":id")) {
    const key = resolveField(item, keyAccessor);
    return pattern.replace(":id", String(key));
  }

  // Otherwise return the pattern as-is
  return pattern;
}
/**
 * Checks if a value should be considered empty/null and hidden.
 * Returns true for: null, undefined, empty string, NaN
 *
 * @param value - The value to check
 * @returns true if the value should be hidden
 */
export function isEmptyValue(value: unknown): boolean {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (typeof value === "number" && isNaN(value))
  );
}
