import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";

type ActionTypes = "Added" | "Edited" | "Deleted" | "All actions";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  actionType: ActionTypes;
  setActionType: (type: ActionTypes) => void;
}

export default function ActivityFilter({
  search,
  setSearch,
  actionType,
  setActionType,
}: Readonly<Props>) {
  return (
    <div className="flex w-full justify-between">
      <div className="relative w-[55%]">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
          <SearchIcon />
        </span>
        <Input
          className="pl-10 bg-card rounded-lg placeholder:text-sm"
          placeholder="Search products or users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 items-center">
        <select
          value={actionType}
          onChange={(e) => setActionType(e.target.value as ActionTypes)}
          className="border border-input text-sm rounded-md px-3 py-2 bg-card items-center"
        >
          <option value="All actions">All Actions</option>
          <option value="Added">Added</option>
          <option value="Edited">Edited</option>
          <option value="Deleted">Deleted</option>
        </select>
      </div>
    </div>
  );
}
