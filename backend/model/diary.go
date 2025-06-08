package model

import (
	"time"

	"gorm.io/gorm"
)

type Diary struct {
	DiaryID   int            `json:"diary_id" gorm:"primaryKey"`
	UserID    int            `json:"user_id"`
	Title     string         `json:"title"`
	Did       string         `json:"did"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at"`
}
