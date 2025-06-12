type Project = {
  id: string;
  current?: boolean;
  shortTitle?: string;
  title: string;
  title_tags?: string[];
  images?: string[];
  short_description: string;
  description: string;
  date: string;
  primaryHref?: string;
  links: {
    text: string;
    href: string;
    icon: string;
  }[];
  tags: {
    title: string;
    icon: string;
    color?: string; // Optional color for the tag
  }[];
};
