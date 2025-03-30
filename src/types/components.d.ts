declare module "@/components/Button" {
  import { ButtonHTMLAttributes } from "react";
  
  type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "light" | "primary";
  type ButtonSize = "default" | "sm" | "lg" | "icon";
  
  export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
  }
  
  export const Button: React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLButtonElement>
  >;
  
  export const buttonVariants: (props?: {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
  }) => string;
}

declare module "@/components/Dropdown" {
  import { ComponentPropsWithoutRef, ElementRef, ForwardRefExoticComponent, RefAttributes } from "react";
  import * as DropdownMenuPrimitives from "@radix-ui/react-dropdown-menu";

  export const DropdownMenu: typeof DropdownMenuPrimitives.Root;
  export const DropdownMenuTrigger: typeof DropdownMenuPrimitives.Trigger;
  export const DropdownMenuContent: ForwardRefExoticComponent<
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Content> &
      RefAttributes<ElementRef<typeof DropdownMenuPrimitives.Content>>
  >;
  export const DropdownMenuItem: ForwardRefExoticComponent<
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.Item> & {
      shortcut?: string;
      hint?: string;
    } & RefAttributes<ElementRef<typeof DropdownMenuPrimitives.Item>>
  >;
} 