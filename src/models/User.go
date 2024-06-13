package models

import (
	"fmt"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type Role string

const (
	Admin   Role = "admin"
	Teacher Role = "teacher"
	Student Role = "student"
)

type User struct {
	UserId       int       `json:"userId" gorm:"primaryKey"`
	Name         string    `json:"name"`
	Email        string    `json:"email" gorm:"unique"`
	Password     string    `json:"password"`
	PhoneNumber  string    `json:"phoneNumber" gorm:"unique"`
	Role         Role      `json:"role" gorm:"type:varchar(20)"`
	LoginAllowed bool      `json:"loginAllowed" gorm:"default:true"`
	UserDevices  int       `json:"userDevices"`
	CreatedOn    time.Time `json:"createdOn" gorm:"autoCreateTime"`
	UpdatedOn    time.Time `json:"updatedOn" gorm:"autoUpdateTime"`
	LastLogin    time.Time `json:"lastLogin"`
}

// ValidateRole checks if the role is valid
func (u *User) ValidateRole() error {
	switch u.Role {
	case Admin, Teacher, Student:
		return nil
	default:
		return fmt.Errorf("invalid role: %s", u.Role)
	}
}


func (u *User) BeforeSave(tx *gorm.DB) (err error) {
	
	if len(u.Password) > 0 {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		u.Password = string(hashedPassword)
	}

	return u.ValidateRole()
}
