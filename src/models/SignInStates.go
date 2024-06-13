package models

import (
	"fmt"
	"time"

	"gorm.io/gorm"
)

type LoginState string

const (
	LoggedIn  LoginState = "logged_in"
	LoggedOut LoginState = "logged_out"
	Locked    LoginState = "locked"
	Disabled  LoginState = "disabled"
)

type SigninStates struct {
	StateId    int        `json:"stateId" gorm:"primaryKey"`
	UserId     int        `json:"userId"`
	DeviceId   string     `json:"deviceId"`
	LoginState LoginState `json:"loginState" gorm:"type:varchar(20);default:'logged_out'"`
	CreatedAt  time.Time  `json:"createdAt" gorm:"autoCreateTime"`
	UpdatedAt  time.Time  `json:"updatedAt" gorm:"autoUpdateTime"`
	LastLogin  time.Time  `json:"lastLogin"`
}

func (s *SigninStates) ValidateLoginState() error {
	switch s.LoginState {
	case LoggedIn, LoggedOut, Locked, Disabled:
		return nil
	default:
		return fmt.Errorf("invalid login state: %s", s.LoginState)
	}
}

func (s *SigninStates) BeforeSave(tx *gorm.DB) (err error) {
	return s.ValidateLoginState()
}
