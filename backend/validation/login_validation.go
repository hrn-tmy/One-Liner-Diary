package validation

import (
	"fmt"
	"one-liner-diary/model"
	"regexp"
)

func ValidateLoginReq(req model.ReqLoginUser) error {
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
	return nil
}
