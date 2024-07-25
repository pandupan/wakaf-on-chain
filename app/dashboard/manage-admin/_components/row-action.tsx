import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaEllipsis } from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";

interface IProps {
  disabled: boolean;
  onClickDelete: () => void;
}

function RowAction({ disabled, onClickDelete }: IProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="data-[state=open]:bg-muted text-xs">
          <FaEllipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[200px] space-y-1"
      >
        <DropdownMenuItem disabled={disabled}>
          <button
            onClick={onClickDelete}
            disabled={disabled}
            className="w-full flex items-center gap-2 text-red-500"
          >
            <FiTrash2 /> Hapus admin
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default RowAction