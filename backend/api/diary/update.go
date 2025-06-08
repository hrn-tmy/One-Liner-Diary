package diary

import (
	"net/http"
	"one-liner-diary/model"
	"one-liner-diary/utils"
	"one-liner-diary/validation"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

func (dh DiaryHandler) Update(ctx echo.Context) error {
	userID, err := utils.GetToken(ctx)
	if err != nil {
		return ctx.JSON(http.StatusUnauthorized, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	diary := model.Diary{}
	if err := ctx.Bind(&diary); err != nil {
		return ctx.JSON(http.StatusBadRequest, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	if err := validation.DiaryValidation(diary); err != nil {
		return ctx.JSON(http.StatusBadRequest, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	strDiaryID := ctx.Param("diary_id")
	diaryID, err := strconv.Atoi(strDiaryID)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	diary.UserID = userID
	diary.DiaryID = diaryID
	diary.UpdatedAt = time.Now()
	result := dh.DB.Table("diaries").Where("diary_id=?", diaryID).Debug().Updates(&model.Diary{Title: diary.Title, Did: diary.Did, UpdatedAt: diary.UpdatedAt})
	if result.Error != nil {
		return ctx.JSON(http.StatusInternalServerError, model.ErrorResponse{Result: false, Message: result.Error.Error()})
	}
	if result.RowsAffected == 0 {
		return ctx.JSON(http.StatusNotFound, model.ErrorResponse{Result: false, Message: "指定した日記が存在しません。"})
	}
	return ctx.JSON(http.StatusOK, nil)
}
