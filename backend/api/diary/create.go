package diary

import (
	"net/http"
	"one-liner-diary/model"
	"one-liner-diary/utils"

	"github.com/labstack/echo/v4"
)

func (dh DiaryHandler) Create(ctx echo.Context) error {
	userID, err := utils.GetToken(ctx)
	if err != nil {
		return ctx.JSON(http.StatusUnauthorized, err.Error())
	}
	diary := model.Diary{}
	if err := ctx.Bind(&diary); err != nil {
		return ctx.JSON(http.StatusBadRequest, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	diary.UserID = userID
	if err := dh.DB.Create(&diary).Error; err != nil {
		return ctx.JSON(http.StatusInternalServerError, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	return ctx.JSON(http.StatusCreated, nil)
}
