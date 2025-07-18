import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";

export default function GoBackButtonWithTitle({
  href,
  title,
}: Readonly<{
  href: string;
  title: string;
}>) {
  return (
    <div className="flex w-full items-center gap-1">
      <Link href={href}>
        <ArrowBackIosIcon sx={{ color: "hsl(var(--foreground))" }} />
      </Link>
      <p className="text-3xl">{title} </p>
    </div>
  );
}
