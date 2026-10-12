type SectionScrollLinkProps = {
  href: string
  label: string
}

export function SectionScrollLink({ href, label }: SectionScrollLinkProps) {
  return (
    <a className="section-scroll" href={href}>
      {label}
    </a>
  )
}
