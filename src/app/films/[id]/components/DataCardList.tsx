import { CardLink } from "@/components/ui/card-link";

import type { FieldAccessor } from "./data-cardlist-util";
import {
  isEmptyValue,
  resolveField,
  resolvePattern,
} from "./data-cardlist-util";
import { DefinitionEntry } from "./DefinitonEntry";
/**
 * Configuration for a single field to display in the card
 *
 * @template T - The type of items being displayed
 */
type Field<T> = {
  /** The human-readable label for this field */
  label: string;
  /** How to access/compute the value - can be a key name or a function */
  field: FieldAccessor<T, React.ReactNode>;
  /** skip rendering if itemvalue is empty */
  hideIfEmpty?: boolean;
};
type DataCardListProps<T extends Record<string, unknown>> = {
  /** Array of items to display as cards */
  items: T[];
  /** How to get the unique key for each item */
  keyField: FieldAccessor<T, string | number>;
  /** link href for each card */
  hrefPattern: string | ((item: T) => string);
  /** How to get the title/heading for each card */
  titleField: FieldAccessor<T, React.ReactNode>;
  /** Array of fields to display in each card */
  fields: Field<T>[];
  hideIfEmpty?: boolean;
};
export function DataCardList<T extends Record<string, unknown>>({
  items,
  keyField,
  hrefPattern,
  titleField,
  fields,
  hideIfEmpty = true,
}: DataCardListProps<T>) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item) => {
        const key = resolveField(item, keyField);
        const title = resolveField(item, titleField);
        const href = resolvePattern(item, hrefPattern, keyField);

        return (
          <li key={String(key)}>
            <CardLink href={href} title={String(title)}>
              <dl className="divide-y divide-gray-100">
                {fields.map((config, index) => {
                  const value = resolveField(item, config.field);
                  // Skip rendering if hideIfEmpty is true (default) and value is empty
                  const shouldHide =
                    (hideIfEmpty || config.hideIfEmpty) !== false &&
                    isEmptyValue(value);
                  if (shouldHide) {
                    return null;
                  }
                  return (
                    <DefinitionEntry
                      key={index}
                      label={config.label}
                      value={value}
                    />
                  );
                })}
              </dl>
            </CardLink>
          </li>
        );
      })}
    </ul>
  );
}
