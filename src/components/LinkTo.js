import Link from "next/link";

export default function LinkTo({ to, ...props }) {
  return (
    <Link href={to}>
      <a {...props} />
    </Link>
  );
}
