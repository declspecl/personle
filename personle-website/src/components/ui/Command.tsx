import React from "react";
import { cn } from "@lib/utils";
import { IconContext } from "react-icons";
import { CiSearch } from "react-icons/ci";
import { Command as CommandPrimitive } from "cmdk";

export const Command = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
    <CommandPrimitive
        ref={ref}
        className={cn(
            "h-full w-full flex flex-col overflow-hidden text-white",
            className
        )}
        {...props}
    />
));
Command.displayName = CommandPrimitive.displayName;

export const CommandInput = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Input>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
    <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
        <IconContext.Provider value={{ className: "mr-2 h-4 w-4 shrink-0 text-grey-light" }}>
            <CiSearch />
        </IconContext.Provider>

        <CommandPrimitive.Input
            ref={ref}
            className={cn(
                "py-3 h-11 w-full flex bg-transparent text-sm outline-none",
                "placeholder:text-grey-light",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

export const CommandList = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.List
        ref={ref}
        className={cn("max-h-80 overflow-y-auto overflow-x-hidden", className)}
        {...props}
    />
));
CommandList.displayName = CommandPrimitive.List.displayName;

export const CommandEmpty = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Empty>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
    <CommandPrimitive.Empty
        ref={ref}
        className="py-6 text-center text-sm"
        {...props}
    />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

export const CommandItem = React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
    <CommandPrimitive.Item
        ref={ref}
        className={cn(
            "px-2 py-1.5 relative flex items-center cursor-default select-none text-sm outline-none",
            "aria-selected:bg-blue-light aria-selected:text-black",
            "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
            className
        )}
        {...props}
    />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;