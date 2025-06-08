package utils

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/labstack/echo/v4"
)

func GetToken(ctx echo.Context) (int,error) {
	authHeader := ctx.Request().Header.Get("Authorization")
	if authHeader == "" {
		return 0, fmt.Errorf("トークンが存在しません。")
	}
	splitHeader := strings.Split(authHeader, ".")
	payload, err := base64.RawURLEncoding.DecodeString(splitHeader[1])
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