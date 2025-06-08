package diary

import "gorm.io/gorm"

type DiaryHandler struct {
	DB *gorm.DB
}
