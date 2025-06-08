package diary

import (
	"errors"
	"net/http"
	"one-liner-diary/model"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func (dh DiaryHandler)Detail(ctx echo.Context) error {
	strDiaryID := ctx.Param("diary_id")
	diaryID, err := strconv.Atoi(strDiaryID)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	diary := model.Diary{}
	if err := dh.DB.Table("diaries").Where("diary_id=?", diaryID).Debug().Take(&diary).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return ctx.JSON(http.StatusNotFound, model.ErrorResponse{Result: false, Message: err.Error()})
		}
		return ctx.JSON(http.StatusInternalServerError, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	return ctx.JSON(http.StatusOK, diary)
}