export default function Header({ title }: Readonly<{ title: string }>) {
  return <p className="text-5xl text-primary">{title}</p>;
}
