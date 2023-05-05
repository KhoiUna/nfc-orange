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
  major: string
  first_name: string,
  middle_name?: string,
  last_name: string,
  avatar_url?: string
}