import { z } from "zod";

export const diariesSchema = z.object({
  diary_id: z.number(),
  created_at: z.string(),
  title: z.string(),
  did: z.string(),
});

export const diaryDetailSchema = z.object({
  diary_id: z.number(),
  title: z.string().min(1, "タイトルは必須です。"),
  did: z.string().min(1, "やったことは必須です。"),
});

export const diaryModalPropsSchema = z.object({
  diary_id: z.number(),
  onClose: z.function().args().returns(z.void()),
});

export const diaryCreateSchema = z.object({
  title: z.string().min(1, "タイトルは必須です。"),
  did: z.string().min(1, "やったことは必須です。"),
});

export const diaryUpdateSchema = z.object({
  title: z.string().min(1, "タイトルは必須です。"),
  did: z.string().min(1, "やったことは必須です。"),
});

export type ListType = z.infer<typeof diariesSchema>;

export type DiaryDetailType = z.infer<typeof diaryDetailSchema>;

export type DiaryDetailProps = z.infer<typeof diaryModalPropsSchema>;

export type CreateDiaryType = z.infer<typeof diaryCreateSchema>;

export type UpdateDiaryType = z.infer<typeof diaryUpdateSchema>;
