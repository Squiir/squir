export interface CreateGroupDto {
  name: string;
  memberIds: string[];
}

export type GroupMember = {
  id: string;
  username: string;
  avatarUrl?: string | null;
};

export type Group = {
  id: string;
  name: string;
  members: GroupMember[];
};

export type UpdatedGroup = {
  id: string;
  name: string;
};

export type AddGroupMembers = {
  groupId: string;
  memberIds: string[];
};
