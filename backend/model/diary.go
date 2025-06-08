package model

import (
	"time"

	"gorm.io/gorm"
)

type Diary struct {
	DiaryID    int            `json:"diary_id" gorm:"primaryKey"`
	UserID     int            `json:"user_id"`
	Did        string         `json:"did"`
	Meaning    string         `json:"meaning"`
	Awareness  string         `json:"awareness"`
	NextAction string         `json:"next_action"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `json:"deleted_at"`
	User User
}
