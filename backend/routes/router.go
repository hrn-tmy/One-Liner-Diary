package routes

import (
	"log"
	"net/http"
	"one-liner-diary/api"
	"one-liner-diary/api/diary"
	"one-liner-diary/db"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func SetUpRouter() *echo.Echo {
	db, err := db.SetUpDB()
	if err != nil {
		log.Fatal(err)
	}
	handler := api.Handler{
		DB: db,
	}
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
		AllowCredentials: true,
	}))
	e.POST("/signup", handler.Signup)
	e.POST("/login", handler.Login)

	d := e.Group("/diary")
	diaryHandler := diary.DiaryHandler{
		DB: db,
	}
	d.GET("/list", diaryHandler.List)
	d.GET("/:diary_id", diaryHandler.Detail)
	d.POST("/create", diaryHandler.Create)
	d.PUT("/update/:diary_id", diaryHandler.Update)
	d.DELETE("/delete/:diary_id", diaryHandler.Delete)

	return e
}
