export const ENTITY_KEYS = {
  groupId: 'groupId',
  lecturerId: 'lecturerId',
} as const;

export type EntityKey = (typeof ENTITY_KEYS)[keyof typeof ENTITY_KEYS];
