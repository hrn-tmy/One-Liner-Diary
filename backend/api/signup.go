package api

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h Handler) Signup(ctx echo.Context) error {
	return ctx.JSON(http.StatusOK, nil)
}
