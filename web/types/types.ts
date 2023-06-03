export type Peer = {
  avatar_url?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  university_name: string;
  major: string;
};

export type Student =
  | Peer
  | {
    student_id: number;
    uuid: string;
  };

export type User = {
  id: number
  card_id: number | null
  email: string
  major: string
  expected_grad_date: string
  username: string
  first_name: string,
  middle_name: string | null,
  last_name: string,
  avatar_url: string | null
  banner_image_url: string | null
  bio: string | null
  created_at: string
  is_premium: boolean
}

export type Link = {
  link_title: string,
  url: string
}