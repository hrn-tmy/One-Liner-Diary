import { z } from "zod";

export const userSchema = z
  .object({
    name: z
      .string()
      .min(1, "名前は必須です。")
      .max(255, "名前は255文字以下で指定してください。"),
    email: z
      .string()
      .min(1, "メールアドレスは必須です。")
      .max(255, "メールアドレスは255文字以下で指定してください。")
      .regex(
        /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
        "有効なメールアドレスを入力してください。"
      ),
    password: z
      .string()
      .min(8, "パスワードは8文字以上で指定してください。")
      .max(20, "パスワードは20文字以下で指定してください。")
      .refine(
        (value) => {
          const rules = [
            /[a-z]/.test(value),
            /[A-Z]/.test(value),
            /[0-9]/.test(value),
            /[!@#$%^&*]/.test(value),
          ];
          return rules.filter(Boolean).length >= 2;
        },
        {
          message:
            "パスワードは大文字・小文字・数字・記号のうち2種類以上を含めてください。",
        }
      ),
    confirmPassword: z
      .string()
      .min(8, "パスワード（確認用）は8文字以上で指定してください。")
      .max(20, "パスワード（確認用）は20文字以下で指定してください。")
      .refine(
        (value) => {
          const rules = [
            /[a-z]/.test(value),
            /[A-Z]/.test(value),
            /[0-9]/.test(value),
            /[!@#$%^&*]/.test(value),
          ];
          return rules.filter(Boolean).length >= 2;
        },
        {
          message:
            "パスワードは大文字・小文字・数字・記号のうち2種類以上を含めてください。",
        }
      ),
  })
  .refine((data) => data.password !== data.confirmPassword, {
    message: "パスワードが一致しません。",
    path: ["confirmPassword"],
  });

export type signupData = z.infer<typeof userSchema>;
