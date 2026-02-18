import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
type SearchInputProps = {
  search: string;
  setSearch: (value: string) => void;
  suffix?: React.ReactNode;
  name: string;
};
export function SearchInput({
  search,
  setSearch,
  suffix,
  name,
}: SearchInputProps) {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput
        name={name}
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">{suffix}</InputGroupAddon>
    </InputGroup>
  );
}
