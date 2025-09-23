export interface PostInterface {
  id: number;
  image: string;
  description: string;
  title: string;
  createdAt: string;
  author: Author;
  likes: any[];
  thumbnailLink: string;
  imageLink: string;
}

export interface PostRequest{
  image: string;
  description: string;
  title: string;
}

export interface Author {
  id: number;
  email: string;
  displayName: string;
  role: string;
  enabled: boolean;
  username: string;
  authorities: Authority[];
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
}

export interface Authority {
  authority: string;
}
