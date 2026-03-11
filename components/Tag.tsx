type TagVariant = "default" | "lavender" | "pink" | "green" | "blue";

const styles: Record<TagVariant, string> = {
  default: "bg-surface text-fg-muted border-border",
  lavender: "bg-[#F4F2FF] text-[#6B5CE7] border-[#E5DFFF] dark:bg-[#1e1a2e] dark:text-[#a99cff] dark:border-[#2d2556]",
  pink: "bg-[#FDF2F8] text-[#c0629a] border-[#F5CDEB] dark:bg-[#2a1a22] dark:text-[#e89ac5] dark:border-[#3d1e2e]",
  green: "bg-[#F0FDF4] text-[#16a34a] border-[#BBF7D0] dark:bg-[#0f2a1a] dark:text-[#4ade80] dark:border-[#1a3d25]",
  blue: "bg-[#EFF6FF] text-[#2563eb] border-[#BFDBFE] dark:bg-[#0f1e35] dark:text-[#60a5fa] dark:border-[#1e3558]",
};

export default function Tag({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: TagVariant;
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
