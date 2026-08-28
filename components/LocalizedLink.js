import Link from "next/link";
import { localeHref } from "@/lib/i18n";

export default function LocalizedLink({ locale, href = "/", children, ...props }) {
  return <Link href={localeHref(locale, href)} {...props}>{children}</Link>;
}
