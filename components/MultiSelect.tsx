import * as React from "react";
import { X, Check, ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      handleUnselect(value);
    } else {
      onChange([...selected, value]);
    }
  };

  const handleCustomAdd = () => {
    if (inputValue && !options.find((o) => o.value === inputValue) && !selected.includes(inputValue)) {
      onChange([...selected, inputValue]);
      setInputValue("");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <div
            role="combobox"
            aria-expanded={open}
            className={cn(
              "flex min-h-[44px] w-full flex-wrap items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
              className
            )}
          >
            <div className="flex flex-wrap gap-1">
              {selected.length > 0 ? (
                selected.map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="bg-[#F3E8FF] text-[#633991] hover:bg-[#E9D5FF] border-none px-3 py-1 flex items-center gap-2 rounded-full font-medium"
                  >
                    {item}
                    <button
                      className="ml-1 rounded-full outline-none hover:bg-purple-200 p-0.5"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUnselect(item);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={() => handleUnselect(item)}
                    >
                      <X className="h-3 w-3 text-[#633991]" />
                    </button>
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
          </div>
        }
      />
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 border-slate-200 shadow-xl" align="start">
        <Command>
          <CommandInput 
            placeholder="Type a custom position and press Enter..." 
            value={inputValue}
            onValueChange={setInputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCustomAdd();
              }
            }}
          />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>
              {inputValue ? (
                <div 
                  className="px-4 py-3 text-sm cursor-pointer hover:bg-purple-50 flex items-center justify-between"
                  onClick={handleCustomAdd}
                >
                  <span className="text-purple-700">Add "{inputValue}"</span>
                  <Badge variant="outline" className="text-[10px] uppercase">Custom</Badge>
                </div>
              ) : (
                <div className="p-4 text-sm text-center text-slate-500">No positions found.</div>
              )}
            </CommandEmpty>
            <CommandGroup heading="Suggestions" className="px-2">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer"
                >
                  <span className={cn(
                    "text-slate-700",
                    selected.includes(option.value) && "text-[#633991] font-semibold"
                  )}>
                    {option.label}
                  </span>
                  {selected.includes(option.value) && (
                    <div className="bg-[#633991] rounded-full p-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
