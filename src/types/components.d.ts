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

declare module "@/components/Dialog" {
  import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes } from "react";
  import * as DialogPrimitives from "@radix-ui/react-dialog";

  export const Dialog: (props: ComponentPropsWithoutRef<typeof DialogPrimitives.Root>) => JSX.Element;
  export const DialogTrigger: typeof DialogPrimitives.Trigger;
  export const DialogClose: typeof DialogPrimitives.Close;
  export const DialogContent: React.ForwardRefExoticComponent<
    ComponentPropsWithoutRef<typeof DialogPrimitives.Content>
  >;
  export const DialogHeader: (props: HTMLAttributes<HTMLDivElement>) => JSX.Element;
  export const DialogFooter: (props: HTMLAttributes<HTMLDivElement>) => JSX.Element;
  export const DialogTitle: React.ForwardRefExoticComponent<
    ComponentPropsWithoutRef<typeof DialogPrimitives.Title>
  >;
  export const DialogDescription: React.ForwardRefExoticComponent<
    ComponentPropsWithoutRef<typeof DialogPrimitives.Description>
  >;
}

declare module "@/components/Dropdown" {
  import { ComponentPropsWithoutRef, ElementRef, ForwardRefExoticComponent, RefAttributes } from "react";
  import * as DropdownMenuPrimitives from "@radix-ui/react-dropdown-menu";

  export const DropdownMenu: typeof DropdownMenuPrimitives.Root;
  export const DropdownMenuTrigger: typeof DropdownMenuPrimitives.Trigger;
  export const DropdownMenuGroup: typeof DropdownMenuPrimitives.Group;
  export const DropdownMenuSubMenu: typeof DropdownMenuPrimitives.Sub;
  export const DropdownMenuRadioGroup: typeof DropdownMenuPrimitives.RadioGroup;
  export const DropdownMenuLabel: typeof DropdownMenuPrimitives.Label;
  export const DropdownMenuSeparator: typeof DropdownMenuPrimitives.Separator;

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

  export const DropdownMenuSubMenuTrigger: ForwardRefExoticComponent<
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.SubTrigger> &
      RefAttributes<ElementRef<typeof DropdownMenuPrimitives.SubTrigger>>
  >;

  export const DropdownMenuSubMenuContent: ForwardRefExoticComponent<
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.SubContent> &
      RefAttributes<ElementRef<typeof DropdownMenuPrimitives.SubContent>>
  >;

  export const DropdownMenuCheckboxItem: ForwardRefExoticComponent<
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.CheckboxItem> & {
      shortcut?: string;
      hint?: string;
    } & RefAttributes<ElementRef<typeof DropdownMenuPrimitives.CheckboxItem>>
  >;

  export const DropdownMenuRadioItem: ForwardRefExoticComponent<
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitives.RadioItem> & {
      iconType?: "check";
    } & RefAttributes<ElementRef<typeof DropdownMenuPrimitives.RadioItem>>
  >;
} 