package api

import (
	"errors"
	"net/http"
	"one-liner-diary/model"
	"one-liner-diary/validation"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

func (h Handler)Login(ctx echo.Context) error {
	req := model.ReqLoginUser{}
	if err := ctx.Bind(&req); err != nil {
		return ctx.JSON(http.StatusBadRequest, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	if err := validation.ValidateLoginReq(req); err != nil {
		return ctx.JSON(http.StatusBadRequest, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	user := model.User{}
	if err := h.DB.Where("email=?", req.Email).Take(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return ctx.JSON(http.StatusNotFound, model.ErrorResponse{Result: false, Message: err.Error()})
		}
		return ctx.JSON(http.StatusInternalServerError, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return ctx.JSON(http.StatusInternalServerError, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	token, err := generateToken(user)
	if err != nil {
		return ctx.JSON(http.StatusInternalServerError, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	if err := SetCookie(ctx, token); err != nil {
		return ctx.JSON(http.StatusInternalServerError, model.ErrorResponse{Result: false, Message: err.Error()})
	}
	return ctx.JSON(http.StatusOK, nil)
}

func generateToken(user model.User) (string, error) {
	claims := jwt.MapClaims{
		"user_id": user.UserID,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func SetCookie(ctx echo.Context, token string) error {
	cookie := new(http.Cookie)
	cookie.Name = os.Getenv("COOKIE_NAME")
	cookie.Value = token
	cookie.Path = "/"
	cookie.HttpOnly = true
	cookie.Expires = time.Now().Add(24 * time.Hour)
	ctx.SetCookie(cookie)
	return nil
}