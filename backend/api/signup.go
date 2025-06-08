package api

import (
	"net/http"
	"one-liner-diary/model"
	"one-liner-diary/validation"
	"time"

	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

func (h Handler) Signup(ctx echo.Context) error {
	req := model.ReqUser{}
	if err := ctx.Bind(&req); err != nil {
		return ctx.JSON(http.StatusBadRequest, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	if err := validation.ValidateSignupValue(req); err != nil {
		return ctx.JSON(http.StatusBadRequest, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	hasedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), 10)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	user := model.User{
		Name:      req.Name,
		Email:     req.Email,
		Password:  string(hasedPassword),
		IsValid:   true,
		CreatedAt: time.Now(),
	}
	if err := h.DB.Create(&user).Error; err != nil {
		return ctx.JSON(http.StatusInternalServerError, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	return ctx.JSON(http.StatusCreated, nil)
}
