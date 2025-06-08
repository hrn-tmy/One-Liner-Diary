package validation

import (
	"fmt"
	"one-liner-diary/model"
	"regexp"
	"unicode/utf8"
)

func ValidateSignupValue(req model.ReqUser) error {
	if req.Name == "" {
		return fmt.Errorf("名前は必須です。")
	}
	if utf8.RuneCountInString(req.Name) > 255 {
		return fmt.Errorf("名前は255文字以下で指定してください。")
	}
	if req.Email == "" {
		return fmt.Errorf("メールアドレスは必須です。")
	}
	if len(req.Email) > 255 {
		return fmt.Errorf("メールアドレスは255文字以下で指定してください。")
	}
	pattern := `^[a-zA-Z0-9!@#\$%\^&\*]+@[a-zA-Z0-9!@#\$%\^&\*]+\.[a-zA-Z]+$`
	re := regexp.MustCompile(pattern)
	if !re.MatchString(req.Email) {
		return fmt.Errorf("不正なメールアドレスの形式です。")
	}
	if req.Password == "" {
		return fmt.Errorf("パスワードは必須です。")
	}
	if len(req.Password) > 255 {
		return fmt.Errorf("パスワードは255文字以内で指定してください。")
	}
	if count := ValidatePassword(req.Password); count < 2 {
		return fmt.Errorf("パスワードには英大文字・小文字・数字・記号（!@#$%%^&*）のうち2種類以上を含めてください。")
	}
	if req.ConfirmPassword == "" {
		return fmt.Errorf("パスワード（確認用）は必須です。")
	}
	if len(req.ConfirmPassword) > 255 {
		return fmt.Errorf("パスワード（確認用）は255文字以内で指定してください。")
	}
	if count := ValidatePassword(req.ConfirmPassword); count < 2 {
		return fmt.Errorf("パスワード（確認用）には英大文字・小文字・数字・記号（!@#$%%^&*）のうち2種類以上を含めてください。")
	}

	return nil
}

func ValidatePassword(password string) int {
	count := 0
	if regexp.MustCompile(`[A-Z]`).MatchString(password) {
		count++
	}
	if regexp.MustCompile(`[a-z]`).MatchString(password) {
		count++
	}
	if regexp.MustCompile(`[0-9]`).MatchString(password) {
		count++
	}
	if regexp.MustCompile(`[!@#\$%\^&\*]`).MatchString(password) {
		count++
	}
	return count
}
