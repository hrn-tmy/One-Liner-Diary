package model

import (
	"database/sql"
	"time"

	"gorm.io/gorm"
)

type User struct {
	UserID    int            `json:"user_id" gorm:"primaryKey"`
	Name      string         `json:"name" gorm:"not null"`
	Email     string         `json:"email" gorm:"not null"`
	Password  string         `json:"password" gorm:"not null"`
	IsValid   bool           `json:"is_valid" gorm:"not null"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt sql.NullTime   `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at"`
}

type ReqUser struct {
	UserID          int    `json:"user_id" gorm:"primaryKey"`
	Name            string `json:"name" gorm:"not null"`
	Email           string `json:"email" gorm:"not null"`
	Password        string `json:"password" gorm:"not null"`
	ConfirmPassword string `json:"confirm_password" gorm:"not null"`
}
