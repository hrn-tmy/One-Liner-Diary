package diary

import (
	"net/http"
	"one-liner-diary/model"
	"strconv"

	"github.com/labstack/echo/v4"
)

func (dh DiaryHandler) Delete(ctx echo.Context) error {
	strDiaryID := ctx.Param("diary_id")
	diaryID, err := strconv.Atoi(strDiaryID)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	result := dh.DB.Table("diaries").Where("diary_id=?", diaryID).Delete(&model.Diary{})
	if result.Error != nil {
		return ctx.JSON(http.StatusInternalServerError, model.ErrorResponse{Result: false, Message: result.Error.Error()})
	}
	if result.RowsAffected == 0 {
		return ctx.JSON(http.StatusNotFound, model.ErrorResponse{Result: false, Message: "指定した日記は存在しません。"})
	}
	return ctx.NoContent(http.StatusNoContent)
}
