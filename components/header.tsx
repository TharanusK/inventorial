export default function Header({ title }: Readonly<{ title: string }>) {
  return <p className="text-6xl text-primary font-mono">{title}</p>;
}
