declare module "@/components/Button" {
  import { ButtonHTMLAttributes } from "react";
  import { VariantProps } from "class-variance-authority";
  
  const buttonVariants: (props?: any) => string;
  
  export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
    asChild?: boolean;
  }
  
  export const Button: React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLButtonElement>
  >;
  
  export { buttonVariants };
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