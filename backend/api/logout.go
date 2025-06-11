package api

import (
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
)

func (h Handler)Logout(ctx echo.Context) error {
	cookie, err := ctx.Cookie(os.Getenv("COOKIE_NAME"))
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, err.Error())
	}
	cookie.MaxAge = -1
	ctx.SetCookie(cookie)

	return ctx.JSON(http.StatusOK, nil)
}