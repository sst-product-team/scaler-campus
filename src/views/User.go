package views

import (
	"campus/auth/src/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type CreateUserDTO struct {
	Name        string      `json:"name"`
	Email       string      `json:"email"`
	Password    string      `json:"password"`
	PhoneNumber string      `json:"phoneNumber"`
	Role        models.Role `json:"role" gorm:"type:ENUM('admin', 'teacher', 'student')"`
}

type UpdateUserDTO struct {
	Name         string      `json:"name"`
	Email        string      `json:"email"`
	Password     string      `json:"password"`
	PhoneNumber  string      `json:"phoneNumber"`
	Role         models.Role `json:"role" gorm:"type:ENUM('admin', 'teacher', 'student')"`
	LoginAllowed bool        `json:"loginAllowed"`
	UserDevices  int         `json:"userDevices"`
	LastLogin    time.Time   `json:"lastLogin"`
}

func FindUsers(c *gin.Context) {
	var users []models.User
	models.DB.Find(&users)
	c.JSON(http.StatusOK, gin.H{"data": users})
}

func FindUser(c *gin.Context) {
	var user models.User

	if err := models.DB.Where("id = ?", c.Param("id")).First(&user).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

func CreateUser(c *gin.Context) {
	var input CreateUserDTO
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := models.User{
		Name:        input.Name,
		Email:       input.Email,
		Password:    input.Password,
		PhoneNumber: input.PhoneNumber,
		Role:        input.Role,
	}

	models.DB.Create(&user).Save(&user)

	c.JSON(http.StatusOK, gin.H{"data": user})
}

func UpdateUser(c *gin.Context) {
	var user models.User

	if err := models.DB.Where("id = ?", c.Param("id")).First(&user).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}

	var input UpdateUserDTO

	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.Name == "" {
		input.Name = user.Name
	}
	if input.Email == "" {
		input.Email = user.Email
	}
	if input.Password == "" {
		input.Password = user.Password
	}
	if input.PhoneNumber == "" {
		input.PhoneNumber = user.PhoneNumber
	}
	if input.Role == "" {
		input.Role = user.Role
	}
	if !input.LoginAllowed {
		input.LoginAllowed = user.LoginAllowed
	}
	if input.UserDevices == 0 {
		input.UserDevices = user.UserDevices
	}
	if input.LastLogin == (time.Time{}) {
		input.LastLogin = user.LastLogin
	}

	updatedUser := models.User{
		Name:         input.Name,
		Email:        input.Email,
		Password:     input.Password,
		PhoneNumber:  input.PhoneNumber,
		Role:         input.Role,
		LoginAllowed: input.LoginAllowed,
		UserDevices:  input.UserDevices,
		LastLogin:    input.LastLogin,
	}

	models.DB.Model(&user).Updates(updatedUser)

	c.JSON(http.StatusOK, gin.H{"data": updatedUser})
}
