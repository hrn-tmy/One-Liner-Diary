package utils

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/labstack/echo/v4"
)

func GetToken(ctx echo.Context) (int, error) {
	cookie, err := ctx.Cookie(os.Getenv("COOKIE_NAME"))
	if err != nil {
		return 0, fmt.Errorf("Cookieが存在しません。")
	}
	v := cookie.Value
	if v == "" {
		return 0, fmt.Errorf("トークンが存在しません。")
	}
	splitToken := strings.Split(v, ".")
	payload, err := base64.RawURLEncoding.DecodeString(splitToken[1])
	if err != nil {
		return 0, fmt.Errorf("ペイロードのデコードに失敗しました。")
	}
	var payloadData struct {
		UserID int `json:"user_id"`
		Exp    int `json:"exp"`
	}
	if err := json.Unmarshal(payload, &payloadData); err != nil {
		return 0, fmt.Errorf("ペイロードのJSONデコードに失敗しました。")
	}
	return payloadData.UserID, nil
}
