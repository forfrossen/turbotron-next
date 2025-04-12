import * as LucideIcons from "lucide-react";

export function getIconByName(name: string) {
  return (LucideIcons[name as keyof typeof LucideIcons] as LucideIcons.LucideIcon) || null;
}

export const RenderIcon = ({
  icon,
  props
}: Readonly<{ icon: string; props?: React.ComponentProps<LucideIcons.LucideIcon> | undefined }>) => {
  if (!icon) return null;
  const Icon = getIconByName(icon);
  return Icon ? <Icon className="mr-2 h-4 w-4" {...props} /> : null;
};
