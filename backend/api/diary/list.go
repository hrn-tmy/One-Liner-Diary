package diary

import (
	"net/http"
	"one-liner-diary/model"

	"github.com/labstack/echo/v4"
)

func (dh DiaryHandler) List(ctx echo.Context) error {
	list := []model.Diary{}
	if err := dh.DB.Find(&list).Error; err != nil {
		return ctx.JSON(http.StatusInternalServerError, err)
	}
	return ctx.JSON(http.StatusOK, list)
}
