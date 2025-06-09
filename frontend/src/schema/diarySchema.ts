import { z } from "zod";

export const diariesSchema = z.object({
  diary_id: z.number(),
  created_at: z.string(),
  did: z.string(),
});

export const diaryDetail = z.object({
  diary_id: z.number(),
  did: z.string().min(1, "やったことは必須です。"),
  meaning: z.string().min(1, "自分にとっての意味は必須です。"),
  awareness: z.string().min(1, "気づきは必須です。"),
  next_action: z.string().min(1, "ネクストアクションは必須です。"),
});

export const diaryModalProps = z.object({
  diary_id: z.number(),
  onClose: z.function().args().returns(z.void()),
});

export const diaryCreateSchema = z.object({
  title: z.string().min(1, "タイトルは必須です。"),
  did: z.string().min(1, "やったことは必須です。"),
});

export type ListType = z.infer<typeof diariesSchema>;

export type ListDetailType = z.infer<typeof diaryDetail>;

export type ListDetailProps = z.infer<typeof diaryModalProps>;

export type CreateDiaryType = z.infer<typeof diaryCreateSchema>;
