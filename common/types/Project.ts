type Project = {
  id: string;
  title: string;
  title_tags: string[];
  short_description: string;
  description: string;
  date: string;
  primaryHref: string;
  links: {
    text: string;
    href: string;
    icon: string;
  }[];
  tags: {
    title: string;
    icon: string;
  }[];
};
