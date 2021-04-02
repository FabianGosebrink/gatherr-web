export class ModelDescriptor<T> {
  links: Links[];
  value: T;
  metadata: any;
}

export class Links {
  href: string;
  method: string;
  rel: string;
}
