export type GroupInvitePayload = {
  groupId: string;
  groupName: string;
  invitedBy: {
    id: string;
    username: string;
    avatarUrl: string | null;
  };
};
