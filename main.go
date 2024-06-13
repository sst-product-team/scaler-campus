package main

import (
	"campus/auth/src/models"
	"campus/auth/src/views"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	models.ConnectDatabase()
	router.GET("", views.HelloWorld)
	router.GET("/user", views.FindUsers)
	router.GET("/user/:id", views.FindUser)
	router.POST("/user", views.CreateUser)
	router.PATCH("/user/:id", views.UpdateUser)

	router.GET("/signin", views.HelloWorld)
	router.POST("/signin", views.SignIn)

	router.Run()
}
