export type Group = {
  id: string;
  name: string;
  userIds: string[];
  createdAt: string;
  updatedAt: string;
};

export interface CreateGroupDto {
  name: string;
  memberIds: string[];
}
