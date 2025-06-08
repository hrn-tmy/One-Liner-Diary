package validation

import (
	"fmt"
	"one-liner-diary/model"
	"unicode/utf8"
)

func DiaryValidation(diary model.Diary) error {
	if diary.Title == "" {
		return fmt.Errorf("タイトルは必須です。")
	}
	if utf8.RuneCountInString(diary.Title) > 50 {
		return fmt.Errorf("タイトルは50文字以下で指定してください。")
	}
	if diary.Did == "" {
		return fmt.Errorf("やったことは必須です。")
	}
	return nil
}
